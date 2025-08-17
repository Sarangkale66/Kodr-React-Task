import { useState, useMemo } from "react"
import { useUserContext } from "../contextAPI/myContext"

const User = () => {
  const { users, deleteUser } = useUserContext();
  const [filter, setFilter] = useState("");

  const filteredUsers = useMemo(() => {
    if (!filter.trim()) return users
    const lower = filter.toLowerCase()
    return users.filter(
      (user) =>
        user.name?.firstname?.toLowerCase().includes(lower) ||
        user.name?.lastname?.toLowerCase().includes(lower) ||
        user.email?.toLowerCase().includes(lower) ||
        user.phone?.toLowerCase().includes(lower)
    )
  }, [filter, users])

  if (!users) {
    return <>Loadind Data...</>
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg ">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800 border-b sm:border-none pb-3 sm:pb-0">
          User List
        </h2>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search by name, email, or phone"
          className="w-full sm:w-72 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {filteredUsers.length === 0 ? (
        <p className="text-gray-500 text-center">No matching users found.</p>
      ) : (
        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id ?? crypto.randomUUID()}
              className="p-4 border border-gray-200 rounded-lg shadow-sm flex justify-between items-start hover:shadow-md transition-all duration-200"
            >
              <div className="space-y-1">
                <p className="text-gray-800">
                  <span className="font-medium">Name:</span>{" "}
                  {user.name?.firstname ?? "N/A"} {user.name?.lastname ?? ""}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span> {user.email ?? "N/A"}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Phone:</span> {user.phone ?? "N/A"}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Address:</span>{" "}
                  {user.address?.street ?? "N/A"}, {user.address?.city ?? ""}
                </p>
              </div>

              <button
                onClick={() => user.id && deleteUser(user.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg shadow transition-all duration-200"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default User
