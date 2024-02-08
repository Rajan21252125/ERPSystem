/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route , Navigate } from 'react-router-dom';
import Login from './components/Login';
import Index from './components/student/Index';
import Main from './components/tecaher/Main';
import AddStudent from './components/tecaher/AddStudent';
import AddMarks from './components/tecaher/AddMarks';
import AddAttendance from './components/tecaher/AddAttendance';
import store from './store/store';
import { Provider } from 'react-redux';
import StudentForm from './components/tecaher/StudentForm';
import ChangePassword from './components/student/ChangePassword';
import Course from './components/tecaher/Course';

function App() {
  const [role, setRole] = useState('');

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);


  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={role === 'teacher' ? <Navigate to="/admin" /> : <Index />} />
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route path="/admin" element={role === 'student' ? <Navigate to="/" /> : <Main />} />
        <Route path="/admin/Student" element={role === 'student' ? <Navigate to="/" /> : <StudentForm />} />
        <Route path="/addmarks" element={<AddMarks />} />
        <Route path="/admin/course" element={<Course />} />
        <Route path="/addattendance" element={<AddAttendance />} />
        <Route path="/changePass" element={<ChangePassword />} />
      </Routes>
    </Router>
    </Provider>
  )
}

export default App
