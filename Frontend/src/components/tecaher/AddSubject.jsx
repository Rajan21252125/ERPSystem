import { useState } from "react";
import useGetAllCourse from "../../customHook/useGetAllCourse";

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
    // console.log(toAddSubject);
    try {
      const addSubject = await fetch(
        "http://localhost:4000/admin/course/addSubject",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(toAddSubject),
        }
      );
      const json = await addSubject.json();
      if (json.success === false) {
        alert(json.message);
      } else {
        alert(json.message);
        setToAddSubject({
          courseName: "",
          semester: "",
          subject: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Add Subject to Course</h1>
      <form className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="courseName" className="mb-1">
            Course Name:
          </label>
          <select
            name="courseName"
            value={toAddSubject.courseName}
            onChange={handleInputChange}
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
            value={toAddSubject.semester}
            onChange={handleInputChange}
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
          <label htmlFor="subjectCode" className="mb-1">
            Subject:
          </label>
          <input
            type="text"
            name="subject"
            value={toAddSubject.subject}
            onChange={handleInputChange}
            className="px-4 py-2 border border-gray-300 rounded"
            placeholder="Write the name of the subject to add"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubjectData}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddSubject;
