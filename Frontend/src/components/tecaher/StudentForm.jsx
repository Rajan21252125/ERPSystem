import { useEffect, useState } from "react"
import AddStudent from "./AddStudent"
import Navbar from "./Navbar"

const StudentForm = () => {
    const [hide, setHide] = useState(true);
    const [studentData, setStudentData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:4000/admin/student/getAllData")
            const json = await response.json()
            // console.log(json)
            if (json.success === true) {
                setStudentData(json?.studentData)
                // console.log(studentData)
            } else {
                alert('Error')
            }
        } catch (error) {
            alert("Something went wrong please come back after some time")
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    const handleAddStudent = () => {
        setHide(!hide)
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/admin/student/deleteStudent/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const json = await response.json();

            if (json.success === true) {
                alert('Deleted Successfully');
                fetchData();
            } else {
                throw new Error('Something went wrong!');
            }
        } catch (error) {
            console.log(error);
            alert('Error deleting student');
        }
    };

    const handleUpdate = (data) => {
        console.log(data)
    }



    return (
        <div>
            <Navbar />
            <div className={`relative  ${hide ? 'hidden' : ''}`}>
                <AddStudent />
            </div>
            <div className="mx-40 mt-10 space-y-6">
                <div className="flex justify-between border-b-2 pb-6">
                    <input type="text" className="border" />
                    <select className=" text-gray-500 p-2 border-2 border-gray-300 rounded" name='enrolledCourseName'>
                        <option value="All" disabled>Select a Enrolled Course</option>
                        <option value="CSE">Computer Science</option>
                        <option value="IT">Information Technology</option>
                        <option value="E&TC">Electronic and Telecommunication</option>
                        <option value="MECH">Mechanical</option>
                        <option value="CIVIL">Civil</option>
                    </select>
                    <select className="text-gray-500 p-2 border-2 border-gray-300 rounded" name='semester'>
                        <option value="All" disabled>Select a Semester</option>
                        <option value="I">First Sem</option>
                        <option value="II">Second Sem</option>
                        <option value="III">Third Sem</option>
                        <option value="IV">Fourth Sem</option>
                        <option value="V">Fifth Sem</option>
                        <option value="VI">Sixth Sem</option>
                        <option value="VII">Seventh Sem</option>
                        <option value="VIII">Eight Sem</option>
                    </select>

                    <button>Submit</button>
                    <button onClick={handleAddStudent}>Add New Student</button>
                </div>
                <div>
                    <h2>Total Number of students {studentData.length}</h2>
                    <table className="w-full whitespace-nowrap">
                        <thead>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Year</th>
                            <th>Mail-Id</th>
                            <th>Operations</th>
                        </thead>
                        {studentData.map((data) => {
                            return (
                                <tr key={data._id} className="border-b-2">
                                    <td className="text-center">{data?.firstName + " " + data?.lastName}</td>
                                    <td className="text-center">{data?.enrolledCourseName}</td>
                                    <td className="text-center">{data?.year}</td>
                                    <td className="text-center">{data?.email}</td>
                                    <td className="text-center">
                                        <button onClick={() => handleUpdate(data)}>UPDATE</button>
                                        <button onClick={() => handleDelete(data?._id)}>DELETE</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default StudentForm
