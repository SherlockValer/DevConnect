import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateProject() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    liveDemo: "",
    sourceCode: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/projects", { ...form });
      navigate("/");
    } catch (err) {
      toast.error(`Failed to create project : ${err.response?.data?.message}`);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 space-y-8">
      <h2 className="text-3xl font-bold">Add Project</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        <input
          className="w-full p-2 border rounded-sm"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          className="w-full p-2 border rounded-sm"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={5}
          required
        />
        <input
          className="w-full p-2 border rounded-sm"
          placeholder="Live Demo Link"
          value={form.liveDemo}
          onChange={(e) => setForm({ ...form, liveDemo: e.target.value })}
          required
        />
        <input
          className="w-full p-2 border rounded-sm"
          placeholder="Source Code Link"
          value={form.sourceCode}
          onChange={(e) => setForm({ ...form, sourceCode: e.target.value })}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-violet-600 text-white px-4 py-2 rounded-sm"
        >
          {loading ? "Creating Project....." : "Submit"}
        </button>
      </form>
    </div>
  );
}
