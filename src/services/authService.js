import API from "./api";

export const login = async (data) => {
  try {
    const res = await API.post("token/", data);

    console.log("LOGIN RESPONSE:", res.data); // 👈 debug

    // 🔥 token save
    localStorage.setItem("token", res.data.access);

    return res.data;
  } catch (error) {
    console.error("LOGIN ERROR:", error.response?.data || error);
    throw error;
  }
};