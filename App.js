import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './signup';
import Login from './login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import routing components
import { Navigate } from 'react-router-dom'; // Import routing components
import FacultyPublications from './FacultyPublications';
import Summarizer from './Sum';
import MePage from './MePage';
import CommunityPage from './CommunityPage';
import TeacherLeaderboard from './leaderboard';
import UserProfile from './userprofile';
import Dashboard from './dash';
import StockManagement from './homepage';

function Redirect() {
  return <Navigate to='/login'/>
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Redirect/>}/>
          {/* Route for Signup page */}
          <Route path="/signup" element={<Signup />} />

          <Route path="/login" element={<Login />} /> {/* Placeholder for Login */}
          <Route path="/fac" element={<FacultyPublications />} />
          <Route path="/summary" element={<Summarizer />} />
          <Route path="/me" element={<MePage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/board" element={<TeacherLeaderboard />} />
          <Route path="/dashb" element={<Dashboard />} />
          <Route path="/home" element={<StockManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
