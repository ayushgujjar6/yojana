import React, { useState, useRef, useEffect } from 'react';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Example user data - replace with your actual user data
  const user = {
    name: "Raj Patel",
    email: "raj.patel@example.com",
    role: "Administrator",
    department: "IT Administration",
    lastLogin: "19 Feb 2025, 10:30 AM",
    profileImage: "https://via.placeholder.com/40" // Replace with actual image path
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 focus:outline-none"
      >
        <img 
          src={user.profileImage} 
          alt="Profile"
          className="w-full h-full object-cover" 
        />
      </button>
      
      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg border border-gray-200 z-10">
          {/* User Info Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center">
              <img 
                src={user.profileImage} 
                alt="Profile" 
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <p className="font-medium text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                <span className="inline-block px-2 py-1 mt-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  {user.role}
                </span>
              </div>
            </div>
          </div>
          
          {/* User Details */}
          <div className="p-4 border-b border-gray-200">
            <div className="mb-2">
              <p className="text-xs text-gray-500">Department</p>
              <p className="text-sm font-medium">{user.department}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Last Login</p>
              <p className="text-sm">{user.lastLogin}</p>
            </div>
          </div>
          
          {/* Navigation Menu */}
          <div className="p-2">
            <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
              My Profile
            </a>
            <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
              Account Settings
            </a>
            <a href="#notifications" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
              Notifications
            </a>
            <a href="#support" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
              Help & Support
            </a>
          </div>
          
          {/* Logout */}
          <div className="border-t border-gray-200 p-2">
            <a href="#logout" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded">
              Logout
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;