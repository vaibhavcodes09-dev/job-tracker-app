import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { createJob } from "../firebase/jobs";

export default function AddJobs() {
  const navigate = useNavigate();
  const { authUser } = useAuth();

  const STATUS = ["Applied", "Interview", "Selected", "Rejected"];

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [location, setLocation] = useState("");
  const [link, setLink] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");

    if (!company.trim() || !role.trim()) {
      setError("Company and Role are required");
      return;
    }

    const capitalize = (str)=>{
      if(!str){
        return
      }
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    }

    try {
      setLoading(true);

      await createJob({
        userId: authUser.uid,
        company: capitalize(company.trim()),
        role: capitalize(role.trim()),
        status,
        location: capitalize(location.trim()),
        link: link.trim(),
        notes: notes.trim(),
      });

      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white px-4 py-6 bg-grid">
      <div className="max-w-4xl space-y-6 mx-auto">
        <Navbar />
        <div className="glass rounded-3xl px-6 py-4">
          <h1 className="font-bold text-2xl">Add Job</h1>
          <p className="text-white/80 mt-1">
            Create a new job application entry
          </p>

          <form
            onSubmit={(e) => {
              handleCreate(e);
            }}
          >
            <div className="mt-4">
              <label className="text-lg font-medium">Company</label>
              <input
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value);
                }}
                type="text"
                placeholder="Amazon"
                className="w-full bg-white/10 rounded-xl px-4 py-3 outline-none mt-2 border border-white/10 focus:border-white/30"
              />
            </div>
            <div className="mt-4">
              <label className="text-lg font-medium">Role</label>
              <input
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                type="text"
                placeholder="Front-End Intern"
                className="w-full bg-white/10 rounded-xl px-4 py-3 outline-none mt-2 border border-white/10 focus:border-white/30"
              />
            </div>
            <div className="mt-4">
              <label className="text-lg font-medium">Status</label>
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                className="w-full bg-white/10 rounded-xl px-4 py-3 outline-none mt-2 border border-white/10 focus:border-white/30"
              >
                {STATUS.map((s) => (
                  <option key={s} value={s} className="bg-black">
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4">
              <label className="text-lg font-medium">Location</label>
              <input
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                type="text"
                placeholder="Remote/Delhi/Pune"
                className="w-full bg-white/10 rounded-xl px-4 py-3 outline-none mt-2 border border-white/10 focus:border-white/30"
              />
            </div>
            <div className="mt-4">
              <label className="text-lg font-medium">Job Link</label>
              <input
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                }}
                type="url"
                placeholder="https://"
                className="w-full bg-white/10 rounded-xl px-4 py-3 outline-none mt-2 border border-white/10 focus:border-white/30"
              />
            </div>
            <div className="mt-4">
              <label className="text-lg font-medium">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                }}
                className="mt-2 w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-white/30 min-h-30"
                placeholder="Follow up after 3 days..."
              ></textarea>
            </div>

            {error ? (
              <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                {error}
              </div>
            ) : null}

            <div className="flex gap-3 mt-2">
              <button
                disabled={loading}
                className="bg-white text-black px-6 py-3 rounded-2xl font-semibold hover:opacity-80 disabled:opacity-60"
              >
                {loading ? "Saving..." : "Save Job"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/", { replace: true })}
                className="px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/10"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
