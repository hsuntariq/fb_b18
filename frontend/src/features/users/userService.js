import axios from "axios";

export const regUserService = async (userData) => {
  const response = await axios.post(
    "http://localhost:5174/api/users/reg-user",
    userData
  );
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};
