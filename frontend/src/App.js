import './App.css';
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path = '/' element={<Home />}/>
          <Route exact path = '/login' element={<Login />}/>
          <Route exact path = '/register' element={<Register/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
