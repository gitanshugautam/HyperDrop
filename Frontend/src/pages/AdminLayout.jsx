import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-[#f7fce8]">
      <AdminHeader />

      {/* 👇 YE LINE MISSING THI */}
      <Outlet />
    </div>
  );
};

export default AdminLayout;
