// eslint-disable-next-line no-unused-vars
import React from 'react';
import Navbar from './Navbar';

const TeacherLandingPage = () => {
  return (
    <div>
        <Navbar />
      <div className="bg-primary w-full h-screen flex flex-col justify-center items-center bg-cover" style={{ backgroundImage: `url(images/teacherBg.avif)` }}>
        <div className="text-black text-center">
          <h1 className="text-5xl font-bold mb-4 text-white">Welcome, Teacher!</h1>
          <p className="text-lg text-white">
            Unlock the potential of every student with our powerful education platform.
          </p>
          <button className="bg-secondary text-black px-6 py-2 mt-8 rounded-full hover:bg-secondary-dark">
            Explore Features
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherLandingPage;
