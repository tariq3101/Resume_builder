import './App.css';
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Resume from './pages/resume/Resume'
import Dashboard from './pages/dashboard/Dashboard'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path = '/' element={<Home />}/>
          <Route exact path = '/login' element={<Login />}/>
          <Route exact path = '/register' element={<Register/>}/>
          <Route exact path = '/resume/:id' element={<Resume/>}/>
          <Route exact path = '/dashboard' element={<Dashboard/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
