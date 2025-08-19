import React from "react";
import {
  GlobeIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  CalendarIcon,
  TrendingUpIcon,
} from "lucide-react";

export const CompanyProfile = ({ company }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 h-full">
      <h2 className="text-lg font-semibold mb-4">Company Profile</h2>
      <div className="space-y-4">
        {/* Logo and Name */}
        <div className="flex items-start">
          <div className="w-12 h-12 rounded-md bg-blue-100 flex items-center justify-center mr-4">
            {company.logo ? (
              <img src={company.logo} alt={company.name} className="w-8 h-8" />
            ) : (
              <TrendingUpIcon className="text-blue-600" size={20} />
            )}
          </div>
          <div>
            <h3 className="font-medium">{company.name}</h3>
            <p className="text-sm text-gray-500">{company.industry}</p>
          </div>
        </div>

        {/* Financial Info */}
        <div className="border-t border-gray-100 pt-3">
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <div className="text-gray-500">Market Cap</div>
            <div className="font-medium">${company.marketCap}B</div>

            <div className="text-gray-500">Revenue (TTM)</div>
            <div className="font-medium">${company.revenue}M</div>

            <div className="text-gray-500">Employees</div>
            <div className="font-medium">
              {company.employees.toLocaleString()}
            </div>

            <div className="text-gray-500">Founded</div>
            <div className="font-medium">{company.founded}</div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-100 pt-3">
          <h4 className="text-sm font-medium mb-2">Contact Information</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <GlobeIcon size={14} className="text-gray-400 mr-2" />
              <a
                href={`https://${company.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {company.website}
              </a>
            </div>
            <div className="flex items-center">
              <PhoneIcon size={14} className="text-gray-400 mr-2" />
              <span>{company.phone}</span>
            </div>
            <div className="flex items-center">
              <MapPinIcon size={14} className="text-gray-400 mr-2" />
              <span>{company.location}</span>
            </div>
          </div>
        </div>

        {/* Recent News */}
        <div className="border-t border-gray-100 pt-3">
          <h4 className="text-sm font-medium mb-2">Recent News</h4>
          {company.news &&
            company.news.map((item, index) => (
              <div
                key={index}
                className="mb-2 pb-2 border-b border-gray-50 last:border-0 last:pb-0 last:mb-0"
              >
                <p className="text-sm">{item.title}</p>
                <div className="flex items-center mt-1">
                  <CalendarIcon size={12} className="text-gray-400 mr-1" />
                  <span className="text-xs text-gray-500">{item.date}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
