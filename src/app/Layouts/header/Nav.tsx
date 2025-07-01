'use client'

import { UserAuth } from '@/app/Contexts/AuthContext'
import { useState, useRef, useEffect } from 'react'

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const { logout, user } = UserAuth();
  const NavItem = ['Home', 'Search Transactions', 'Contact Us']

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="mx-auto flex items-center justify-between p-6">
        {/* Mobile Left Section: Hamburger + Logo Center */}
        <div className="flex items-center justify-between w-full md:w-auto md:flex-1">
          {/* Hamburger (mobile only) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-500 dark:text-gray-400"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Logo */}
          <div className="md:mr-8 mx-auto md:mx-0">
            <a
              href="#"
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              FormMatic
            </a>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex flex-row space-x-6 flex-1 justify-end">
          {NavItem.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-700 dark:text-gray-300 dark:hover:text-white"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Profile Avatar + Dropdown */}
        <div className="relative mx-6" ref={dropdownRef}>
          <button
            className="w-7 h-7 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {/* <img
              src=""
              className="w-full h-full object-cover"
            /> */}
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-600 rounded-md shadow-lg z-50">
              <div className="px-4 py-3">
                <p className="text-sm text-gray-900 dark:text-white">
                  {user?.displayName || "-"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {user?.email}
                </p>
              </div>
              <ul className="py-2">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    onClick={logout}
                    // href="/"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-50 dark:bg-gray-800 p-4">
          <ul className="space-y-3">
            {NavItem.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="block text-gray-700 dark:text-gray-200 hover:text-blue-600"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
