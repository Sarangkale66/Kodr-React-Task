import { NavLink, Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div>
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-white rounded-full shadow-lg p-1 border border-gray-200">
          <NavLink
            to={"/"}
            className={({ isActive }) => `px-6 py-2 rounded-full font-medium transition-all ${isActive
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-blue-600'
              }`}
          >
            Login
          </NavLink>
          <NavLink to={"/register"}
            className={({ isActive }) => `px-6 py-2 rounded-full font-medium transition-all ${isActive
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-purple-600'
              }`}
          >
            Register
          </NavLink>
        </div>
      </div>

      <Outlet></Outlet>
    </div>
  );
}

export default AuthLayout
