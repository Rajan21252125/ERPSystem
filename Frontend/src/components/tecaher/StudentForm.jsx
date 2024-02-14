import { useEffect, useState } from "react";
import AddStudent from "./AddStudent";
import Navbar from "./Navbar";
import EditedData from "./EditedData";
import useGetAllCourse from "../../customHook/useGetAllCourse";
import { adminUrl } from "../../helper/utils";

const StudentForm = () => {
  const [hide, setHide] = useState(true);
  const [editedHide, setEditedHide] = useState(true);
  const [studentData, setStudentData] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudentData, setFilteredStudentData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  // getting all the course name from the backend
  const courses = useGetAllCourse();

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

  // Filter student data based on search query
  useEffect(() => {
    const filteredData = studentData.filter(
      (student) =>
        `${student.firstName} ${student.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) &&
        (selectedCourse === "" ||
          student.enrolledCourseName === selectedCourse) &&
        (selectedYear === "" || student.year === selectedYear)
    );
    setFilteredStudentData(filteredData);
  }, [searchQuery, studentData, selectedCourse, selectedYear]);

  const handleAddStudent = () => {
    setHide(!hide);
    // console.log("clicked")
  };

  const handleDelete = async (id, email) => {
    try {
      const response = await fetch(
        `${adminUrl}student/deleteStudent/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const json = await response.json();
      if (json.success === true) {
        try {
          const emailDelte = await fetch(
            "http://localhost:4000/api/auth/deleteEmail",
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email }),
            }
          );
          const emailJson = await emailDelte.json();
          if (emailJson.success === true) {
            console.log("Successfully");
          } else {
            console.log(emailJson);
          }
        } catch (error) {
          console.log(error);
        }
        alert("Deleted Successfully");
        fetchData();
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
      alert("Error deleting student");
    }
  };

  const handleUpdate = (data) => {
    setSelectedData(data);
    setEditedHide(!editedHide);
    // console.log(data);
  };

  // Handle search query change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle select change for course
  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  // Handle select change for year
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div>
      <Navbar />
      <div className={`relative ${hide ? "hidden" : ""}`}>
        <AddStudent />
      </div>
      <div className={`relative ${editedHide ? "hidden" : ""}`}>
        <EditedData data={selectedData} />
      </div>
      <div className="mx-8 mt-10 space-y-6">
        <div className="flex justify-between items-center border-b-2 pb-6">
          <div className="flex space-x-4">
            <input
              type="text"
              className="border py-2 px-4 rounded w-96"
              placeholder="Search by Name"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <select
              className="text-gray-500 py-2 px-4 w-64 border-2 border-gray-300 rounded"
              name="enrolledCourseName"
              value={selectedCourse}
              onChange={handleCourseChange}
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
              className="text-gray-500 py-2 px-4 w-64 border-2 border-gray-300 rounded"
              name="year"
              value={selectedYear}
              onChange={handleYearChange}
            >
              <option value="">Select Year</option>
              <option value="F.E">First Year</option>
              <option value="S.E">Second Year</option>
              <option value="T.E">Third Year</option>
              <option value="B.E">Fourth Year</option>
            </select>
          </div>
          <div className="flex space-x-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleAddStudent}
            >
              Add New Student
            </button>
          </div>
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
                <th className="py-2 px-4">Year</th>
                <th className="py-2 px-4">Mail-Id</th>
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
                  <td className="text-center py-2 px-4">{data?.year}</td>
                  <td className="text-center py-2 px-4">{data?.email}</td>
                  <td className="text-center py-2 px-4">
                    <button
                      onClick={() => handleUpdate(data)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      UPDATE
                    </button>
                    <button
                      onClick={() => handleDelete(data?._id, data.email)}
                      className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                    >
                      DELETE
                    </button>
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

export default StudentForm;
