import React from "react";
import {
  BarChart2Icon,
  PieChartIcon,
  UsersIcon,
  BuildingIcon,
  LogOutIcon,
  SearchIcon,
} from "lucide-react";

export const Sidebar = ({ companies, selectedCompanyId, onSelectCompany }) => {
  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col h-full">
      {/* Logo / Title */}
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-xl font-bold flex items-center">
          <BarChart2Icon className="mr-2" size={20} />
          FinCredit Analytics
        </h2>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-800">
        <div className="relative">
          <input
            type="text"
            placeholder="Search companies..."
            className="w-full bg-gray-800 text-white rounded-md py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <SearchIcon
            className="absolute left-2.5 top-2.5 text-gray-400"
            size={16}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4 border-b border-gray-800">
        <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2">
          Navigation
        </h3>
        <ul>
          <li className="mb-1">
            <a
              href="#"
              className="flex items-center p-2 rounded-md bg-blue-600 text-white"
            >
              <BarChart2Icon size={16} className="mr-3" />
              Dashboard
            </a>
          </li>
          <li className="mb-1">
            <a
              href="#"
              className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-800"
            >
              <PieChartIcon size={16} className="mr-3" />
              Reports
            </a>
          </li>
          <li className="mb-1">
            <a
              href="#"
              className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-800"
            >
              <UsersIcon size={16} className="mr-3" />
              Clients
            </a>
          </li>
        </ul>
      </div>

      {/* Companies List */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2">
          Companies
        </h3>
        <ul>
          {companies.map((company) => (
            <li key={company.id} className="mb-1">
              <button
                onClick={() => onSelectCompany(company.id)}
                className={`flex items-center w-full p-2 rounded-md text-left ${
                  selectedCompanyId === company.id
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <BuildingIcon size={16} className="mr-3" />
                <span className="truncate">{company.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <button className="flex items-center w-full p-2 rounded-md text-gray-300 hover:bg-gray-800">
          <LogOutIcon size={16} className="mr-3" />
          Log out
        </button>
      </div>
    </div>
  );
};
