import { BrowserRouter as Router,	Routes,	Route, useNavigate } from 'react-router-dom';
import Login from './components/login'
import Welcome from "./components/welcome";
import Intro from "./components/intro";
import Navbar from './components/navbar';
import Signup from './components/signup';
import Logout from "./components/logout";
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
    <Navbar />
      <div className='main-container'>
      <Routes>
      <Route path='/login' element={ <PublicRoute><LoginPage /></PublicRoute>} />
      <Route path='/signup' element={ <PublicRoute><Signup /></PublicRoute>} />
      <Route path='/logout' element={<PublicRoute><Logout /></PublicRoute>} />
      {/* <Route path='/forgot-password' element={<ForgotPwd />} />
      <Route path='/update-profile' element={<UpdateProfile />} /> */}
      <Route exact path='/welcome' element={<ProtectedRoute><WelcomePage /></ProtectedRoute>} />
      <Route exact path='/' element={<IntroPage />} />
      </Routes>
    </div>
    </Router>
  )
}

export default App
