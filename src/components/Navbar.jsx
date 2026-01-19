import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../firebase/auth";

export default function Navbar() {
  const { profile, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="glass rounded-3xl px-6 py-4 flex items-center justify-between">
      <Link to="/" className="font-bold text-xl">
        Job Tracker
      </Link>

      {loading ? (
        <p className="text-white/70">Loading...</p>
      ) : profile ? (
        <div className="flex items-center gap-4">
          <p className="text-white/80">
            Hi, <span className="font-semibold text-white">{profile.name}</span>
          </p>

          <button
            onClick={handleLogout}
            className="bg-white text-black px-4 py-2 rounded-2xl font-semibold hover:opacity-80"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 rounded-2xl border border-white/20 hover:bg-white/10"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-white text-black px-4 py-2 rounded-2xl font-semibold hover:opacity-80"
          >
            Signup
          </Link>
        </div>
      )}
    </div>
  );
}
