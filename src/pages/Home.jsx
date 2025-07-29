import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import SearchBar from "../components/SearchBar.jsx";

export default function Home() {
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    setProjects([]);
    setLoading(true);

    API.get("/projects")
      .then((res) => setProjects(res.data.projects))
      .catch((err) => setError("Error fetching projects !"))
      .finally(() => setLoading(false));
    console.log(projects);
  }, []);

  return (
    <div>
      {/* Search Bar */}
      <SearchBar />

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-4 ">
        {!error &&
          projects?.length > 0 &&
          projects?.map((project) => (
            <div key={project._id} className="p-4 rounded flex flex-col gap-4">
              <img
                className="h-auto max-w-full rounded-lg shadow-sm"
                src={`https://placehold.co/600x400/orange/white?text=${project.title}`}
                alt={project.title}
              />
              <h2 className="text-xl font-bold">
                <Link to={`/projects/${project._id}`}>{project.title}</Link>
              </h2>
              <p className="text-gray-500">By {project.user.name}</p>
            </div>
          ))}
      </div>

      {loading && (
        <div className="flex justify-center items-center min-w-screen min-h-40">
          <div className="loader"></div>
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center min-w-screen min-h-40 text-3xl text-gray-300 italic">
          {error}
        </div>
      )}
    </div>
  );
}
