import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import StudentForm from "./StudentForm";

import {
  fetchStudents,
  updateStudent,
  deleteStudent,
} from "../redux/actions/studentActions";

const StudentDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const students = useSelector((state) => state.students.students);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (students.length === 0) {
      dispatch(fetchStudents());
    }
  }, [dispatch, students.length]);

  const student = students.find((item) => String(item.id) === String(id));

  if (!student) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div
          role="alert"
          className="rounded-xl border border-wine/30 bg-wine/10 px-4 py-3 text-sm font-medium text-wine"
        >
          Student not found.
        </div>
      </div>
    );
  }

  const handleUpdate = async (updatedStudent) => {
    await dispatch(updateStudent(student.id, updatedStudent));
    setEditMode(false);
  };

  const handleDelete = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmation) {
      return;
    }

    await dispatch(deleteStudent(student.id));
    navigate("/students");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate("/students")}
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest transition hover:text-forest-light"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to students
      </button>

      {!editMode ? (
        <div className="overflow-hidden rounded-2xl border border-silver/60 bg-white shadow-lg shadow-forest/5">
          {/* Header band */}
          <div className="h-20 bg-forest" />

          <div className="px-6 pb-6 sm:px-8 sm:pb-8">
            {/* Avatar + name + actions */}
            <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <img
                  src={student.image}
                  alt={student.name}
                  className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-md"
                />

                <div className="pb-1">
                  <h2 className="text-2xl font-bold tracking-tight text-ink">
                    {student.name}
                  </h2>
                  <p className="text-sm text-ink/60">
                    Roll Number: {student.rollNumber}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditMode(true)}
                  className="rounded-full bg-forest px-5 py-2 text-sm font-semibold text-white shadow-md shadow-forest/20 transition hover:bg-forest-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  className="rounded-full bg-wine px-5 py-2 text-sm font-semibold text-white shadow-md shadow-wine/20 transition hover:bg-wine-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine"
                >
                  Delete
                </button>
              </div>
            </div>

            <hr className="my-6 border-silver/60" />

            {/* Details */}
            <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl bg-mist/70 p-4 sm:col-span-1 lg:col-span-1">
                <dt className="text-xs font-semibold uppercase tracking-wide text-ink/50">
                  Phone
                </dt>
                <dd className="mt-1 font-semibold text-ink">{student.phone}</dd>
              </div>

              <div className="rounded-xl bg-mist/70 p-4 sm:col-span-1 lg:col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-wide text-ink/50">
                  Email
                </dt>
                <dd className="mt-1 break-all font-semibold text-ink">
                  {student.email}
                </dd>
              </div>

              <div className="rounded-xl bg-mist/70 p-4">
                <dt className="text-xs font-semibold uppercase tracking-wide text-ink/50">
                  Age
                </dt>
                <dd className="mt-1 font-semibold text-ink">{student.age}</dd>
              </div>

              <div className="rounded-xl bg-mist/70 p-4">
                <dt className="text-xs font-semibold uppercase tracking-wide text-ink/50">
                  Class
                </dt>
                <dd className="mt-1 font-semibold text-ink">
                  Class {student.class}
                </dd>
              </div>

              <div className="rounded-xl bg-mist/70 p-4">
                <dt className="text-xs font-semibold uppercase tracking-wide text-ink/50">
                  Grade
                </dt>
                <dd className="mt-1">
                  <span className="inline-block rounded-full bg-forest/10 px-3 py-0.5 text-sm font-bold text-forest">
                    {student.grade}
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-silver/60 bg-white p-6 shadow-lg shadow-forest/5 sm:p-8">
          <h3 className="mb-6 text-xl font-bold text-forest">Edit Student</h3>

          <StudentForm
            initialData={student}
            onSubmit={handleUpdate}
            buttonText="Update Student"
          />

          <button
            type="button"
            onClick={() => setEditMode(false)}
            className="mt-3 w-full rounded-xl border border-silver bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:bg-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;