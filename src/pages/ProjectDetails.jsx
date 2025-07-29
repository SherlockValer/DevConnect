import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import { Code, Radio } from "lucide-react";
import { timeAgo } from "../utils/timesAgo.js";
import { toast } from "react-toastify";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    API.get(`/projects/${id}`)
      .then((res) => setProject(res.data?.project))
      .catch((err) => toast.error(err.response?.data?.message));

    API.get(`/projects/${id}/comments`)
      .then((res) => setComments(res.data?.comments))
      .catch((err) => toast.error(err.response?.data?.message));
  }, [id]);

  const postComment = async () => {
    if (!comment) {
      toast.error("Please add feedback");
      return;
    }
    try {
      await API.post(`/projects/${id}/comments`, { text: comment });
      setComment("");
      const res = await API.get(`/projects/${id}/comments`);
      setComments(res.data?.comments);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  if (!project)
    return (
      <div className="flex justify-center items-center min-w-screen min-h-96">
        <div className="loader"></div>
      </div>
    );

  return (
    <div className=" flex flex-col gap-8 mt-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-8 items-start  md:items-center">
        <div className="flex-1/3 flex flex-col gap-8 justify-center items-start">
          <div className="flex items-center gap-4">
            <img
              className="w-15 rounded-full"
              src={`/person.png`}
              alt={project.user.name}
            />
            <h5 className="text-xl font-semibold text-gray-600">
              {project.user.name}
            </h5>
          </div>
          <h1 className="text-3xl font-bold leading-12">{project.title}</h1>
        </div>
        <div className="flex-2/3">
          <img
            className="w-full rounded-lg"
            src={`/img.webp`}
            alt=""
          />
        </div>
      </div>

      {/* About */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-medium">About</h2>
        <div className="mb-6 h-px w-full bg-gray-300"></div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-2/3">
            <p className="text-xl">{project?.description}</p>
          </div>

          <div className="flex-1/3">
            <h2 className="text-xl font-bold mb-6">Links</h2>
            <div className="flex gap-4">
              <a href={project.liveDemo} target="_blank">
                <Radio />
                Live Demo
              </a>
              <a href={project.sourceCode} target="_blank">
                <Code />
                Source Code
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="w-full md:w-2/3 md:pe-6">
        <div className="mt-4">
          <h2 className="text-2xl font-medium mb-4">Comments</h2>
          <div className="mb-6 h-px w-full bg-gray-300"></div>

          <textarea
            className="border p-2 w-full rounded-sm mt-4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add feedback..."
            rows={5}
          ></textarea>
          <button
            className="bg-emerald-600 text-white my-4 px-4 py-1 rounded-sm"
            onClick={postComment}
          >
            Comment
          </button>
        </div>

        <div className="mt-4 space-y-2">
          {comments.length > 0 &&
            comments.map((c) => (
              <div key={c._id} className="p-2 mt-6">
                <div className="flex gap-4 items-center">
                  <img
                    className="w-10 rounded-full"
                    src={`/person.png`}
                    alt={c.user.name}
                  />
                  <div className="flex flex-col justify-start`">
                    <p>
                      <strong>{c.user.name} </strong> &middot;{" "}
                      <span className="text-gray-500 text-sm">
                        {timeAgo(c.createdAt)}
                      </span>
                    </p>
                    <span>{c.text}</span>
                  </div>
                </div>

                <div className="mt-8 h-px w-full bg-gray-300"></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
