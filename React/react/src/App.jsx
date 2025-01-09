import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const Login = lazy(() => import('./components/public/login.jsx'));
// const SimpleForm = lazy(()=> import('./components/public/Form.jsx'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path='/' element={<SimpleForm/>}/> */}
      </Routes>
      </Suspense>
    </Router>
  );
}

export default App;


