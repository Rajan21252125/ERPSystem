import { useState } from "react";
import useGetAllCourse from "../../customHook/useGetAllCourse";
import { adminUrl } from "../../helper/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddSubject = () => {
  const courses = useGetAllCourse();
  const [toAddSubject, setToAddSubject] = useState({
    courseName: "",
    semester: "",
    subject: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setToAddSubject((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubjectData = async (e) => {
    e.preventDefault();
    // Basic form validation
    if (!toAddSubject.courseName || !toAddSubject.semester || !toAddSubject.subject) {
      return toast.warn("Please fill all required fields");
    }

    try {
      const addSubject = await fetch(`${adminUrl}course/addSubject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(toAddSubject),
      });
      const json = await addSubject.json();
      if (json.success === false) {
        toast.error(json.message);
      } else {
        toast.success(json.message);
        setToAddSubject({
          courseName: "",
          semester: "",
          subject: "",
        });
      }
    } catch (error) {
      console.error('Error adding subject:', error);
      toast.error("An error occurred while adding the subject");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Add Subject to Course</h1>
      <form className="space-y-4" onSubmit={handleSubjectData}>
        {/* Course Name */}
        <div className="flex flex-col">
          <label htmlFor="courseName" className="mb-1">Course Name:</label>
          <select
            name="courseName"
            value={toAddSubject.courseName}
            onChange={handleInputChange}
            className="px-4 py-2 border border-gray-300 rounded"
          >
            <option value="" disabled>Select a Course Name</option>
            {courses && courses.map((course, index) => (
              <option key={index} value={course}>{course}</option>
            ))}
          </select>
        </div>
        {/* Semester */}
        <div className="flex flex-col">
          <label htmlFor="semester" className="mb-1">Semester:</label>
          <select
            name="semester"
            value={toAddSubject.semester}
            onChange={handleInputChange}
            className="px-4 py-2 border border-gray-300 rounded"
          >
            <option value="" disabled>Select a Semester</option>
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
        {/* Subject */}
        <div className="flex flex-col">
          <label htmlFor="subject" className="mb-1">Subject:</label>
          <input
            type="text"
            name="subject"
            value={toAddSubject.subject}
            onChange={handleInputChange}
            className="px-4 py-2 border border-gray-300 rounded"
            placeholder="Write the name of the subject to add"
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Subject
        </button>
      </form>
      {/* Toast Container */}
      <ToastContainer
        position="bottom-center"
        theme="colored"
        autoClose={5000}
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

export default AddSubject;
