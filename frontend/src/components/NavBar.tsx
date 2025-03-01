"use client";

import { useNavigate } from "react-router-dom";
import { LogOut, User, Menu } from "lucide-react";
import Cookies from "js-cookie";
import useLogOut from "../hooks/NavBar/useLogOut";
import useGetProfileId from "../hooks/NavBar/useGetProfileId";
import { useState } from "react";

function NavBar() {
  const navigate = useNavigate();
  const { logOut } = useLogOut();
  const { redirectToProfilePage } = useGetProfileId();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 to-indigo-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button
              className="md:hidden mr-2 text-white"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="text-white font-bold text-xl cursor-pointer flex items-center">
              <span className="bg-white text-blue-900 rounded-lg px-2 py-1 mr-2">
                I+
              </span>
              InstructorPlus
            </div>
          </div>

          {Cookies.get("corp") && (
            <div className="hidden md:block">
              <div className="bg-blue-800/50 px-4 py-1.5 rounded-full text-white">
                {Cookies.get("corp")}
              </div>
            </div>
          )}

          <div className="flex items-center space-x-4">
            <button
              className="text-white hover:text-blue-200 transition-colors p-2 rounded-full hover:bg-white/10"
              onClick={() => redirectToProfilePage()}
              title="Profile"
            >
              <User className="h-5 w-5" />
            </button>

            <button
              className="text-white hover:text-blue-200 transition-colors p-2 rounded-full hover:bg-white/10"
              onClick={() => {
                logOut();
                navigate("/logIn");
              }}
              title="Log Out"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
