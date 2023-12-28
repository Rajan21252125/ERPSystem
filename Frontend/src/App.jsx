/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route , Navigate } from 'react-router-dom';
import Login from './components/Login';
import Index from './components/student/Index';
import Main from './components/tecaher/Main';
import AddStudent from './components/tecaher/AddStudent';
import RemoveStudents from './components/tecaher/RemoveStudents';
import AddMarks from './components/tecaher/AddMarks';
import AddAttendance from './components/tecaher/AddAttendance';

function App() {
  const [role, setRole] = useState('');

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={role === 'teacher' ? <Navigate to="/admin" /> : <Index />} />
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route path="/admin" element={<Main />} />
        <Route path="/addstudent" element={<AddStudent />} />
        <Route path="/addmarks" element={<AddMarks />} />
        <Route path="/removestudents" element={<RemoveStudents />} />
        <Route path="/addattendance" element={<AddAttendance />} />
      </Routes>
    </Router>
  )
}

export default App
