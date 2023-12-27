/* eslint-disable no-unused-vars */
import React from 'react';
import { FcDepartment } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";
import { RiDeviceRecoverLine } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { AiFillCaretDown } from "react-icons/ai";
import { Link , useLocation } from 'react-router-dom';

function Landing() {
  let location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location='/login'
  }
  return (
    <header className='flex justify-between items-center p-4'>
      <div className="flex space-x-2 items-center">
        <img src="images/logo.jpg" alt="" className='w-10'/>
        <p className='font-semibold text-gray-700'>RPS College</p>
      </div>
      <div className="flex group space-x-2 items-center relative">
        <img src="images/avatar1.jpg" alt="" className='w-10 rounded-full'/> 
        <AiFillCaretDown />
        <div className='hidden z-100 bg-white group-hover:block absolute top-10 right-2 text-base text-gray-800'>
            <div className='h-40 w-56 p-4 border border-black bg-white/60'>
                <p className='font-bold'>Pragya Bnawat (923838)</p>
                <div className='flex items-center space-x-2'><FcDepartment /> <p>BE E&TC - A</p>B</div>
                <div className='flex items-center space-x-2'><CgProfile /><p>SEMESTER-VII(First)</p></div>
                <hr className='bg-gray-400 h-[2px]'/>
                <div className='flex items-center space-x-2'><RiDeviceRecoverLine /><p>Change Password</p></div>
                <div className='flex items-center space-x-2 cursor-pointer'><MdLogout /><p onClick={handleLogout}>Logout</p></div>
            </div>
        </div>
      </div>
    </header>
    
  )
}

export default Landing
