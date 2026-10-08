import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchStudents } from "../redux/actions/studentActions";

const GRADE_ORDER = ["A+", "A", "B+", "B", "C"];

const Dashboard = () => {
  const dispatch = useDispatch();

  const students = useSelector((state) => state.students.students);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (students.length === 0) {
      dispatch(fetchStudents());
    }
  }, [dispatch, students.length]);

  // ---- Stats ----
  const totalStudents = students.length;

  const totalClasses = new Set(students.map((s) => s.class)).size;

  const averageAge = totalStudents
    ? (students.reduce((sum, s) => sum + Number(s.age || 0), 0) / totalStudents).toFixed(1)
    : "0";

  const topPerformers = students.filter((s) => s.grade === "A+" || s.grade === "A").length;

  // Students per class
  const classCounts = students.reduce((acc, s) => {
    acc[s.class] = (acc[s.class] || 0) + 1;
    return acc;
  }, {});
  const classData = Object.entries(classCounts).sort((a, b) => Number(a[0]) - Number(b[0]));
  const maxClassCount = Math.max(1, ...classData.map(([, count]) => count));

  // Grade distribution
  const gradeData = GRADE_ORDER.map((grade) => ({
    grade,
    count: students.filter((s) => s.grade === grade).length,
  }));
  const maxGradeCount = Math.max(1, ...gradeData.map((g) => g.count));

  // Recently added (json-server appends new records at the end)
  const recentStudents = [...students].reverse().slice(0, 5);

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const stats = [
    {
      label: "Total Students",
      value: totalStudents,
      note: "Registered in the system",
      tone: "forest",
      icon: "M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-4.13a4 4 0 11-8 0 4 4 0 018 0zm6 0a3 3 0 11-6 0 3 3 0 016 0z",
    },
    {
      label: "Total Classes",
      value: totalClasses,
      note: "Across all students",
      tone: "forest",
      icon: "M12 6.25v13m0-13C10.8 5.48 9.2 5 7.5 5S4.2 5.48 3 6.25v13C4.2 18.48 5.8 18 7.5 18s3.3.48 4.5 1.25m0-13C13.2 5.48 14.8 5 16.5 5c1.7 0 3.3.48 4.5 1.25v13C19.8 18.48 18.2 18 16.5 18c-1.7 0-3.3.48-4.5 1.25",
    },
    {
      label: "Top Performers",
      value: topPerformers,
      note: "Students with grade A or A+",
      tone: "wine",
      icon: "M11.48 3.5a.56.56 0 011.04 0l2.13 5.11a.56.56 0 00.47.35l5.52.44c.5.04.7.66.32.99l-4.2 3.6a.56.56 0 00-.18.56l1.28 5.38a.56.56 0 01-.84.61l-4.73-2.89a.56.56 0 00-.58 0l-4.73 2.89a.56.56 0 01-.84-.61l1.28-5.38a.56.56 0 00-.18-.56l-4.2-3.6a.56.56 0 01.32-.99l5.52-.44a.56.56 0 00.47-.35l2.13-5.11z",
    },
    {
      label: "Average Age",
      value: averageAge,
      note: "Years, all students",
      tone: "wine",
      icon: "M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z",
    },
  ];

  const toneClasses = {
    forest: { badge: "bg-forest/10 text-forest", value: "text-forest" },
    wine: { badge: "bg-wine/10 text-wine", value: "text-wine" },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Welcome banner */}
      <div className="relative mb-8 overflow-hidden rounded-3xl bg-forest px-8 py-10 shadow-xl shadow-forest/20 sm:px-12 sm:py-12">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-24 right-24 h-56 w-56 rounded-full bg-wine/40" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-white/60">{today}</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Welcome back{user?.name ? `, ${user.name}` : ""}
            </h1>
            <p className="mt-2 max-w-xl text-white/70">
              Manage your students and academic information from one place.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/add-student"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-forest no-underline! shadow-md transition hover:bg-mist"
            >
              + Add Student
            </Link>
            <Link
              to="/students"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white no-underline! transition hover:bg-white/10"
            >
              View Students
            </Link>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-silver/60 bg-white p-7 shadow-lg shadow-forest/5 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-forest/10"
          >
            <div className="flex items-start justify-between">
              <div>
                <h6 className="text-sm font-medium text-ink/60">{stat.label}</h6>
                <p className={`mt-3 text-5xl font-bold ${toneClasses[stat.tone].value}`}>
                  {stat.value}
                </p>
              </div>
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${toneClasses[stat.tone].badge}`}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                </svg>
              </span>
            </div>
            <p className="mt-5 text-sm text-ink/50">{stat.note}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Students per class */}
        <div className="rounded-2xl border border-silver/60 bg-white p-7 shadow-lg shadow-forest/5 lg:col-span-2">
          <h3 className="text-lg font-bold text-forest">Students per Class</h3>
          <p className="mb-6 text-sm text-ink/50">How many students are in each class</p>

          {classData.length === 0 ? (
            <p className="py-8 text-center text-sm text-ink/50">No data yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {classData.map(([cls, count]) => (
                <div key={cls} className="flex items-center gap-4">
                  <span className="w-20 shrink-0 text-sm font-semibold text-ink/70">
                    Class {cls}
                  </span>
                  <div className="h-4 flex-1 overflow-hidden rounded-full bg-mist">
                    <div
                      className="h-full rounded-full bg-forest transition-all duration-500"
                      style={{ width: `${(count / maxClassCount) * 100}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-sm font-bold text-forest">{count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Grade distribution */}
        <div className="rounded-2xl border border-silver/60 bg-white p-7 shadow-lg shadow-forest/5">
          <h3 className="text-lg font-bold text-forest">Grade Distribution</h3>
          <p className="mb-6 text-sm text-ink/50">Students by grade</p>

          <div className="flex h-48 items-end justify-between gap-3">
            {gradeData.map(({ grade, count }) => (
              <div key={grade} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <span className="text-xs font-bold text-ink/70">{count}</span>
                <div
                  className="w-full rounded-t-lg bg-wine transition-all duration-500"
                  style={{ height: `${(count / maxGradeCount) * 100}%`, minHeight: "4px" }}
                />
                <span className="text-xs font-semibold text-ink/60">{grade}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recently added */}
        <div className="rounded-2xl border border-silver/60 bg-white p-7 shadow-lg shadow-forest/5 lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-forest">Recently Added</h3>
              <p className="text-sm text-ink/50">The latest 5 students</p>
            </div>
            <Link
              to="/students"
              className="text-sm font-semibold text-forest no-underline! transition hover:text-forest-light"
            >
              View all →
            </Link>
          </div>

          {recentStudents.length === 0 ? (
            <p className="py-8 text-center text-sm text-ink/50">No students yet.</p>
          ) : (
            <ul className="divide-y divide-silver/40">
              {recentStudents.map((student) => (
                <li key={student.id}>
                  <Link
                    to={`/students/${student.id}`}
                    className="flex items-center gap-4 rounded-xl px-2 py-3 no-underline! transition hover:bg-mist/70"
                  >
                    <img
                      src={student.image}
                      alt={student.name}
                      className="h-12 w-12 rounded-full object-cover ring-1 ring-silver"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-bold text-ink">{student.name}</p>
                      <p className="truncate text-xs text-ink/50">
                        Roll {student.rollNumber} · Class {student.class}
                      </p>
                    </div>
                    <span className="rounded-full bg-forest/10 px-3 py-0.5 text-xs font-bold text-forest">
                      {student.grade}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Quick actions */}
        <div className="flex flex-col rounded-2xl border border-wine/20 bg-white p-7 shadow-lg shadow-wine/5">
          <h3 className="text-lg font-bold text-wine">Quick Actions</h3>
          <p className="mb-5 text-sm text-ink/50">Jump straight to common tasks</p>

          <div className="flex flex-col gap-3">
            <Link
              to="/add-student"
              className="rounded-xl bg-wine px-5 py-3.5 text-center text-sm font-semibold text-white no-underline! shadow-md shadow-wine/20 transition hover:bg-wine-light"
            >
              + Add New Student
            </Link>
            <Link
              to="/students"
              className="rounded-xl border border-forest px-5 py-3.5 text-center text-sm font-semibold text-forest no-underline! transition hover:bg-forest hover:text-white"
            >
              Browse All Students
            </Link>
            <Link
              to="/profile"
              className="rounded-xl border border-silver px-5 py-3.5 text-center text-sm font-semibold text-ink no-underline! transition hover:bg-mist"
            >
              My Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;