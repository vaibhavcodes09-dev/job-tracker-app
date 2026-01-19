import { useNavigate } from "react-router-dom";

export default function JobCard({ job, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="glass rounded-3xl p-5 flex flex-col gap-2 hover:scale-105 transition-all ease-in-out duration-200">
      <div className="flex justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold ">{job.role}</h3>
          <p className="text-white/70">{job.company}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl border border-white/20 text-sm text-white/80">
            {job.status}
          </span>

          <button
            onClick={() => navigate(`/edit-job/${job.id}`)}
            className="px-3 py-1 rounded-xl border border-white/20 hover:bg-white/10 text-sm"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(job.id)}
            className="px-3 py-1 rounded-xl border border-red-500/40 text-red-300 hover:bg-red-500/10 text-sm"
          >
            Delete
          </button>
        </div>
      </div>

      {job.location ? (
        <p className="text-white/70 text-sm">📍 {job.location}</p>
      ) : null}

      {job.link ? (
        <a
          className="text-sm underline text-white/90 hover:text-white"
          href={job.link}
          target="_blank"
          rel="noreferrer"
        >
          Open job link
        </a>
      ) : null}

      {job.notes ? (
        <p className="text-sm text-white/70 mt-2">{job.notes}</p>
      ) : null}
    </div>
  );
}
