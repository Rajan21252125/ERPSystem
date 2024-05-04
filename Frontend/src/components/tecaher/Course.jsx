import { useState } from "react";
import Navbar from "./Navbar";
import useGetAllCourse from "../../customHook/useGetAllCourse";
import AddSubject from "./AddSubject";
import DeleteSubject from "./DeleteSubject";
import { adminUrl } from "../../helper/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        `${adminUrl}course/addCourse`,
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
        return toast.error(json.message);
      }
      setAddCourse({
        courseName: "",
        year: 4,
      });
      toast.success(json.message);
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Add course error:", error);
    }
  };

  const handleDeleteCourse = async (e) => {
    e.preventDefault();
    try {
      console.log(deleteCourse);
      const response = await fetch(
        `${adminUrl}course/deleteCourse`,
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
        return toast.error(json.message);
      }
      setDeleteCourse("");
      toast.success(json.message);
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Delete course error:", error);
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
                Add Course
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
                Delete Course
              </button>
            </form>
          </div>
        </div>
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

export default Course;
