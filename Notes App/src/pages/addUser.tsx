import { useForm } from "react-hook-form"
import { useUserContext } from "../contextAPI/myContext"

type FormValues = {
  email: string
  username: string
  phone: string
  firstname: string
  lastname: string
  city: string
  street: string
}

const Add = () => {
  const { addUser } = useUserContext()
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      email: "",
      username: "",
      phone: "",
      firstname: "",
      lastname: "",
      city: "",
      street: ""
    }
  })

  const onSubmit = async (data: FormValues) => {
    await addUser({
      email: data.email || "N/A",
      username: data.username || "N/A",
      phone: data.phone || "N/A",
      name: {
        firstname: data.firstname || "N/A",
        lastname: data.lastname || ""
      },
      address: {
        city: data.city || "N/A",
        street: data.street || ""
      }
    })
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-4"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">Add User</h2>

      <input
        {...register("email")}
        placeholder="Email"
        type="email"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        {...register("username")}
        placeholder="Username"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        {...register("phone")}
        placeholder="Phone"
        type="tel"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <div className="grid grid-cols-2 gap-4">
        <input
          {...register("firstname")}
          placeholder="First Name"
          required
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          {...register("lastname")}
          placeholder="Last Name"
          required
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input
          {...register("city")}
          placeholder="City"
          required
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          {...register("street")}
          placeholder="Street"
          required
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-200"
      >
        Add User
      </button>
    </form>
  )
}

export default Add
