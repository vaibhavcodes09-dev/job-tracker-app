import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AddJobs from "./pages/AddJobs";
import EditJob from "./pages/EditJob";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              {" "}
              <Dashboard />{" "}
            </ProtectedRoutes>
          }
        />
        <Route
          path="/edit-job/:id"
          element={
            <ProtectedRoutes>
              <EditJob />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/add-job"
          element={
            <ProtectedRoutes>
              <AddJobs />
            </ProtectedRoutes>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
