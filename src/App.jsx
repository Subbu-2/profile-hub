import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/login";
import Welcome from "./pages/welcome";
import Intro from "./pages/intro";
// import Navbar from "./pages/navbar";
import Signup from "./pages/signup";
import Logout from "./pages/logout";
// import Footer from "./pages/footer";
import Terms from "./pages/terms";
import Privacy from "./pages/privacy";
import ProfileEditPage from "./pages/profileEdit";
import PublicProfilePage from "./pages/publicProfile";
import ProtectedRoute from "./routes/protected";
import PublicRoute from "./routes/public";
import AppLayout from "./layouts/appLayout";
import PublicLayout from "./layouts/publicLayout";
import ProfileSettingsPage from "./pages/profileSettingsPage";
import NotFoundPage from "./pages/notFoundPage";

function LoginPage() {
  const navigate = useNavigate();
  return <Login onSuccess={() => navigate("/welcome")} />;
}

function WelcomePage() {
  const navigate = useNavigate();
  return <Welcome onLogout={() => navigate("/logout")} />;
}

function IntroPage() {
  const navigate = useNavigate();
  return <Intro onLogin={() => navigate("/login")} />;
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/login" element={<PublicRoute><div className="ph-center"><LoginPage /></div></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><div className="ph-center"><Signup /></div></PublicRoute>} />
          <Route path="/logout" element={<PublicRoute><div className="ph-center"><Logout /></div></PublicRoute>} />
          <Route path="/profile/edit" element={<ProtectedRoute><div className="ph-page"><ProfileEditPage /></div></ProtectedRoute>} />
          <Route path="/welcome" element={<ProtectedRoute><div className="ph-center"><WelcomePage /></div></ProtectedRoute>} />
          <Route path="/" element={<div className="ph-page"><IntroPage /></div>} />
          <Route path="/terms" element={<div className="ph-center"><Terms /></div>} />
          <Route path="/privacy" element={<div className="ph-center"><Privacy /></div>} />
          <Route path="/profile/settings" element={<ProtectedRoute><ProfileSettingsPage /></ProtectedRoute>} />
        </Route>
        <Route element={<PublicLayout />}>
          <Route path="/public/:username" element={<div className="ph-page"><PublicProfilePage /></div>} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
