import { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";



const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const navLinks = [
    {
      id: "/admin/Student",
      title: "Students-Data",
    },
    {
      id: "/admin/course",
      title: "Course-Data",
    },
    {
      id: "/admin/addattendance",
      title: "addAttendance",
    },
    {
      id: "/admin/addmarks",
      title: "addMarks",
    }
  ];
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    window.location='/login'
  }
  

  return (
    <nav className="w-full flex py-6 px-8 justify-between items-center navbar h-16 bg-blue-900">
      {/* Logo */}
      <h1 className="text-3xl text-white flex font-bold"> <img src="./images/logo.jpg" alt="logo" className="w-10 mx-2"/>RPS-Admin</h1>
      
      {/* Desktop Navigation */}
      <ul className="list-none md:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] hover:underline transition ${
              active === nav.title ? "text-white" : "text-white"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => setActive(nav.title)}
          >
            <Link to={`${nav.id}`}>{nav.title}</Link>
          </li>
        ))}
      </ul>
      <button className="mx-4 md:flex hidden text-white" onClick={handleLogout}>Logout</button>

      {/* Mobile Navigation */}
      <div className="md:hidden flex flex-1 justify-end items-center">
        <div className="w-[28px] h-[28px] object-contain" onClick={() => setToggle(!toggle)}>
           {toggle ? <IoClose /> : <CiMenuFries />}
        </div>

        {/* Sidebar */}
        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col bg-black/[0.4] px-2 py-4 rounded-md">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-semibold cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-white"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
                <hr />
              </li>
            ))}
            <hr />
            <li className="my-3 font-poppins font-semibold  text-[16px] text-white" onClick={handleLogout}>logOut</li>
            <hr />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;