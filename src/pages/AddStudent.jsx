import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import StudentForm from "../components/StudentForm";

import { addStudent } from "../redux/actions/studentActions";

const AddStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (student) => {
    await dispatch(addStudent(student));

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

      <div className="overflow-hidden rounded-2xl border border-silver/60 bg-white shadow-lg shadow-forest/5">
        {/* Card header */}
        <div className="border-b border-silver/60 bg-forest px-6 py-6 sm:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Add New Student
          </h1>
          <p className="mt-1 text-sm text-white/70">
            Enter student information below
          </p>
        </div>

        {/* Form */}
        <div className="p-6 sm:p-8">
          <StudentForm onSubmit={handleSubmit} buttonText="Add Student" />
        </div>
      </div>
    </div>
  );
};

export default AddStudent;