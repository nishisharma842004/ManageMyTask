import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Auth/Login';
import PrivateRoute from './components/Auth/PrivateRoute';
import Signup from './components/Auth/Signup';
import Navbar from './components/Layout/Navbar';
import TaskList from './components/Tasks/TaskList';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <div className="container mt-4">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<PrivateRoute><TaskList /></PrivateRoute>} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;