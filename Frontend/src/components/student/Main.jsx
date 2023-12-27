/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import Sidebar from "./Sidebar";
import Heading from "./Heading";
import { FaRegThumbsUp, FaRegBell } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineWarning } from "react-icons/ai";
import Progress from "./Progress";

export default function Main() {
  const name = [
    {
      name: "Success",
      msg: 0,
      icon: <FaRegThumbsUp />,
      color: "bg-purple-800",
    },
    {
      name: "Info",
      msg: 0,
      icon: <BsInfoCircle />,
      color: "bg-blue-400",
    },
    {
      name: "Alerts",
      msg: 0,
      icon: <FaRegBell />,
      color: "bg-red-400",
    },
    {
      name: "Warning",
      msg: 0,
      icon: <AiOutlineWarning />,
      color: "bg-yellow-400",
    },
    {
      name: "Approvals",
      msg: 0,
      icon: <FaRegBell />,
      color: "bg-green-800",
    },
  ];
  const clg = [
    {
      names: "Bussiness Analytics",
      background: "",
    },
    {
      names: "News",
      background: "",
    },
    {
      names: "Videos",
      background: "",
    },
    {
      names: "Gallery",
      background: "",
    },
    {
      names: "Events",
      background: "",
    },
  ];
  const data = [68.42,53.33,10,68.89,64.44,60]
  return (
    <>
      <div className="flex">
        <Sidebar />
        <Heading />
      </div>
      <div className="border-2 border-black m-8 rounded-lg min-h-[70vh]">
        <div className="grid grid-cols-5 m-8 gap-2">
          {name.map((name) => {
            return (
              <div
                className={`border-2 border-black rounded-lg h-12 flex items-center justify-center cursor-pointer ${name.color} text-white`}
                key={name.name}
              >
                <p className="text-white mx-1">{name.icon}</p> 
                <p>{name.name} </p>
                <p className="bg-white text-black px-1 mx-2 rounded-sm mt-1">{name.msg}</p>
              </div>
            );
          })}
          {clg.map((clgs) => {
            return (
              <div
                className={`border-2 border-black rounded-lg h-12 flex items-center justify-center cursor-pointer text-black`}
                key={clgs.names}
              >
                {clgs.names}
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-4 w-[98%] justify-center overflow-hidden">
        <div className="flex flex-col my-10 ml-10 rounded-lg border-2 border-blue-900">
          <p className="bg-[#002752] text-center font-semibold text-white">Subject Syllabus Status</p>
          <Progress data={data}/>
        </div>
        <div className="flex flex-col my-10 ml-10 rounded-lg border-2 border-blue-900">
          <p className="bg-[#002752] text-center font-semibold text-white">Subject Attendance</p>
          <Progress data={data}/>
        </div>
        <div className="flex flex-col my-10 ml-10 rounded-lg border-2 border-blue-900">
          <p className="bg-[#002752] text-center font-semibold text-white">Practical Attended</p>
          <Progress data={data}/>
        </div>
        <div className="flex flex-col my-10 ml-10 rounded-lg border-2 border-blue-900">
          <p className="bg-[#002752] text-center font-semibold text-white">Subject Result Analysis</p>
          <Progress data={data}/>
        </div>
        </div>
        <div className="flex mx-8 my-10 space-x-4">
          <div className="border-2 border-black rounded-md w-[30%] h-60">
            <p className="text-center bg-[#002752] font-semibold text-white">
              Today's Quiz
            </p>
            <h3 className="mx-8 bg-[#E4E4E4] my-12 p-4 text-center rounded-md font-semibold text-xl text-[#737373] shadow-md">
              Today's No Quiz
            </h3>
            <a
              href="/"
              className="w-full text-center block text-blue-500 underline"
            >
              Show previous Result
            </a>
          </div>
          <div className="border-2 border-black rounded-md w-[30%] h-60">
            <p className="text-center bg-[#002752] font-semibold text-white">
              Weekly Survey
            </p>
            <h3 className="mx-8 bg-[#E4E4E4] my-12 p-4 text-center rounded-md font-semibold text-xl text-[#737373] shadow-md">
              Today's No Quiz
            </h3>
            <a
              href="/"
              className="w-full text-center block text-blue-500 underline"
            >
              Show previous Result
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
