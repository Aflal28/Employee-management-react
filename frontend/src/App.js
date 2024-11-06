// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import AddEmployee from './pages/AddEmployee';
import EditEmployee from './pages/Edit Employee';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/edit-employee/:empNo" element={<EditEmployee />} />
      </Routes>
    </Router>
  );
};

export default App;
