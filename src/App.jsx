import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/login";
import Welcome from "./components/welcome";
import Intro from "./components/intro";
import Navbar from "./components/navbar";
import Signup from "./components/signup";
import Logout from "./components/logout";
import Footer from "./components/footer";
import Terms from "./components/terms";
import Privacy from "./components/privacy";
import ProtectedRoute from "./components/routes/protected";
import PublicRoute from "./components/routes/public";

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
      <div className="ph-app">
        <Navbar />

        <main className="ph-main">
          {/* <div className="main-container"> */}
            <Routes>
              <Route path="/login" element={<PublicRoute><div className="ph-center"><LoginPage /></div></PublicRoute>} />
              <Route path="/signup" element={<PublicRoute><div className="ph-center"><Signup /></div></PublicRoute>} />
              <Route path="/logout" element={<PublicRoute><div className="ph-center"><Logout /></div></PublicRoute>} />

              <Route path="/welcome" element={<ProtectedRoute><div className="ph-center"><WelcomePage /></div></ProtectedRoute>} />
              <Route path="/" element={<div className="ph-page"><IntroPage /></div>} />
              <Route path="/terms" element={<div className="ph-center"><Terms /></div>} />
              <Route path="/privacy" element={<div className="ph-center"><Privacy /></div>} />
            </Routes>
          {/* </div> */}
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
