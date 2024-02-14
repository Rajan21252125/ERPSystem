import { useEffect, useState } from "react";
import axios from "axios";
import useGetAllCourse from "../../customHook/useGetAllCourse";
import useGetAllSubjects  from "../../customHook/useGetAllSubjects";
import Navbar from "./Navbar";
import { adminUrl } from "../../helper/utils";

const AddAttendance = () => {

  const [studentData, setStudentData] = useState([]);
  const [filteredStudentData, setFilteredStudentData] = useState([]);


  // declaring a variable for getting the subject data from the backend
  const [paramsSubject, setParamsSubject] = useState({
    courseName: "",
    semester: ""
  });
  
  // setting a formdata with all the values on which it should fetch data of student
  const [formData, setFormData] = useState({
    studentId: "",
    courseName: "",
    semester: "",
    subject: "",
    isPresent: false,
  });
  

  // getting all the course name from the backend
  const courses = useGetAllCourse();


  // getting all the subject based on the courseName and semester from backend
  const subjects = useGetAllSubjects(paramsSubject);


  // on change of the input it should handle the data by setting in the variable
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "courseName" || name === "semester") {
      setParamsSubject((prevData) => ({ ...prevData, [name]: value }));
    }
  };


  // by submiting it should handle the data and fetching the data as per data  given in the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const attendanceRecords = filteredStudentData.map((student) => ({
        studentId: student._id,
        courseName: formData.courseName,
        semester: formData.semester,
        subject: formData.subject,
        isPresent: student.isPresent
      }));
      // console.log(attendanceRecords)
      await axios.post(`${adminUrl}attendance/add`, attendanceRecords );
      alert("Attendance recorded successfully");
      // Clear the form after successful submission
      setFormData({
        studentId: "",
        courseName: "",
        semester: "",
        subject: "",
        isPresent: false,
      });
    } catch (error) {
      console.log(error)
      console.error("Error recording attendance:", error);
      alert("Failed to record attendance. Please try again.");
    }
  };


  const fetchData = async () => {
    try {
      const response = await fetch(
        `${adminUrl}student/getAllData`
      );
      const json = await response.json();
      if (json.success === true) {
        setStudentData(json?.studentData);
      } else {
        alert("Error");
      }
    } catch (error) {
      alert("Something went wrong, please come back after some time");
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
    setFilteredStudentData(filteredData.map((student) => ({
      ...student,
      isPresent: false // Initialize isPresent status for each student as false
    })));
  }, [studentData, formData.courseName, formData.semester]);


  // getting subject whenever there is the change in semester or course Name
  useEffect(()=> {
    setParamsSubject((prevData) => ({ ...prevData, courseName: formData.courseName , semester : formData.semester }))
  },[formData.courseName,formData.semester])
  

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
            className="px-4 py-2 border border-gray-300 rounded w-2/4"
          >
            <option value="" >
              Select a Course Name
            </option>
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
            <option value="" >
              Select a Semester
            </option>
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
            <option value="" >
              Select a Subject
            </option>
            {subjects &&
              subjects.map((sub, index) => (
                <option key={index} value={sub}>
                  {sub}
                </option>
              ))}
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
                  <td className="text-center py-2 px-4">
                    {data?.semester}
                  </td>
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
        <button type="submit" className="bg-green-600 mb-8 hover:bg-green-500 px-4 py-2 rounded-lg font-semibold text-white mt-4">Add Attendance</button>
      </form>
    </div>
    </div>
  );
};

export default AddAttendance;
