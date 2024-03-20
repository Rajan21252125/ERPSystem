import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "./Navbar";
import useGetAllCourse from '../../customHook/useGetAllCourse';
import useGetAllSubjects from '../../customHook/useGetAllSubjects';
import { adminUrl } from '../../helper/utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddMarks = () => {
  const [studentData, setStudentData] = useState([]);
  const [filteredStudentData, setFilteredStudentData] = useState([]);
  const [formData, setFormData] = useState({
    courseName: '',
    semester: '',
    subject: '',
    selectedExam: '',
  });
  const [paramsSubject, setParamsSubject] = useState({
    courseName: "",
    semester: ""
  });
  const courses = useGetAllCourse();
  const subjects = useGetAllSubjects(paramsSubject);

  const handleChange = (e, studentId) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFilteredStudentData((prevData) =>
      prevData.map((student) =>
        student._id === studentId ? { ...student, [name]: value } : student
      )
    );
    if (name === "courseName" || name === "semester") {
      setParamsSubject((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.courseName || !formData.semester || !formData.subject || !formData.selectedExam){
      return toast.warn("Please fill all required fields");
    }
    try {
      const marksData = filteredStudentData.map((student) => ({
        studentId: student._id,
        courseName: formData.courseName,
        semester: formData.semester,
        subject: formData.subject,
        marksObtained: student.marksObtained,
        selectedExam: formData.selectedExam,
      }));
      const response = await axios.post(
        `${adminUrl}marks/addMarks`,
        marksData
      );
      if (response.data.success === false) {
        toast.error(response.data.message);
        return;
      }
      toast.success("Marks added successfully");
      setFormData({
        courseName: "",
        semester: "",
        subject: "",
        selectedExam: "",
      });
      setFilteredStudentData((prevData) =>
        prevData.map((student) => ({ ...student, marksObtained: "" }))
      );
    } catch (error) {
      console.error("Error adding marks:", error);
      toast.error("Failed to add marks. Please try again.");
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
        (formData.courseName === "" || student.enrolledCourseName === formData.courseName) &&
        (formData.semester === "" || student.semester === formData.semester)
    );
    setFilteredStudentData(filteredData.map((student) => ({
      ...student,
      marksObtained: ""
    })));
  }, [studentData, formData.courseName, formData.semester]);

  useEffect(() => {
    setParamsSubject((prevData) => ({ ...prevData, courseName: formData.courseName, semester: formData.semester }));
  }, [formData.courseName, formData.semester]);

  return (
    <div>
      <Navbar />
      <div className='mx-10 mt-6'>
        <h2 className="text-3xl text-center font-semibold mb-4">Add Marks</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <select
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded w-1/2"
            >
              <option value="">Select a Course</option>
              {courses.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded w-1/2"
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
          </div>
          <div className='flex space-x-4'>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded w-1/2"
            >
              <option value="">Select a Subject</option>
              {subjects && subjects.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            <select
              name="selectedExam"
              value={formData.selectedExam}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded w-1/2"
            >
              <option value="">Select an Exam</option>
              <option value="ISE1">ISE1</option>
              <option value="ISE2">ISE2</option>
              <option value="semesterExam">End Semester Exam</option>
            </select>
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Add Marks
          </button>
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
        </form>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Total Number of students: {filteredStudentData.length}</h2>
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Department</th>
                <th className="py-2 px-4">Semester</th>
                <th className="py-2 px-4">Marks Obtained</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudentData.map((data) => (
                <tr key={data._id} className="border-b-2">
                  <td className="text-center py-2 px-4">{data?.firstName + ' ' + data?.lastName}</td>
                  <td className="text-center py-2 px-4">{data?.enrolledCourseName}</td>
                  <td className="text-center py-2 px-4">{data?.semester}</td>
                  <td className="text-center py-2 px-4">
                    <input
                      type="text"
                      name='marksObtained'
                      value={data.marksObtained}
                      onChange={(e) => handleChange(e, data._id)}
                      className="px-4 py-2 border border-gray-300 rounded w-full"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddMarks;
