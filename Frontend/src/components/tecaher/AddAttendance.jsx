import { useEffect, useState } from "react";
import axios from "axios";
import useGetAllCourse from "../../customHook/useGetAllCourse";
import useGetAllSubjects from "../../customHook/useGetAllSubjects";
import Navbar from "./Navbar";
import { adminUrl } from "../../helper/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddAttendance = () => {
  const [studentData, setStudentData] = useState([]);
  const [filteredStudentData, setFilteredStudentData] = useState([]);
  const [paramsSubject, setParamsSubject] = useState({
    courseName: "",
    semester: "",
  });
  const [formData, setFormData] = useState({
    studentId: "",
    courseName: "",
    semester: "",
    subject: "",
    type: "",
    isPresent: false, 
  });
  const courses = useGetAllCourse();
  const subjects = useGetAllSubjects(paramsSubject);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "courseName" || name === "semester") {
      setParamsSubject((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    console.log(formData)
    e.preventDefault();
    if (!formData.courseName || !formData.semester || !formData.subject || !formData.type){
      return toast.warn("Please fill the all the required fields")
    }
    try {
      const attendanceRecords = filteredStudentData.map((student) => ({
        studentId: student._id,
        courseName: formData.courseName,
        semester: formData.semester,
        subject: formData.subject,
        type: formData.type,
        isPresent: student.isPresent,
      }));
      await axios.post(`${adminUrl}attendance/add`, attendanceRecords);
      toast.success("Attendance recorded successfully");
      setFormData({
        studentId: "",
        courseName: "",
        semester: "",
        subject: "",
        isPresent: false,
      });
    } catch (error) {
      console.error("Error recording attendance:", error);
      toast.error("Failed to record attendance. Please try again.");
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${adminUrl}student/getAllData`);
      const json = await response.json();
      if (json.success === true) {
        setStudentData(json?.studentData);
      } else {
        toast.error("Error fetching student data");
      }
    } catch (error) {
      toast.error("Failed to fetch student data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = studentData.filter(
      (student) =>
        (formData.courseName === "" ||
          student.enrolledCourseName === formData.courseName) &&
        (formData.semester === "" || student.semester === formData.semester)
    );
    setFilteredStudentData(
      filteredData.map((student) => ({
        ...student,
        isPresent: false,
      }))
    );
  }, [studentData, formData.courseName, formData.semester]);

  useEffect(() => {
    setParamsSubject((prevData) => ({
      ...prevData,
      courseName: formData.courseName,
      semester: formData.semester,
    }));
  }, [formData.courseName, formData.semester]);

  return (
    <div>
      <Navbar />
      <div className="mt-5 mx-14">
        <h2 className="text-center font-semibold text-3xl">Add Attendance</h2>
        <form onSubmit={handleSubmit}>
          <div className="border-b py-4 space-x-8 mt-6">
            <select
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded w-1/3"
            >
              <option value="">Select a Course Name</option>
              {courses &&
                courses.map((course, index) => (
                  <option key={index} value={course}>
                    {course}
                  </option>
                ))}
            </select>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded w-64"
            >
              <option value="">Select a Semester</option>
              <option value="I">First Sem</option>
              <option value="II">Second Sem</option>
              <option value="III">Third Sem</option>
              <option value="IV">Fourth Sem</option>
              <option value="V">Fifth Sem</option>
              <option value="VI">Sixth Sem</option>
              <option value="VII">Seventh Sem</option>
              <option value="VIII">Eight Sem</option>
            </select>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded w-64"
            >
              <option value="">Select a Subject</option>
              {subjects &&
                subjects.map((sub, index) => (
                  <option key={index} value={sub}>
                    {sub}
                  </option>
                ))}
            </select>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded w-64"
            >
              <option value="">Select a Type</option>
              <option value="theory">Theory</option>
              <option value="practical">Practical</option>
            </select>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Total Number of students: {filteredStudentData.length}
            </h2>
            <table className="w-full whitespace-nowrap">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Department</th>
                  <th className="py-2 px-4">Semester</th>
                  <th className="py-2 px-4">Operations</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudentData.map((data) => (
                  <tr key={data._id} className="border-b-2">
                    <td className="text-center py-2 px-4">
                      {data?.firstName + " " + data?.lastName}
                    </td>
                    <td className="text-center py-2 px-4">
                      {data?.enrolledCourseName}
                    </td>
                    <td className="text-center py-2 px-4">{data?.semester}</td>
                    <td className="text-center py-2 px-4">
                      <button
                        className="border-2 border-black px-4 py-1"
                        type="button"
                        onClick={() =>
                          setFilteredStudentData((prevData) =>
                            prevData.map((student) =>
                              student._id === data._id
                                ? { ...student, isPresent: !student.isPresent }
                                : student
                            )
                          )
                        }
                      >
                        {data.isPresent ? "Present" : "Absent"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            type="submit"
            className="bg-green-600 mb-8 hover:bg-green-500 px-4 py-2 rounded-lg font-semibold text-white mt-4"
          >
            Add Attendance
          </button>
        </form>
      </div>
      <ToastContainer
        position="bottom-center"
        theme="colored"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default AddAttendance;
