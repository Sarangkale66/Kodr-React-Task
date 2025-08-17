import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com",
})

export type User = {
  id?: number
  email: string
  username: string
  phone: string
  name: { firstname: string; lastname: string }
  address: { city: string; street: string }
}

export const fetchUsers = async (): Promise<User[]> => {
  const res = await axiosInstance.get("/users")
  return res.data
}

export const createUser = async (user: User): Promise<void> => {
  await axiosInstance.post("/users", user)
}

export const removeUser = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/users/${id}`)
}

export default axiosInstance