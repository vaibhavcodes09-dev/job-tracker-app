import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getJobsByUser } from "../firebase/jobs";
import JobCard from "./JobCard";
import { deleteJob } from "../firebase/jobs";

export default function Dashboard() {
  const navigate = useNavigate();
  const [jobs, setJob] = useState([]);
  const [loadingJobs, setLoadingJob] = useState(false);
  const { authUser } = useAuth();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const appliedCount = jobs.filter((j) => j.status === "Applied").length;
  const interviewCount = jobs.filter((j) => j.status === "Interview").length;
  const selectedCount = jobs.filter((j) => j.status === "Selected").length;
  const rejectedCount = jobs.filter((j) => j.status === "Rejected").length;

  useEffect(() => {
    const loadJob = async () => {
      setLoadingJob(true);
      const data = await getJobsByUser(authUser.uid);
      setJob(data);
      setLoadingJob(false);
    };
    if (authUser?.uid) {
      loadJob();
    }
  }, [authUser]);

  const handleDelete = async (jobId) => {
    const ok = confirm("Delete this job?");
    if (!ok) return;

    await deleteJob(jobId);

    // update UI immediately
    setJob((prev) => prev.filter((j) => j.id !== jobId));
  };

  const filteredJobs = jobs.filter((job) => {
    const text = `${job.company} ${job.role}`.toLowerCase();
    const matchesSearch = text.includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ? true : job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-black text-white space-y-4 px-4 py-3">
      <Navbar />
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="glass flex justify-between p-6 gap-4 rounded-3xl">
          <div>
            <h1 className="font-bold text-3xl">Job Tracker</h1>
            <p className="mt-1 text-white/90">
              Track Applications, interviews, and follow-ups.
            </p>
          </div>
          <button
            className="bg-white text-black px-5 hover:opacity-80 font-semibold rounded-2xl cursor-pointer py-3"
            onClick={() => {
              navigate("/add-job");
            }}
          >
            + Add Job
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass rounded-3xl p-5">
            <h2 className="text-lg font-semibold">Applied</h2>
            <p className="text-white/80 text-2xl font-semibold">
              {appliedCount}
            </p>
          </div>
          <div className="glass rounded-3xl p-5">
            <h2 className="text-lg font-semibold">Interview</h2>
            <p className="text-white/80 text-2xl font-semibold">
              {interviewCount}
            </p>
          </div>
          <div className="glass rounded-3xl p-5">
            <h2 className="text-lg font-semibold">Selected</h2>
            <p className="text-white/80 text-2xl font-semibold">
              {selectedCount}
            </p>
          </div>
          <div className="glass rounded-3xl p-5">
            <h2 className="text-lg font-semibold">Rejected</h2>
            <p className="text-white/80 text-2xl font-semibold">
              {rejectedCount}
            </p>
          </div>
        </div>
        <div className="glass rounded-3xl p-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by company or role..."
            className="w-full sm:w-[60%] rounded-2xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-[40%] rounded-2xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
          >
            <option value="All" className="bg-black">
              All
            </option>
            <option value="Applied" className="bg-black">
              Applied
            </option>
            <option value="Interview" className="bg-black">
              Interview
            </option>
            <option value="Selected" className="bg-black">
              Selected
            </option>
            <option value="Rejected" className="bg-black">
              Rejected
            </option>
          </select>
        </div>

        <div className="glass p-5 rounded-3xl">
          <h2 className="text-2xl font-semibold ">Applications</h2>
          <div className="mt-5 space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {loadingJobs ? (
              <div className="border border-white/10 rounded-2xl p-6 text-white/60">
                Loading jobs...
              </div>
            ) : jobs.length === 0 ? (
              <div className="border border-white/10 rounded-2xl p-6 text-white/60">
                No jobs yet.
              </div>
            ) : (
              filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} onDelete={handleDelete} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
