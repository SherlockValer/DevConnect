import { useState } from "react";
import { Search } from "lucide-react";

import API from "../api/axios";
import { toast } from "react-toastify";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);

  const handleSearch = async () => {
    if (query) {
      const res = await API.get(`/search?query=${query}`);
      setResults(res.data);
    } else {
      toast.error("Please enter a name or project")
    }
  };

  return (
    <div className="relative max-w-xl mx-auto my-20">
      <div
        className="flex items-center justify-between border border-gray-950/20 rounded-lg p-2 shadow-lg "
        onBlur={() => setResults(null)}
      >
        <input
          className="w-full p-2 outline-none"
          placeholder="Search by name or project"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-violet-600 text-white px-4 py-2 rounded-lg"
          onClick={handleSearch}
        >
          <Search />
        </button>
      </div>

      {results && (
        <div className="absolute left-0 top-15 w-full border border-gray-950/20 bg-white mt-4 p-4 rounded-lg shadow-lg">
          <h3 className="font-bold">Users</h3>
          {results.users.map((user) => (
            <div key={user._id} className="p-2">
              {user.name}
            </div>
          ))}
          <h3 className="font-bold mt-4">Projects</h3>
          {results.projects.map((project) => (
            <div key={project._id} className="p-2">
              {project.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
