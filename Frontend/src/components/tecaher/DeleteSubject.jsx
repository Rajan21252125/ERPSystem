import { useState } from "react";
import useGetAllSubjects from "../../customHook/useGetAllSubjects";
import useGetAllCourse from "../../customHook/useGetAllCourse";
import { adminUrl } from "../../helper/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteSubject = () => {
  const courses = useGetAllCourse();
  const [paramsSubject, setParamsSubject] = useState({
    courseName: "",
    semester: "",
  });
  const subjects = useGetAllSubjects(paramsSubject);

  const [toDeleteSubject, setToDeleteSubject] = useState({
    courseName: "",
    semester: "",
    subject: "",
  });

  const handleDeleteSubjectChange = (e) => {
    const { name, value } = e.target;
    if (name === "courseName" || name === "semester") {
      setParamsSubject((prevData) => ({ ...prevData, [name]: value }));
    }
    setToDeleteSubject((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeleteSubjectData = async (e) => {
    e.preventDefault();
    if (!toDeleteSubject.courseName || !toDeleteSubject.semester || !toDeleteSubject.subject){
      return toast.warn("Please fill all required fields")
    }
    try {
      const response = await fetch(`${adminUrl}course/deleteSubject`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(toDeleteSubject),
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message || "Failed to delete subject");
      }
      setToDeleteSubject({ courseName: "", semester: "", subject: "" });
      toast.success(json.message);
    } catch (error) {
      console.error("Delete subject error:", error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Delete Subject from Course</h1>
      <form className="space-y-4" onSubmit={handleDeleteSubjectData}>
        <div className="flex flex-col">
          <label htmlFor="courseName" className="mb-1">
            Course Name:
          </label>
          <select
            name="courseName"
            value={toDeleteSubject.courseName}
            onChange={handleDeleteSubjectChange}
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
        <div className="flex flex-col">
          <label htmlFor="semester" className="mb-1">
            Semester:
          </label>
          <select
            name="semester"
            value={toDeleteSubject.semester}
            onChange={handleDeleteSubjectChange}
            className="px-4 py-2 border border-gray-300 rounded"
          >
            <option value="" disabled>
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
        </div>
        <div className="flex flex-col">
          <label htmlFor="subject" className="mb-1">
            Subject:
          </label>
          <select
            name="subject"
            value={toDeleteSubject.subject}
            onChange={handleDeleteSubjectChange}
            className="px-4 py-2 border border-gray-300 rounded"
          >
            <option value="" disabled>
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
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
        >
          Delete Subject
        </button>
      </form>
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

export default DeleteSubject;
