import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<"all" | "youtube" | "twitter">("all");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`h-screen bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 w-72 fixed left-0 top-0 shadow-lg z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}>
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <Logo />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                BrainRem
              </h1>
              <p className="text-sm text-gray-500">Your Knowledge Hub</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4">
          <div className="space-y-2">
            <SidebarItem 
              text="All Content" 
              icon={<div className="w-5 h-5">📚</div>} 
              active={activeFilter === "all"}
              onClick={() => setActiveFilter("all")}
            />
            <SidebarItem 
              text="Twitter" 
              icon={<TwitterIcon />} 
              active={activeFilter === "twitter"}
              onClick={() => setActiveFilter("twitter")}
            />
            <SidebarItem 
              text="YouTube" 
              icon={<YoutubeIcon />} 
              active={activeFilter === "youtube"}
              onClick={() => setActiveFilter("youtube")}
            />
          </div>
        </div>

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
