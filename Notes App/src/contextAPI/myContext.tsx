import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { createContext, useContext, type ReactNode } from "react"
import { createUser, fetchUsers, removeUser, type User } from "../config/axiosConfig"

type UserContextType = {
  users: User[]
  addUser: (user: User) => Promise<void>
  deleteUser: (id: number) => Promise<void>
  refetchUsers: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient()

  const { data: users = [], refetch: refetchUsers } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers
  })

  const addUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      console.log("add User");
      queryClient.invalidateQueries({ queryKey: ["users"] })
    }
  })

  const deleteUserMutation = useMutation({
    mutationFn: removeUser,
    onSuccess: () => {
      console.log("delete user");
      queryClient.invalidateQueries({ queryKey: ["users"] })
    }
  })

  const addUser = async (user: User) => {
    await addUserMutation.mutateAsync(user)
  }

  const deleteUser = async (id: number) => {
    await deleteUserMutation.mutateAsync(id)
  }

  return (
    <UserContext.Provider value={{ users, addUser, deleteUser, refetchUsers }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error("useUserContext must be used within UserProvider")
  return context
}