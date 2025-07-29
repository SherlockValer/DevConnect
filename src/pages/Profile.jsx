import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

export default function Profile() {
  const [profile, setProfile] = useState(null);

  const [form, setForm] = useState({
    name: "",
    bio: "",
    skills: "",
  });

  const [profileLoading, setProfileLoading] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProfileLoading(true);

    API.get("/users/me")
      .then((res) => {
        const user = res.data.user;
        setProfile(user);
        setForm({
          name: user.name || "",
          bio: user.bio || "",
          skills: user.skills?.join(", ") || "",
        });
      })
      .catch((err) => toast.error(err.response?.data?.message))
      .finally(() => {
        setProfileLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updated = {
        name: form.name,
        bio: form.bio,
        skills: form.skills.split(",").map((s) => s.trim()),
      };

      const res = await API.put("/users/me", updated);
      setProfile(res.data.user);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Something went wrong.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (profileLoading)
    return (
      <div className="flex justify-center items-center min-w-screen min-h-96">
        <div className="loader"></div>
      </div>
    );

  return (
    <div className="max-w-xl mx-auto mt-4 p-6 ">
      <h2 className="text-3xl font-bold mb-8">My Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-2">Name</label>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Skills (comma separated)
          </label>
          <input
            name="skills"
            type="text"
            value={form.skills}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
