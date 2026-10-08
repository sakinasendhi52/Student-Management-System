import api from "../../api";

// ===============================
// ACTION TYPES
// ===============================

export const FETCH_STUDENTS_REQUEST = "FETCH_STUDENTS_REQUEST";
export const FETCH_STUDENTS_SUCCESS = "FETCH_STUDENTS_SUCCESS";
export const FETCH_STUDENTS_FAILURE = "FETCH_STUDENTS_FAILURE";

export const ADD_STUDENT_SUCCESS = "ADD_STUDENT_SUCCESS";
export const UPDATE_STUDENT_SUCCESS = "UPDATE_STUDENT_SUCCESS";
export const DELETE_STUDENT_SUCCESS = "DELETE_STUDENT_SUCCESS";

// ===============================
// FETCH STUDENTS
// ===============================

export const fetchStudents = () => async (dispatch) => {
  dispatch({
    type: FETCH_STUDENTS_REQUEST,
  });

  try {
    const response = await api.get("/students");

    dispatch({
      type: FETCH_STUDENTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_STUDENTS_FAILURE,
      payload: error.message,
    });
  }
};

// ===============================
// ADD STUDENT
// ===============================

export const addStudent = (student) => async (dispatch) => {
  try {
    const response = await api.post("/students", student);

    dispatch({
      type: ADD_STUDENT_SUCCESS,
      payload: response.data,
    });

    return response.data;
  } catch (error) {
    console.error("Add student error:", error);
    throw error;
  }
};

// ===============================
// UPDATE STUDENT
// ===============================

export const updateStudent = (id, student) => async (dispatch) => {
  try {
    const response = await api.put(`/students/${id}`, student);

    dispatch({
      type: UPDATE_STUDENT_SUCCESS,
      payload: response.data,
    });

    return response.data;
  } catch (error) {
    console.error("Update student error:", error);
    throw error;
  }
};

// ===============================
// DELETE STUDENT
// ===============================

export const deleteStudent = (id) => async (dispatch) => {
  try {
    await api.delete(`/students/${id}`);

    dispatch({
      type: DELETE_STUDENT_SUCCESS,
      payload: id,
    });

    return true;
  } catch (error) {
    console.error("Delete student error:", error);
    throw error;
  }
};