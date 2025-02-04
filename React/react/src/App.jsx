import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const Login = lazy(() => import('./components/public/Login.jsx'));
const Register = lazy(() => import('./components/public/Register.jsx'));
const Dashboard = lazy(() => import('./components/public/Dashboard.jsx'));
const Forgotpassword = lazy(() => import('./components/public/Forgotpassword.jsx'));
const Mainpage = lazy(() => import('./components/public/Mainpage.jsx'));


function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        {/* <Route path='/' element={<Register />} /> */}
        {/* <Route path='/' element={<Dashboard />} /> */}
        {/* <Route path='/' element={<Forgotpassword />} /> */}
        <Route path='/' element={<Mainpage />} />
      </Routes>
      </Suspense>
    </Router>
  );
}

export default App;


