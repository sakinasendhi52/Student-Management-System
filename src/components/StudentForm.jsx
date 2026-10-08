import React, { useEffect, useState } from "react";

const inputClass =
  "block w-full rounded-xl border border-silver bg-mist/60 px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 transition focus:border-forest focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest/30";

const labelClass = "mb-2 block text-sm font-semibold text-ink";

const classOptions = ["5", "6", "7", "8", "9", "10"];
const gradeOptions = ["A+", "A", "B+", "B", "C"];

const StudentForm = ({ initialData, onSubmit, buttonText = "Add Student" }) => {
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    phone: "",
    email: "",
    age: "",
    class: "",
    grade: "",
    image: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-6">
        {/* Name */}
        <div className="md:col-span-3">
          <label htmlFor="name" className={labelClass}>
            Student Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className={inputClass}
            placeholder="Enter student name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Roll Number */}
        <div className="md:col-span-3">
          <label htmlFor="rollNumber" className={labelClass}>
            Roll Number
          </label>
          <input
            id="rollNumber"
            type="text"
            name="rollNumber"
            className={inputClass}
            placeholder="Enter roll number"
            value={formData.rollNumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone */}
        <div className="md:col-span-3">
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            className={inputClass}
            placeholder="Enter phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="md:col-span-3">
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className={inputClass}
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Age */}
        <div className="md:col-span-2">
          <label htmlFor="age" className={labelClass}>
            Age
          </label>
          <input
            id="age"
            type="number"
            name="age"
            className={inputClass}
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>

        {/* Class */}
        <div className="md:col-span-2">
          <label htmlFor="class" className={labelClass}>
            Class
          </label>
          <select
            id="class"
            name="class"
            className={inputClass}
            value={formData.class}
            onChange={handleChange}
            required
          >
            <option value="">Select Class</option>
            {classOptions.map((c) => (
              <option key={c} value={c}>
                Class {c}
              </option>
            ))}
          </select>
        </div>

        {/* Grade */}
        <div className="md:col-span-2">
          <label htmlFor="grade" className={labelClass}>
            Grade
          </label>
          <select
            id="grade"
            name="grade"
            className={inputClass}
            value={formData.grade}
            onChange={handleChange}
          >
            <option value="">Select Grade</option>
            {gradeOptions.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Image */}
        <div className="md:col-span-6">
          <label htmlFor="image" className={labelClass}>
            Image URL
          </label>
          <input
            id="image"
            type="url"
            name="image"
            className={inputClass}
            placeholder="https://example.com/student.jpg"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-xl bg-forest px-6 py-3 text-sm font-semibold text-white shadow-md shadow-forest/30 transition-all duration-200 hover:bg-forest-light hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest sm:w-auto"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default StudentForm;