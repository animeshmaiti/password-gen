import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="flex gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-1 rounded ${
                  isActive ? "bg-blue-600 text-white" : "bg-gray-200"
                }`
              }
            >
              Basic
            </NavLink>
    
            <NavLink
              to="/advanced"
              className={({ isActive }) =>
                `px-3 py-1 rounded ${
                  isActive ? "bg-blue-600 text-white" : "bg-gray-200"
                }`
              }
            >
              Advanced
            </NavLink>
          </div>
  )
}

export default NavBar