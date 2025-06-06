import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/login/login.component';
import Home from './components/home/home.component';
import { PrivateRoutes } from './common/private-router';
import ChangePwdComponent from './components/login/changePwd.component';
import Signup from './components/login/signup';


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes/>}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
