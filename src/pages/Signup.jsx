import { Link, useNavigate } from "react-router-dom";
import { newSignUp } from "../firebase/auth";
import { useState } from "react";
import { createUserProfile } from "../firebase/users";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Email and password are required...");
      return;
    }
    if (password.length < 6) {
      setError("Password must be atleast 6 characters");
    }
    try {
      setLoading(true);
      const res = await newSignUp(email, password);
      const uid = res.user.uid;

      await createUserProfile(uid, {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      });
      navigate("/", { replace: true });
    } catch (err) {
      setError(err?.message || "Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white flex items-center justify-center bg-grid">
      <div className="glass w-full max-w-md rounded-2xl p-6">
        <h2 className="text-3xl font-bold">Create Account</h2>
        <p className="text-white/50 mt-1">
          Start Tracking your job applications
        </p>
        <div className="mt-4 space-y-4">
          <form
            onSubmit={(e) => {
              handleSignUp(e);
            }}
          >
            <div>
              <label className="text-sm text-white/50">Full Name</label>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                placeholder="Enter Your Name"
                className="w-full bg-white/10 rounded-xl px-4 py-3 outline-none mt-2 border border-white/10 focus:border-white/30"
              />
            </div>

            <div>
              <label className="text-sm text-white/50">Email</label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                placeholder="abc@gmail.com"
                className="w-full bg-white/10 rounded-xl px-4 py-3 outline-none mt-2 border border-white/10 focus:border-white/30"
              />
            </div>
            <div>
              <label className="text-sm text-white/50">Password</label>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                className="w-full bg-white/10 rounded-xl px-4 py-3 outline-none mt-2 border border-white/10 focus:border-white/30"
                placeholder="Minimum 6 characters"
              />
            </div>
            {error ? (
              <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                {error}
              </div>
            ) : null}
            <button
              disabled={loading}
              className="w-full bg-white text-black rounded-xl mt-6 py-2 hover:opacity-80"
            >
              {loading ? "Creating..." : "Signup"}
            </button>
          </form>
          <p className="text-sm mt-1.5">
            Already have an account?{" "}
            <Link to="/login" className="underline font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
