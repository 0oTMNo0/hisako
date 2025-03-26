import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home';
import Login from './login';
import CreateAccount from './createAccount';
import ResetPass from './login/resetPass';
import Success from './success';
import Navbar from '../ui/Navbar';
import Product from './product';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Navbar>
              <Home />
            </Navbar>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="createAccount" element={<CreateAccount />} />
        <Route path="/login/ResetPassword" element={<ResetPass />} />
        <Route path="/success" element={<Success />} />
        <Route
          path="/product/:id/:name"
          element={
            <Navbar>
              <Product />
            </Navbar>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRouter;
