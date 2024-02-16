import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useGetAttendance = () => {
    const id = useSelector(state => state.user.user._id);
    const [attendanceData, setAttendanceData] = useState(null);
    
    // Get all attendance records for a specific user
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:4000/admin/attendance/${id}`);
            const json = await response.json();
            
            if (!json.success) {
                throw new Error(json.msg); // Throw an error for failed requests
            }

            console.log("data", json.data);
            setAttendanceData(json.data); // Update state with fetched data
        } catch (error) {
            console.error('Error:', error);
            // Handle errors more gracefully, such as displaying an error message
            setAttendanceData([]); // Set attendance data to an empty array on error
        }
    }

    useEffect(() => {
        fetchData();
    }, [id]); // Include id in the dependency array to re-fetch data when id changes

    return attendanceData; // Return the attendance data so it can be used outside the hook
}

export default useGetAttendance;
