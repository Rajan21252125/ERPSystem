import { useEffect, useState } from "react";
import useGetLastEmail from "../../customHook/useGetLastEmail";
import useGetAllCourse from "../../customHook/useGetAllCourse";
import { adminUrl } from "../../helper/utils";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddStudent = () => {
  // Custom hooks for fetching last email and course data
  const lastEmail = useGetLastEmail();
  const courses = useGetAllCourse();

  // State for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: lastEmail,
    dateOfBirth: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
    contactNumber: "",
    enrolledCourseName: "",
    semester: "",
    year: "",
  });

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  // Function to handle address changes
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value,
      },
    }));
  };

  // Function to handle form submission
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${adminUrl}student/addStudent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const json = await response.json();
      if (json.success === true) {
        // Automatically generate password from email
        const password = formData.email.split("@")[0];
        // Send email and password to signup API
        const emailResponse = await fetch(
          "http://localhost:4000/api/auth/signup",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              role: "student",
              email: formData.email,
              password: password,
            }),
          }
        );
        const emailJSON = await emailResponse.json();
        if (emailJSON.success === true) {
          console.log("added");
        } else {
          console.log(emailJSON.error);
        }
        toast.success("Added Successfully");
        window.location.reload();
      } else {
        toast.error("Something went wrong!!");
        throw new Error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Please come after some time!!");
      console.log(error);
    }
  };

  // Update formData.email when lastEmail changes
  useEffect(() => {
    if (lastEmail) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        email: lastEmail,
      }));
    }
  }, [lastEmail]);

  return (
    <div className="absolute border border-black w-[50%] bg-white shadow-xl rounded-xl top-10 left-10 px-4 py-2">
      <form onSubmit={handleSubmitForm}>
        <div className="flex justify-between">
          <div className="w-[49%]">
            {/* Input fields for personal information */}
            {/* First Name */}
            <label className="mt-2 text-base font-semibold">
              First Name:
              <input
                type="text"
                name="firstName"
                className="w-full text-gray-500 p-2 border-2 border-gray-300 rounded"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </label>
            {/* Last Name */}
            <label className="mt-2 text-base font-semibold">
              Last Name:
              <input
                type="text"
                name="lastName"
                className="w-full text-gray-500 p-2 border-2 border-gray-300 rounded"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </label>
            {/* Email */}
            <label className="mt-2 text-base font-semibold">
              Email:
              <input
                type="email"
                name="email"
                className="w-full text-gray-500 p-2 border-2 border-gray-300 rounded"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </label>
            {/* Date of Birth */}
            <label className="mt-2 text-base font-semibold">
              Date of Birth:
              <input
                type="date"
                name="dateOfBirth"
                className="w-full text-gray-500 p-2 border-2 border-gray-300 rounded"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
              />
            </label>
            {/* Enrolled Courses */}
            <label className="mt-2 text-base font-semibold">
              Enrolled Courses:
              <select
                name="enrolledCourseName"
                value={formData.enrolledCourseName}
                onChange={handleInputChange}
                className="w-full text-gray-500 p-2 border-2 border-gray-300 rounded"
              >
                <option value="">Select a Course Name</option>
                {courses &&
                  courses.map((course, index) => (
                    <option key={index} value={course}>
                      {course}
                    </option>
                  ))}
              </select>
            </label>
            {/* Semester */}
            <label className="mt-2 text-base font-semibold">
              Semester:
              <select
                className="w-full text-gray-500 p-2 border-2 border-gray-300 rounded"
                name="semester"
                value={formData.semester}
                onChange={handleInputChange}
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
            </label>
          </div>
          <div className="w-[48%]">
            {/* Input fields for address and contact information */}
            {/* Street */}
            <label className="mt-2 text-base font-semibold">
              Street:
              <input
                type="text"
                name="street"
                className="w-full text-gray-500 p-2 border-2 border-gray-300 rounded"
                value={formData.address.street}
                onChange={handleAddressChange}
                required
              />
            </label>
            {/* City */}
            <label className="mt-2 text-base font-semibold">
              City:
              <input
                type="text"
                name="city"
                className="w-full text-gray-500 p-2 border-2 border-gray-300 rounded"
                value={formData.address.city}
                onChange={handleAddressChange}
                required
              />
            </label>
            {/* State */}
            <label className="mt-2 text-base font-semibold">
              State:
              <input
                type="text"
                name="state"
                className="w-full text-gray-500 p-2 border-2 border-gray-300 rounded"
                value={formData.address.state}
                onChange={handleAddressChange}
                required
              />
            </label>
            {/* Zip Code */}
            <label className="mt-2 text-base font-semibold">
              Zip Code:
              <input
                type="text"
                name="zipCode"
                className="w-full text-gray-500 p-2 border-2 border-gray-300 rounded"
                value={formData.address.zipCode}
                onChange={handleAddressChange}
                required
              />
            </label>
            {/* Contact Number */}
            <label className="mt-2 text-base font-semibold">
              Contact Number:
              <input
                type="text"
                name="contactNumber"
                className="w-full text-gray-500 p-2 border-2 border-gray-300 rounded"
                value={formData.contactNumber}
                onChange={handleInputChange}
                required
              />
            </label>
            {/* Year */}
            <label className="mt-2 text-base font-semibold">
              Year:
              <select
                className="w-full text-gray-500 p-2 border-2 border-gray-300 rounded"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select a Year
                </option>
                <option value="F.E">First year</option>
                <option value="S.E">Second year</option>
                <option value="T.E">Third year</option>
                <option value="B.E">Fourth year</option>
              </select>
            </label>
          </div>
        </div>
        {/* Submit Button */}
        <div className="flex justify-center my-8">
          <button
            type="submit"
            className="w-1/3 bg-blue-500 font-semibold text-white p-2 rounded hover:bg-blue-600"
          >
            Add Student
          </button>
          <ToastContainer 
          position="top-center"
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
      </form>
    </div>
  );
};

export default AddStudent;
