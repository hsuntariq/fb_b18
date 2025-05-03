import axios from "axios";
const base_url = "http://localhost:5174/api/users";
export const regUserService = async (userData) => {
  const response = await axios.post(`${base_url}`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

export const logUser = async (userData) => {
  const response = await axios.post(`${base_url}/login-user`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

export const verifyOTP = async (otpData) => {
  const response = await axios.post(
    `${base_url}/verify-otp/${otpData?.id}`,
    otpData
  );
  return response.data;
};
