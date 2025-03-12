import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
}

export default AppRouter;
