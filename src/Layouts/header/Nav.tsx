'use client'

import PaymentPopup from '@/Components/payments/PaymentPopup'
import PlanPopup from '@/Components/payments/PlanPopup'
import { UserAuth } from '@/Contexts/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [userRole, setUserRole] = useState(0)
  const [trialExpires, setTrialExpires] = useState<string | null>(null)
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<null | { name: string; price: number; billingCycle: "monthly" | "yearly" }>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const { logout, user } = UserAuth()
  const router = useRouter()
  const pathname = usePathname()
  const Plans = [{
    name: "Free Plan",
    description: "Free forever for small teams",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: ["Purchases Dashboard", "Admin Access", "Bill Notifications"],
    isFree: true,
  },
  {
    name: "Business Plan",
    description: "For growing businesses",
    monthlyPrice: 14,
    yearlyPrice: 9,
    features: ["Dashboards & Graphs", "Unlimited Users", "Export Data"],
  },]
  const NavItem = [
    { name: "Home", route: "/home" },
    { name: "Transactions", route: "/transactions" },
    { name: "Contact Us", route: "/contact" },
  ]

  // format trial expiry
  const formattedExpiry = (dateString: string | null) => {
    if (!dateString) return null
    try {
      let dateValue = dateString
      if (dateString.startsWith('{') || dateString.startsWith('"')) {
        try {
          const parsed = JSON.parse(dateString)
          dateValue = typeof parsed === 'string' ? parsed : dateString
        } catch {
          console.log("JSON parsing failed, using original value")
        }
      }
      const date = new Date(dateValue)
      if (isNaN(date.getTime())) return null
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      const year = date.getFullYear()
      return `${month}/${day}/${year}`
    } catch (error) {
      console.error("Error parsing date:", error)
      return null
    }
  }

  useEffect(() => {
    const role = localStorage.getItem('userRole')
    if (role) {
      try {
        setUserRole(JSON.parse(role))
      } catch {
        setUserRole(0)
      }
    } else {
      setUserRole(0)
    }

    const expires = localStorage.getItem('trialExpires') || null
    if (expires) {
      const formattedDate = formattedExpiry(expires)
      if (formattedDate) {
        setTrialExpires(formattedDate)
        const expiryDate = new Date(expires)
        const now = new Date()
        if (expiryDate < now) {
          setTrialExpires("expired")

          setShowSubscriptionPopup(true) // expired -> show popup
        }
      }
    }
  }, [user])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])


  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto flex items-center justify-between p-4 md:px-8">
          {/* Left: Logo + Hamburger */}
          <div className="flex items-center w-full md:w-auto md:flex-1">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-600 dark:text-gray-300 focus:outline-none"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
            <div className="mx-auto md:mx-0">
              <a href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                FormMatic
              </a>
            </div>
          </div>

          {/* Desktop Nav Links */}
          {
            userRole === 1 && (
              <ul className="hidden md:flex flex-row space-x-8 flex-1 justify-end">
                {NavItem.map((item, index) => {
                  const isActive = pathname === item.route
                  return (
                    <li key={index} onClick={() => router.push(item.route)}>
                      <a
                        className={`relative font-medium transition-colors duration-200
                      ${isActive
                            ? "text-blue-600 dark:text-white after:w-full"
                            : "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-white after:w-0"}
                      after:content-[''] after:absolute after:h-[2px] after:bg-blue-600 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full`}
                      >
                        {item.name}
                      </a>
                    </li>
                  )
                })}
              </ul>)
          }


          {/* Profile Avatar + Dropdown */}
          <div className="relative ml-6" ref={dropdownRef}>
            <button
              className="w-9 h-9 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 "
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
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
                  {/* {userRole === 0 &&
                    <li>
                      <button
                        onClick={() => router.push('/user')}
                        className="w-full text-left block px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        User
                      </button>
                    </li>
                  } */}
                  <li>
                    <button className="w-full text-left block px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
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

        {/* ✅ Subscription Info */}
        {trialExpires && userRole === 1 && (
          <div className="bg-cyan-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-center py-2 text-sm text-gray-700 dark:text-gray-300"
            onClick={() => {
              setShowSubscriptionPopup(true)
            }}>
            Upgrade your plan Trial Expires at : <span className="font-semibold">{trialExpires}</span>
          </div>
        )}

        {/* Mobile Nav Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-50 dark:bg-gray-800 p-4 animate-slideDown">
            <ul className="space-y-3">
              {NavItem.map((item, index) => {
                const isActive = pathname === item.route
                return (
                  <li key={index} onClick={() => router.push(item.route)}>
                    <a
                      className={`block font-medium transition-colors
                        ${isActive
                          ? "text-blue-600 dark:text-white"
                          : "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-white"}`}
                    >
                      {item.name}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </nav>

      {/* ✅ Payment Popup connected */}
      {showSubscriptionPopup && userRole === 1 && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          {selectedPlan === null ? (
            <PlanPopup
              username={user?.displayName || "User"}
              onClose={() => { trialExpires === "expired" ? logout() : setShowSubscriptionPopup(false) }}
              onSelectPlan={(plan) => {
                setSelectedPlan(plan);
              }}
              plans={Plans}
            />
          ) : (
            <PaymentPopup
              selectedPlanData={selectedPlan}
              onClose={() => setSelectedPlan(null)}
            />
          )}
        </div>
      )}

    </>
  )
}
