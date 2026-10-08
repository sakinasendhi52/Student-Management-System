import api from "../../api";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

export const login = (email, password) => async (dispatch) => {
  try {
    // Get all users
    const response = await api.get("/users");

    const users = response.data;

    // Find matching user
    const user = users.find(
      (u) =>
        u.email === email.trim() &&
        u.password === password
    );

    console.log("Users:", users);
    console.log("Login user:", user);

    if (!user) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: "Invalid email or password",
      });

      return false;
    }

    // Save logged-in user
    localStorage.setItem("user", JSON.stringify(user));

    dispatch({
      type: LOGIN_SUCCESS,
      payload: user,
    });

    return true;
  } catch (error) {
    console.error("Login error:", error);

    dispatch({
      type: LOGIN_FAILURE,
      payload: "Unable to connect to server",
    });

    return false;
  }
};

export const logout = () => {
  localStorage.removeItem("user");

  return {
    type: LOGOUT,
  };
};