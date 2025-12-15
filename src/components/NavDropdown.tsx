import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

interface NavItem {
  name: string;
  path: string;
}

interface NavDropdownProps {
  label: string;
  path: string;
  items: NavItem[];
}

export const NavDropdown: React.FC<NavDropdownProps> = ({ label, path, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <NavLink
        to={path}
        className={({ isActive }) =>
          `text-xs xl:text-sm font-bold uppercase tracking-wide transition-all duration-300 relative py-2 flex items-center gap-1 ${
            isActive ? 'text-maroon-800' : 'text-gray-600 hover:text-maroon-800'
          }`
        }
      >
        {label}
        <svg className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </NavLink>

      {/* Dropdown Menu */}
      <div 
        className={`absolute top-full left-0 mt-0 w-64 bg-white shadow-lg border border-gray-100 rounded-md overflow-hidden transition-all duration-200 z-50 ${
          isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
        }`}
      >
        <div className="py-2">
          {items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-3 text-sm transition-colors ${
                  isActive 
                    ? 'bg-maroon-50 text-maroon-800 font-semibold border-l-4 border-maroon-800' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-maroon-800'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};
