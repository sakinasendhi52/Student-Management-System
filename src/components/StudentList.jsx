import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchStudents, deleteStudent } from "../redux/actions/studentActions";

const inputClass =
  "block w-full rounded-xl border border-silver bg-mist/60 px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 transition focus:border-forest focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest/30";

const thClass =
  "px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-ink/60";

const classOptions = ["5", "6", "7", "8", "9", "10", "11", "12"];

const StudentList = () => {
  const dispatch = useDispatch();

  const { students, loading, error } = useSelector((state) => state.students);

  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (confirmDelete) {
      dispatch(deleteStudent(id));
    }
  };

  let filteredStudents = [...students];

  // Search
  filteredStudents = filteredStudents.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  // Class filter
  if (classFilter) {
    filteredStudents = filteredStudents.filter(
      (student) => student.class === classFilter
    );
  }

  // Sort
  if (sortBy === "name") {
    filteredStudents.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortBy === "rollNumber") {
    filteredStudents.sort(
      (a, b) => Number(a.rollNumber) - Number(b.rollNumber)
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-forest sm:text-3xl">
            Students
          </h1>
          <p className="mt-1 text-sm text-ink/60">
            Manage all student information
          </p>
        </div>

        <Link
          to="/add-student"
          className="inline-block self-start rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white no-underline! shadow-md shadow-forest/20 transition hover:bg-forest-light sm:self-auto"
        >
          + Add Student
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-2xl border border-silver/60 bg-white p-4 shadow-lg shadow-forest/5">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          <div className="md:col-span-5">
            <input
              type="text"
              className={inputClass}
              placeholder="Search student..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="md:col-span-4">
            <select
              className={inputClass}
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
            >
              <option value="">All Classes</option>
              {classOptions.map((c) => (
                <option key={c} value={c}>
                  Class {c}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              className={inputClass}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="name">Name</option>
              <option value="rollNumber">Roll Number</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center py-16 text-center">
          <div
            role="status"
            className="h-10 w-10 animate-spin rounded-full border-4 border-silver border-t-forest"
          />
          <p className="mt-3 text-sm text-ink/60">Loading students...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-wine/30 bg-wine/10 px-4 py-3 text-sm font-medium text-wine"
        >
          {error}
        </div>
      )}

      {/* Student table */}
      {!loading && !error && (
        <div className="overflow-hidden rounded-2xl border border-silver/60 bg-white shadow-lg shadow-forest/5">
          <div className="overflow-x-auto">
            <table className="w-full min-w-200px text-sm">
              <thead className="border-b border-silver/60 bg-mist">
                <tr>
                  <th className={thClass}>Student</th>
                  <th className={thClass}>Roll Number</th>
                  <th className={thClass}>Phone</th>
                  <th className={thClass}>Email</th>
                  <th className={thClass}>Class</th>
                  <th className={thClass}>Grade</th>
                  <th className={thClass}>Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-silver/40">
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="transition-colors hover:bg-mist/60"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.image}
                          alt={student.name}
                          className="h-11 w-11 rounded-full border-2 border-white object-cover shadow-sm ring-1 ring-silver"
                        />
                        <div>
                          <div className="font-bold text-ink">
                            {student.name}
                          </div>
                          <div className="text-xs text-ink/50">
                            Age: {student.age}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-ink/80">
                      {student.rollNumber}
                    </td>

                    <td className="px-6 py-4 text-ink/80">{student.phone}</td>

                    <td className="px-6 py-4 text-ink/80">{student.email}</td>

                    <td className="px-6 py-4 text-ink/80">
                      Class {student.class}
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-block rounded-full bg-forest/10 px-3 py-0.5 text-xs font-bold text-forest">
                        {student.grade}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link
                          to={`/students/${student.id}`}
                          className="rounded-full border border-forest px-4 py-1.5 text-xs font-semibold text-forest no-underline! transition hover:bg-forest hover:text-white"
                        >
                          View
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDelete(student.id)}
                          className="rounded-full border border-wine px-4 py-1.5 text-xs font-semibold text-wine transition hover:bg-wine hover:text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="px-6 py-14 text-center">
              <h5 className="text-lg font-bold text-ink">No students found</h5>
              <p className="mt-1 text-sm text-ink/60">
                Try changing your search or filter.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentList;