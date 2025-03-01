"use client";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Calendar,
  Building,
  ClipboardList,
  FileText,
  UserPlus,
  ChevronRight,
} from "lucide-react";
import useGetUserId from "../hooks/sideBar/useGetUserId";
import useIsAdmin from "../hooks/Admin/useIsAdmin";
import useIsSuperAdmin from "../hooks/sideBar/useIsSuperAdmin";

function SideBar() {
  const navigate = useNavigate();
  const { getUserId } = useGetUserId();
  const { isAdmin } = useIsAdmin();
  const { superAdmin } = useIsSuperAdmin();
  const [collapsed, setCollapsed] = useState(false);

  const handleClassesClick = async () => {
    if (!isAdmin && superAdmin === undefined) {
      const userId = await getUserId();
      navigate("/classes/" + userId);
    } else {
      navigate("/assignClasses");
    }
  };

  return (
    <>
      <div
        className={`relative min-h-screen bg-gradient-to-b from-sky-700 to-sky-800 text-white transition-all duration-300 ${
          collapsed ? "w-[70px]" : "w-[250px]"
        }`}
      >
        <button
          className="absolute -right-3 top-6 bg-white text-sky-700 rounded-full p-1 shadow-md z-10"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronRight
            className={`h-4 w-4 transition-transform duration-300 ${
              collapsed ? "" : "rotate-180"
            }`}
          />
        </button>

        <div className="py-6">
          {/* Regular User Menu */}
          {!isAdmin && superAdmin === undefined && (
            <div className="space-y-1">
              <MenuItem
                icon={<Calendar />}
                label="Часове"
                onClick={handleClassesClick}
                collapsed={collapsed}
              />
              <MenuItem
                icon={<Building />}
                label="Създай Фирма"
                onClick={() => navigate("/createCorporation")}
                collapsed={collapsed}
              />
            </div>
          )}

          {/* Admin Menu */}
          {isAdmin && (
            <div className="space-y-1">
              <MenuItem
                icon={<Calendar />}
                label="Часове"
                onClick={handleClassesClick}
                collapsed={collapsed}
              />
              <MenuItem
                icon={<ClipboardList />}
                label="Регистър"
                onClick={() => navigate("/registry")}
                collapsed={collapsed}
              />
            </div>
          )}

          {/* Super Admin Menu */}
          {superAdmin && (
            <div className="space-y-1">
              <MenuItem
                icon={<FileText />}
                label="Документи"
                onClick={() => navigate("/documents")}
                collapsed={collapsed}
              />
              <MenuItem
                icon={<UserPlus />}
                label="Нови курсисти"
                onClick={() => navigate("/reviewRequests")}
                collapsed={collapsed}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  collapsed: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  onClick,
  collapsed,
}) => {
  return (
    <button
      className={`w-full flex items-center px-4 py-3 hover:bg-sky-600 transition-colors rounded-lg mx-auto ${
        collapsed ? "justify-center" : "justify-start"
      }`}
      onClick={onClick}
    >
      <span className="flex-shrink-0">{icon}</span>
      {!collapsed && <span className="ml-3">{label}</span>}
    </button>
  );
};

export default SideBar;
