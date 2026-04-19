import { useEffect, useState } from "react";
import { getNotes, addNote, deleteNote } from "../services/noteService";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");

  // ✅ Fetch Notes (SAFE)
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await getNotes(search);
        console.log("API RESPONSE:", res);

        if (Array.isArray(res)) {
          setNotes(res);
        } else if (Array.isArray(res?.results)) {
          setNotes(res.results);
        } else {
          setNotes([]);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
        setNotes([]);
      }
    };

    fetchNotes();
  }, [search]);

  // ✅ Add Note
  const handleAdd = async () => {
    if (!title || !content) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await addNote({ title, content });
      setNotes((prev) => [res?.data, ...prev].filter(Boolean));
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // ✅ Delete Note
  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((note) => note?.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // ✅ Toggle Pin
  const togglePin = async (note) => {
    if (!note) return;

    const token = localStorage.getItem("token");

    try {
      await fetch(`http://127.0.0.1:8000/api/notes/${note.id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          is_pinned: !note.is_pinned,
        }),
      });

      // Update state safely
      setNotes((prev) =>
        prev.map((n) =>
          n?.id === note.id ? { ...n, is_pinned: !n.is_pinned } : n
        )
      );
    } catch (error) {
      console.error("Error toggling pin:", error);
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      {/* 🔴 Logout */}
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white p-2 rounded mb-4"
      >
        Logout
      </button>

      {/* 🔍 Search */}
      <input
        placeholder="Search notes..."
        className="p-2 mb-4 w-full border rounded text-black"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ➕ Add Note */}
      <div className="mb-4">
        <input
          placeholder="Title"
          className="p-2 mr-2 border rounded text-black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Content"
          className="p-2 mr-2 border rounded text-black"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white p-2 rounded"
        >
          Add
        </button>
      </div>

      {/* 📦 Notes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {notes?.filter(Boolean).map((note) => (
          <motion.div
            key={note?.id}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-4 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ${
              note?.is_pinned
                ? "bg-yellow-500 text-black"
                : "bg-gray-800 text-white"
            }`}
          >
            <h2 className="text-lg font-bold">{note?.title}</h2>
            <p className="text-sm mt-2">{note?.content}</p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleDelete(note?.id)}
                className="bg-red-500 p-1 rounded text-white"
              >
                Delete
              </button>

              <button
                onClick={() => togglePin(note)}
                className="bg-yellow-500 p-1 rounded"
              >
                {note?.is_pinned ? "📌 Unpin" : "📌 Pin"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;