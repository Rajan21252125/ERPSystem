import { useState } from "react";
import Navbar from "./Navbar";
import useGetAllCourse from "../../customHook/useGetAllCourse";
import AddSubject from "./AddSubject";
import DeleteSubject from "./DeleteSubject";

const Course = () => {
  const courses = useGetAllCourse();

  const [deleteCourse, setDeleteCourse] = useState("");

  const [addCourse, setAddCourse] = useState({
    courseName: "",
    year: 4,
  });

  const handleAddCoursetData = (e) => {
    const { name, value } = e.target;
    setAddCourse((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:4000/admin/course/addCourse",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addCourse), // Pass courseName and year separately
        }
      );
      const json = await response.json();
      if (json.success === false) {
        return alert(json.message);
      }
      setAddCourse({
        courseName: "",
        year: 4,
      });
      alert(json.message);
      location.reload()
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };

  const handleDeleteCourse = async (e) => {
    e.preventDefault();
    try {
      console.log(deleteCourse);
      const response = await fetch(
        "http://localhost:4000/admin/course/deleteCourse",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courseName: deleteCourse }),
        }
      );
      const json = await response.json();
      if (json.success === false) {
        setDeleteCourse("");
        return alert(json.message);
      }
      setDeleteCourse("");
      return alert(json.message);
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Add a Subject */}
          <AddSubject />
          <DeleteSubject />
        </div>
      </div>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl font-semibold mb-4">Add New Course</h1>
            <form className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="courseName" className="mb-1">
                  Course Name:
                </label>
                <input
                  type="text"
                  name="courseName"
                  className="px-4 py-2 border border-gray-300 rounded"
                  onChange={handleAddCoursetData}
                  value={addCourse.courseName}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="year" className="mb-1">
                  Year of Course:
                </label>
                <input
                  type="text"
                  name="year"
                  className="px-4 py-2 border border-gray-300 rounded"
                  onChange={handleAddCoursetData}
                  value={addCourse.year}
                />
              </div>
              <button
                type="submit"
                onClick={handleAddCourse}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
          <div>
            <h1 className="text-3xl font-semibold mb-4">Delete Course</h1>
            <form className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="courseName" className="mb-1">
                  Course Name:
                </label>
                <select
                  name="courseName"
                  value={deleteCourse}
                  onChange={(e) => setDeleteCourse(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded"
                >
                  <option value="" disabled>
                    Select a Course Name
                  </option>
                  {courses &&
                    courses.map((course, index) => (
                      <option key={index} value={course}>
                        {course}
                      </option>
                    ))}
                </select>
              </div>
              <button
                type="submit"
                onClick={handleDeleteCourse}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
