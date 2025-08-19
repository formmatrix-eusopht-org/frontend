'use client'

import { UserAuth } from '@/app/Contexts/AuthContext'
import { useState, useRef, useEffect } from 'react'

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const { logout, user } = UserAuth()
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
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-700">
      <div className="mx-auto flex items-center justify-between p-4 md:px-8">
        {/* Left: Logo + Hamburger */}
        <div className="flex items-center w-full md:w-auto md:flex-1">
          {/* Hamburger (mobile only) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 dark:text-gray-300 focus:outline-none"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>

          {/* Logo */}
          <div className="mx-auto md:mx-0">
            <a
              href="#"
              className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent"
            >
              FormMatic
            </a>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex flex-row space-x-8 flex-1 justify-end">
          {NavItem.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className="relative text-gray-700 dark:text-gray-200 font-medium hover:text-blue-600 dark:hover:text-white transition-colors duration-200
                after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-blue-600 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Profile Avatar + Dropdown */}
        <div className="relative ml-6" ref={dropdownRef}>
          <button
            className="w-9 h-9 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 "
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {/* Placeholder avatar (could use user.photoURL) */}
            <div className="w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
              {user?.displayName?.[0] || 'U'}
            </div>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-lg z-50 overflow-hidden animate-fadeIn">
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.displayName || 'User'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-300 truncate">
                  {user?.email}
                </p>
              </div>
              <ul className="py-2">
                {/* <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Dashboard
                  </a>
                </li> */}
                <li>
                  <button
                    // onClick={logout}
                    className="w-full text-left block px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    User
                  </button>
                </li>
                <li>
                  <button
                    // onClick={logout}
                    className="w-full text-left block px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Settings
                  </button>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="w-full text-left block px-4 py-2 text-sm font-semibold text-red-400 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-50 dark:bg-gray-800 p-4 animate-slideDown">
          <ul className="space-y-3">
            {NavItem.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="block text-gray-700 dark:text-gray-200 font-medium hover:text-blue-600 dark:hover:text-white transition-colors"
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
