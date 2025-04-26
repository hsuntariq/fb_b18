import axios from "axios";
const base_url = "http://localhost:5174/api/users";
export const regUserService = async (userData) => {
  const response = await axios.post(`${base_url}/users/reg-user`, userData);
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
