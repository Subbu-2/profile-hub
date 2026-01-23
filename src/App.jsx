import { BrowserRouter as Router,	Routes,	Route, useNavigate } from 'react-router-dom';
import Login from './components/login'
import Welcome from "./components/welcome";
import Intro from "./components/intro";
import Navbar from './components/navbar';
import Signup from './components/signup';

function LoginPage() {
  const navigate = useNavigate();
  return <Login onSuccess={() => navigate("/welcome")} />;
}

function WelcomePage() {
  const navigate = useNavigate();
  return <Welcome onLogout={() => navigate("/")} />;
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
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<Signup />} />
      {/* <Route path='/logout' element={<Logout />} />
      <Route path='/forgot-password' element={<ForgotPwd />} />
      <Route path='/update-profile' element={<UpdateProfile />} /> */}
      <Route exact path='/welcome' element={<WelcomePage  />} />
      <Route exact path='/' element={<IntroPage />} />
      </Routes>
    </div>
    </Router>
  )
}

export default App
