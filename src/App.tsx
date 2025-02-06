import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Counter from './components/Counter/Counter';
import UserForm from './components/UserForm/UserForm';
import Dashboard from './pages/Dashboard/Dashboard';
import Editor from './pages/Editor/Editor';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/user-form" element={<UserForm />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </Router>
  );
};

export default App; // <-- This line is crucial