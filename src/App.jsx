import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages (case-sensitive imports)
import Home from './pages/Home';
import ToolsList from './pages/ToolsList';
import ToolDetail from './pages/ToolDetail';
import AddTool from './pages/AddTool';
import EditTool from './pages/EditTool';
import Login from './pages/Login';

function App() {
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');

  return (
    <Router>
      <Header isAdmin={isAdmin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<ToolsList />} />
        <Route path="/tools/:id" element={<ToolDetail />} />
        <Route
          path="/add"
          element={isAdmin ? <AddTool /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit/:id"
          element={isAdmin ? <EditTool /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
