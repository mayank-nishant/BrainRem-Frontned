import type { ReactElement } from "react";

interface SidebarItemProps {
  text: string;
  icon: ReactElement;
  active?: boolean;
  onClick?: () => void;
}

export function SidebarItem({ text, icon, active = false, onClick }: SidebarItemProps) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group ${
        active 
          ? "bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border border-purple-200" 
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      <div className={`transition-colors duration-200 ${
        active ? "text-purple-600" : "text-gray-500 group-hover:text-gray-700"
      }`}>
        {icon}
      </div>
      <span className="font-medium">{text}</span>
    </div>
  );
}
