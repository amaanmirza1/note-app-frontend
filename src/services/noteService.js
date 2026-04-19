import API from "./api";

// GET all notes
export const getNotes = async (search = "") => {
  const token = localStorage.getItem("token");

  try {
    const res = await API.get(`notes/?search=${search}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("GET NOTES ERROR:", error.response?.data || error);
    throw error;
  }
};

// ADD note
export const addNote = async (data) => {
  const token = localStorage.getItem("token");

  try {
    const res = await API.post("notes/", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("ADD NOTE ERROR:", error.response?.data || error);
    throw error;
  }
};

// DELETE note
export const deleteNote = async (id) => {
  const token = localStorage.getItem("token");

  try {
    const res = await API.delete(`notes/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("DELETE NOTE ERROR:", error.response?.data || error);
    throw error;
  }
};