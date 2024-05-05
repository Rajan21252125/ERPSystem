import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useGellPercentAttendance from "./useGellPercentAttendance";
import { adminUrl } from "../helper/utils";

const useGetAttendance = () => {
    const token = localStorage.getItem("token");
    const [attendanceData, setAttendanceData] = useState(null);
    
    // Get all attendance records for a specific user
    const fetchData = async () => {
        try {
            const response = await fetch(`${adminUrl}attendance/attendance`,{
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
