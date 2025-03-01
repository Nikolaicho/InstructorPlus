"use client";

import type React from "react";

import { User, Phone, Mail, Key } from "lucide-react";
import type { profileInfo } from "../interfaces/profile.interface";

interface ProfileCardProps {
  info: profileInfo | undefined;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ info }) => {
  if (!info) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
        <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6"></div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-6 bg-gray-200 rounded mb-4"></div>
        ))}
      </div>
    );
  }

  // Generate initials for avatar
  const initials = `${info.firstName?.charAt(0) || ""}${
    info.lastName?.charAt(0) || ""
  }`.toUpperCase();

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
      {/* Header with avatar */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-blue-700 text-2xl font-bold mb-3">
          {initials}
        </div>
        <h2 className="text-white text-xl font-semibold">
          {info.firstName} {info.surname} {info.lastName}
        </h2>
      </div>

      {/* Info list */}
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
          <User className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Име</p>
            <p className="font-medium">
              {info.firstName} {info.surname} {info.lastName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
          <Phone className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Телефон</p>
            <p className="font-medium">{info.telephone}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
          <Mail className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Имейл</p>
            <p className="font-medium break-all">{info.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Key className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Идентификационен номер</p>
            <p className="font-medium text-sm">{info.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
