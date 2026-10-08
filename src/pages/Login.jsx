import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../redux/actions/authActions";

const DEMO_EMAIL = "admin@gmail.com";
const DEMO_PASSWORD = "123456";

const inputClass =
  "block w-full border-0 border-b-2 border-silver bg-transparent py-3 pl-8 pr-14 text-sm text-ink placeholder:text-ink/40 transition focus:border-forest focus:outline-none focus:ring-0";

const iconClass =
  "pointer-events-none absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 text-forest/60";

const previewBars = [40, 65, 50, 85, 60, 95, 70];
const previewPeople = ["R", "P", "A", "N"];

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state) => state.auth.error);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await dispatch(login(email, password));

    if (success) {
      navigate("/dashboard");
    }
  };

  const fillDemo = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-mist via-white to-silver/50 px-4 py-10">
      {/* Soft background blobs */}
      <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-forest/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-wine/10 blur-3xl" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-4xl bg-white shadow-2xl shadow-forest/15 lg:grid-cols-2">
        {/* ---------- Left: form ---------- */}
        <div className="px-8 py-10 sm:px-12 sm:py-14">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest shadow-md shadow-forest/30">
              <svg
                className="h-6 w-6 text-white"
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
            <span className="text-lg font-bold tracking-tight text-ink">
              Student Management
            </span>
          </div>

          <h1 className="mt-10 text-4xl font-bold tracking-tight text-forest">
            Hello again!
          </h1>
          <p className="mt-2 text-sm text-ink/60">
            Please sign in to access your dashboard.
          </p>

          {error && (
            <div
              role="alert"
              className="mt-6 flex items-center gap-2 rounded-xl border-l-4 border-wine bg-wine/10 px-4 py-3 text-sm font-medium text-wine"
            >
              <svg
                className="h-5 w-5 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
            {/* Email */}
            <div className="relative">
              <svg
                className={iconClass}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.9 5.27a2 2 0 002.2 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <input
                id="email"
                type="email"
                aria-label="Email"
                className={inputClass}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                autoComplete="email"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <svg
                className={iconClass}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                aria-label="Password"
                className={inputClass}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-semibold text-forest transition hover:text-forest-light"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button
              type="submit"
              className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-forest px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-forest/30 transition-all duration-200 hover:bg-forest-light hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            >
              Sign In
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
              </svg>
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-8 rounded-2xl border-2 border-dashed border-wine/30 bg-wine/5 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-wide text-wine">
                Demo account
              </p>
              <button
                type="button"
                onClick={fillDemo}
                className="rounded-full bg-wine px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-wine-light"
              >
                Autofill
              </button>
            </div>

            <div className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
              <span className="text-ink/60">Email</span>
              <span className="truncate font-semibold text-ink">{DEMO_EMAIL}</span>
              <span className="text-ink/60">Password</span>
              <span className="font-semibold text-ink">{DEMO_PASSWORD}</span>
            </div>
          </div>
        </div>

        {/* ---------- Right: dashboard preview (desktop only) ---------- */}
        <div className="relative hidden overflow-hidden bg-forest p-12 lg:flex lg:flex-col lg:justify-between">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/5" />
          <div className="pointer-events-none absolute -bottom-28 -left-16 h-80 w-80 rounded-full bg-wine/50" />

          <div className="relative">
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white">
              Everything about your students, at a glance.
            </h2>
            <p className="mt-3 text-white/70">
              Track classes, grades and records from one clean dashboard.
            </p>
          </div>

          {/* Mini dashboard mockup */}
          <div className="relative mt-8 rounded-2xl bg-white/10 p-5 shadow-xl backdrop-blur-sm">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Students", value: "10" },
                { label: "Classes", value: "4" },
                { label: "Top A+", value: "3" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl bg-white p-3">
                  <p className="text-[11px] font-medium text-ink/50">{item.label}</p>
                  <p className="text-2xl font-bold text-forest">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-xl bg-white p-4">
              <p className="text-[11px] font-medium text-ink/50">Students per class</p>
              <div className="mt-3 flex h-24 items-end justify-between gap-2">
                {previewBars.map((height, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t-md ${i % 2 === 0 ? "bg-forest" : "bg-wine"}`}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between rounded-xl bg-white p-3">
              <div className="flex -space-x-2">
                {previewPeople.map((letter, i) => (
                  <span
                    key={letter}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white ${
                      i % 2 === 0 ? "bg-forest" : "bg-wine"
                    }`}
                  >
                    {letter}
                  </span>
                ))}
              </div>
              <span className="text-xs font-semibold text-forest">+ more students</span>
            </div>
          </div>

          <p className="relative mt-8 text-sm text-white/50">
            © {new Date().getFullYear()} Student Management
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;