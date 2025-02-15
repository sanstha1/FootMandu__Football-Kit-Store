import  { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const Login = lazy(() => import('./components/public/Login.jsx'));
const Register = lazy(() => import('./components/public/Register.jsx'));
const Dashboard = lazy(() => import('./components/public/Dashboard.jsx'));
const Forgotpassword = lazy(() => import('./components/public/Forgotpassword.jsx'));
const Mainpage = lazy(() => import('./components/public/Mainpage.jsx'));
const Booknow = lazy(() => import('./components/public/Booknow.jsx'));
const Bought = lazy(() => import('./components/public/Bought.jsx'));
const Cart = lazy(() => import('./components/public/Cart.jsx'));
const Addtocart = lazy(() => import('./components/public/Addtocart.jsx'));


function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgotpassword' element={<Forgotpassword />} />
        <Route path='/mainpage' element={<Mainpage />} />
        <Route path='/booknow' element={<Booknow />} />
        <Route path='/bought' element={<Bought />} />
        <Route path='/cart' element={<Cart />} />        
        <Route path='/addtocart' element={<Addtocart />} />        
      </Routes>
      </Suspense>
    </Router>
  );
}

export default App;


