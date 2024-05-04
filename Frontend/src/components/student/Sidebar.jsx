/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { GiHamburgerMenu, GiReceiveMoney } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";
import { VscTriangleDown } from "react-icons/vsc";
import { ImCross } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { AiOutlineBook, AiOutlineFileAdd } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Sidebar() {
    const [close, setClose] = useState(true);
    const toggleClose = () => {
        setClose(!close);
        console.log(close);
    };
    const links = [
        {
            name: 'Attendance',
            icon: <AiOutlineBook />,
            link: '/attendance'
        },
        // {
        //     name: 'Fees',
        //     icon: <GiReceiveMoney />,
        //     link: '/fees'
        // },
        {
            name: "Profile",
            icon: <CgProfile />,
            link: '/profile'
        },
        {
            name: "E-Learning",
            icon: <AiOutlineFileAdd />,
            link: '/e-library'
        }
    ];
    
    return (
        <div>
            <div className="mx-4 mt-2 transition duration-300 flex items-center justify-between">
                {close?<GiHamburgerMenu className="cursor-pointer" onClick={toggleClose}/>:<ImCross className="cursor-pointer" onClick={toggleClose}/>}
            </div>
            <div
                className={`p-3 bg-slate-400 absolute w-52 mt-4 h-[84vh] transition ease-in-out duration-700 ${close ? "-translate-x-[120%]" : "translate-x-0"
                    }`}
            >
                <div className="flex items-center space-x-2">
                    <IoIosPeople className="text-lg" />
                    <h1 className="text-lg font-semibold">Student Module</h1>
                </div>
                <ul className="space-y-3 my-4">
                    { links.map((link) => {
                        return <li key={ link.name } className="list-none">
                            <Link to={link.link} className="flex items-center justify-between hover:shadow-lg px-1 py-2">
                                <div className="flex items-center">{link.icon} {link.name}</div> <VscTriangleDown />
                            </Link>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    );
}
