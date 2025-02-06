import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link to="/counter">Counter</Link>
        <Link to="/user-form">User Form</Link>
        <Link to="/editor">Editor</Link>
      </nav>
    </div>
  );
};

export default Dashboard;