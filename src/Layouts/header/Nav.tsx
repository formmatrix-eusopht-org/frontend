'use client'

import PaymentPopup from '@/Components/payments/PaymentPopup'
import PlanPopup from '@/Components/payments/PlanPopup'
import { UserAuth } from '@/Contexts/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

// ✅ Define types for User & Plan
type UserType = {
  name?: string
  email?: string | null
  role?: number // 1 = user, 2 = admin
  planExpiration?: string | null
  plan?: string
}

type PlanType = { name: string; price: number; color: string }

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [trialExpires, setTrialExpires] = useState<string | null>(null)
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null)

  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const { logout, user }: { logout: () => void; user: UserType | null } = UserAuth()
  const router = useRouter()
  const pathname = usePathname()

  const Plans = [
    {
      name: "Daily Plan",
      price: 5,
      color: "bg-blue-500",
      description: "Access all features for one day.",
      features: []
    },
    {
      name: "Monthly Plan",
      price: 50,
      color: "bg-green-500",
      description: "Best for regular users.",
      features: []
    },
    {
      name: "Yearly Plan",
      price: 500,
      color: "bg-red-500",
      description: "Best value for teams.",
      features: []
    }
  ]

  const NavItem = [
    { name: "Home", route: "/home" },
    { name: "Transactions", route: "/transactions" },
    { name: "Contact Us", route: "/contact" },
  ]

  const formattedExpiry = (dateString: string | null) => {
    if (!dateString) return null;

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null; // invalid date

    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // months are 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${month}/${day}/${year}`; // "09/12/2025"
  };


  // ✅ Load expiry from user
  useEffect(() => {
    if (user?.planExpiration) {
      const isoDate = formattedExpiry(user.planExpiration);
      if (isoDate) {
        const expiryDate = new Date(user.planExpiration);
        const now = new Date();

        if (expiryDate < now) {
          setTrialExpires("expired");
          setShowSubscriptionPopup(true);
        } else {
          setTrialExpires(isoDate); // safe ISO string
        }
      }
    }
  }, [user]);


  // ✅ Close dropdown on outside click
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

          {/* Desktop Nav Links - Only for USER (role 1) */}
          {user?.role === 1 && (
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
            </ul>
          )}

          {/* Profile Avatar + Dropdown */}
          <div className="relative ml-6" ref={dropdownRef}>
            <button
              className="w-9 h-9 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 "
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                {user?.name?.[0] || 'U'}
              </div>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-lg z-50 overflow-hidden animate-fadeIn">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || 'User'}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-300 truncate">{user?.email}</p>
                </div>
                <ul className="py-2">
                  {user?.role === 1 && (
                    <li>
                      <button
                        onClick={() => router.push('/subscriptions')}
                        className="w-full text-left block px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Subscriptions
                      </button>
                    </li>
                  )}
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

        {/* ✅ Trial Info Banner - Only for USER */}
        {trialExpires && user?.role === 1 && user?.plan === "trial" && (
          <div
            className="bg-cyan-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-center py-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
            onClick={() => setShowSubscriptionPopup(true)}
          >
            {trialExpires === "expired" ? (
              <span className="font-semibold text-red-500">Your trial has expired!</span>
            ) : (
              <>Upgrade your plan — Trial expires at: <span className="font-semibold">{trialExpires}</span></>
            )}
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

      {/* ✅ Payment Popup */}
      {showSubscriptionPopup && user && user.role === 1 && user.plan === "trial" && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          {selectedPlan === null ? (
            <PlanPopup
              username={user.name || "User"}
              onClose={() => (trialExpires === "expired" ? logout() : setShowSubscriptionPopup(false))}
              onSelectPlan={(plan) => setSelectedPlan(plan)}
              plans={Plans}
            />
          ) : (
            <PaymentPopup
              user={user}
              selectedPlanData={selectedPlan}
              onClose={() => setSelectedPlan(null)}
              setShowSubscriptionPopup={setShowSubscriptionPopup}
            />
          )}
        </div>
      )}
    </>
  )
}
