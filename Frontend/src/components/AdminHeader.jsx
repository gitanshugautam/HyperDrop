import { NavLink, useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="w-full bg-green-700 text-white px-6 py-4 flex items-center gap-8 fixed top-0 left-0 z-50">
      <h1 className="font-bold text-lg">Admin Panel</h1>

      {/* DASHBOARD */}
      <NavLink
        to="/admin"
        end
        className={({ isActive }) =>
          isActive ? "font-semibold " : "hover:opacity-80"
        }
      >
        Dashboard
      </NavLink>

      {/* PRODUCTS */}
      <NavLink
        to="/admin/products"
        className={({ isActive }) =>
          isActive ? "font-semibold underline" : "hover:underline"
        }
      >
        Products
      </NavLink>

      {/* USERS */}
      <NavLink
        to="/admin/users"
        className={({ isActive }) =>
          isActive ? "font-semibold underline" : "hover:underline"
        }
      >
        Users
      </NavLink>

      {/* ORDERS */}
      <NavLink
        to="/admin/orders"
        className={({ isActive }) =>
          isActive ? "font-semibold underline" : "hover:underline"
        }
      >
        Orders
      </NavLink>

      {/* SPACER */}
      <div className="ml-auto" />

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="bg-white text-green-700 px-4 py-1.5 rounded-lg font-semibold hover:bg-green-100 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminHeader;
