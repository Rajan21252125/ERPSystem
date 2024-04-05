import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useGellPercentAttendance from "./useGellPercentAttendance";

const useGetAttendance = () => {
    const token = localStorage.getItem("token");
    const [attendanceData, setAttendanceData] = useState(null);
    
    // Get all attendance records for a specific user
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:4000/admin/attendance/attendance`,{
                headers:{
                    Authorization: `Bearer ${token}` 
                },
            });
            const json = await response.json();
            
            if (!json.success) {
                toast.error(json.msg);
            }
            setAttendanceData(json.data);
        } catch (error) {
            console.error('Error:', error);
            setAttendanceData([]);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const data = useGellPercentAttendance(attendanceData);
    return data
}

export default useGetAttendance;
