import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/students", label: "Students" },
  { to: "/add-student", label: "Add Student" },
  { to: "/profile", label: "Profile" },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    closeMenu();
    dispatch(logout());
    navigate("/login");
  };

  // Light text on dark green; the active link becomes a light pill
  const navLinkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200
     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-silver
     ${
       isActive
         ? "bg-mist text-forest shadow-md shadow-black/20"
         : "text-mist/80 hover:bg-white/10 hover:text-white"
     }`;

  const logoutClass =
    "rounded-full bg-wine px-5 py-2 text-sm font-semibold text-white shadow-md shadow-black/30 transition-all duration-200 hover:bg-wine-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-silver";

  return (
    <div className="min-h-screen bg-mist">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-forest shadow-lg shadow-forest/30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <NavLink
            to="/dashboard"
            onClick={closeMenu}
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white transition hover:opacity-80"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-mist shadow-sm">
              <svg
                className="h-5 w-5 text-forest"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m-5-8.5V16c0 1 2.2 2 5 2s5-1 5-2v-4.5"
                />
              </svg>
            </span>
            Student Management
          </NavLink>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {links.map(({ to, label }) => (
              <NavLink key={to} to={to} className={navLinkClass}>
                {label}
              </NavLink>
            ))}

            <button onClick={handleLogout} className={`ml-3 ${logoutClass}`}>
              Sign Out
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-silver lg:hidden"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu panel */}
        {menuOpen && (
          <div className="flex flex-col gap-1 border-t border-white/10 bg-forest px-4 pb-4 pt-3 lg:hidden">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={closeMenu}
                className={(state) => `block ${navLinkClass(state)}`}
              >
                {label}
              </NavLink>
            ))}

            <button onClick={handleLogout} className={`mt-2 ${logoutClass}`}>
              Sign Out
            </button>
          </div>
        )}
      </nav>

      {/* Page content */}
      <main className="min-h-[calc(100vh-73px)] bg-linear-to-br from-mist via-white to-silver/40">
        <Outlet />
      </main>
    </div>
  );
};

export default Navbar;