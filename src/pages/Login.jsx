import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../firebase/auth";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required...");
      return;
    }
    if (password.length < 6) {
      setError("Password must be atleast 6 characters");
      return;
    }
    try {
      setLoading(true);
      await loginUser(email, password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err?.message || "Signin Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white flex items-center justify-center bg-grid">
      <div className="glass w-full max-w-md rounded-2xl sm:m-0 mx-6 p-6">
        <h2 className="text-3xl font-bold">Welcome Back</h2>
        <p className="text-white/50 mt-1">Login to Job Tracker</p>
        <div className="mt-4 space-y-4">
          <form onSubmit={(e)=>{handleSignUp(e)}}>
            <div>
              <label className="text-sm text-white/50">Email</label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                type="email"
                placeholder="abc@gmail.com"
                className="w-full bg-white/10 rounded-xl px-4 py-3 outline-none mt-2 border border-white/10 focus:border-white/30"
              />
            </div>
            <div>
              <label className="text-sm text-white/50">Password</label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                type="password"
                className="w-full bg-white/10 rounded-xl px-4 py-3 outline-none mt-2 border border-white/10 focus:border-white/30"
                placeholder="••••••••"
              />
            </div>
            {error ? (
              <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                {error}
              </div>
            ) : null}
            <button className="w-full bg-white text-black rounded-xl mt-6 py-2 hover:opacity-80">
              {loading ? "Signing In..." : "Login"}
            </button>
          </form>
          <p className="text-sm mt-1.5">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline font-medium">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
