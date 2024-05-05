/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FcDepartment } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";
import { RiDeviceRecoverLine } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { AiFillCaretDown } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useGetData from "../../customHook/useGetData";
import avatar from "../../assets/images/avatar1.jpg";
import logo from "../../assets/images/logo.jpg";
import useGetAllMarks from '../../customHook/useGetAllMarks';

function Landing() {
  // let location = useLocation();
  useGetData();
  const student = useSelector(store => store.user.user)
  // console.log(student)


  const handleChangePassword = () => {
    window.location.href = '/changePass'
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    // localStorage.removeItem('email')
    window.location='/'
  }
  return (
    <header className='flex justify-between items-center p-4'>
      <Link to={"/"}>
      <div className="flex space-x-2 items-center">
        <img src={logo} alt="" className='w-10'/>
        <p className='font-semibold text-gray-700'>RPS College</p>
      </div>
      </Link>
      <div className="flex group space-x-2 items-center relative">
        <img src={avatar} alt="" className='w-10 rounded-full'/> 
        <AiFillCaretDown />
        <div className='hidden z-100 bg-white group-hover:block absolute top-10 right-2 text-base text-gray-800'>
            <div className='h-40 w-56 p-4 border border-black bg-white/60'>
                <p className='font-bold'>{student?.firstName + " " + student?.lastName}</p>
                <div className='flex items-center space-x-2 text-sm'><FcDepartment />{student?.year + " " + student?.enrolledCourseName}</div>
                <div className='flex items-center space-x-2'><CgProfile /><p>SEMESTER-{student?.semester}</p></div>
                <hr className='bg-gray-400 h-[2px]'/>
                <div className='flex items-center space-x-2 cursor-pointer'><RiDeviceRecoverLine /><p onClick={handleChangePassword}>Change Password</p></div>
                <div className='flex items-center space-x-2 cursor-pointer'><MdLogout /><p onClick={handleLogout}>Logout</p></div>
            </div>
        </div>
      </div>
    </header>
    
  )
}

export default Landing
