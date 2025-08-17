import './App.css'
import { NavLink, Outlet } from 'react-router-dom'

function App() {

  return (
    <div className='w-full h-screen'>
      <div className='h-15 w-full bg-blue-800 text-3xl flex justify-center items-center text-white text-center '>
        <p>User Dashboard</p>
      </div>
      <div className='flex gap-3 h-full'>
        <div className='flex h-full w-1/7 px-2 py-2 border-r-1 border-zinc-400'>
          <nav className='flex flex-col justify-start w-full items-start gap-2 text-white font-bold '>
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? "px-3 py-2 w-full bg-blue-500 rounded-md" : "px-3 py-2 w-full bg-zinc-500 rounded-md"}
            >
              Home
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "px-3 py-2 w-full bg-blue-500 rounded-md" : "px-3 py-2 w-full bg-zinc-500 rounded-md"} to="/user">User</NavLink>
            <NavLink className={({ isActive }) => isActive ? "px-3 py-2 w-full bg-blue-500 rounded-md" : "px-3 py-2 w-full bg-zinc-500 rounded-md"} to="/add">Add</NavLink>
          </nav>
          <hr />
        </div>
        <div className='h-full w-full py-5'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default App
