import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { getJobById, updateJob } from "../firebase/jobs";

const STATUS = ["Applied", "Interview", "Selected", "Rejected"];

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authUser } = useAuth();

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [location, setLocation] = useState("");
  const [link, setLink] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setError("");
      setLoading(true);

      const job = await getJobById(id);

      if (!job) {
        setError("Job not found.");
        setLoading(false);
        return;
      }

      // extra safety
      if (job.userId !== authUser.uid) {
        setError("Not allowed.");
        setLoading(false);
        return;
      }

      setCompany(job.company || "");
      setRole(job.role || "");
      setStatus(job.status || "Applied");
      setLocation(job.location || "");
      setLink(job.link || "");
      setNotes(job.notes || "");

      setLoading(false);
    };

    if (authUser?.uid) load();
  }, [id, authUser]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");

    if (!company.trim() || !role.trim()) {
      setError("Company and Role are required.");
      return;
    }

    const capitalize = (str)=>{
      if(!str){
        return
      }
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    }

    try {
      setSaving(true);

      await updateJob(id, {
        company: capitalize(company.trim()),
        role: capitalize(role.trim()),
        status,
        location: capitalize(location.trim()),
        link: link.trim(),
        notes: notes.trim(),
      });

      navigate("/", { replace: true });
    } catch (err) {
      setError(err?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-white/70">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6 bg-grid">
      <div className="max-w-4xl mx-auto space-y-6">
        <Navbar />

        <div className="glass rounded-3xl p-6">
          <h1 className="text-3xl font-bold">Edit Job</h1>

          <form onSubmit={handleUpdate} className="mt-6 space-y-4">
            <div>
              <label className="text-sm text-white/70">Company *</label>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="mt-2 w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
                type="text"
              />
            </div>

            <div>
              <label className="text-sm text-white/70">Role *</label>
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-2 w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
                type="text"
              />
            </div>

            <div>
              <label className="text-sm text-white/70">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-2 w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
              >
                {STATUS.map((s) => (
                  <option key={s} value={s} className="bg-black">
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-white/70">Location</label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-2 w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
                type="text"
              />
            </div>

            <div>
              <label className="text-sm text-white/70">Job Link</label>
              <input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="mt-2 w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
                type="url"
              />
            </div>

            <div>
              <label className="text-sm text-white/70">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-2 w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-white/30 min-h-30"
              />
            </div>

            {error ? (
              <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                {error}
              </div>
            ) : null}

            <div className="flex gap-3">
              <button
                disabled={saving}
                className="bg-white text-black px-6 py-3 rounded-2xl font-semibold hover:opacity-80 disabled:opacity-60"
              >
                {saving ? "Saving..." : "Update Job"}
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
