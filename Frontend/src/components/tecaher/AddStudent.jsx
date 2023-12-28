/* eslint-disable no-unused-vars */
// StudentForm.jsx
import React, { useState } from 'react';

const StudentForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        dateOfBirth: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: ''
        },
        contactNumber: '',
        enrolledCourses: []
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            address: {
                ...prevData.address,
                [name]: value
            }
        }));
    };

    const handleEnrolledCourseChange = (e) => {
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            enrolledCourses: [...prevData.enrolledCourses, { courseId: value, course: 'Sample Course' }]
        }));
    };

    return (
        <div>
            <h2>Add New Student</h2>
            <form>
                <label>First Name:
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                </label>
                <label>Last Name:
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                </label>
                <label>Email:
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </label>
                <label>Password:
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
                </label>
                <label>Date of Birth:
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required />
                </label>
                <label>Street:
                    <input type="text" name="street" value={formData.address.street} onChange={handleAddressChange} required />
                </label>
                <label>City:
                    <input type="text" name="city" value={formData.address.city} onChange={handleAddressChange} required />
                </label>
                <label>State:
                    <input type="text" name="state" value={formData.address.state} onChange={handleAddressChange} required />
                </label>
                <label>Zip Code:
                    <input type="text" name="zipCode" value={formData.address.zipCode} onChange={handleAddressChange} required />
                </label>
                <label>Contact Number:
                    <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} required />
                </label>
                <label>Enrolled Courses:
                    <select onChange={handleEnrolledCourseChange}>
                        <option value="course1">Course 1</option>
                        <option value="course2">Course 2</option>
                        {/* Add more options based on your available courses */}
                    </select>
                </label>
                <button type="submit">Add Student</button>
            </form>
        </div>
    );
};

export default StudentForm;

