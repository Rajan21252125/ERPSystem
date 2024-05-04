import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useGetAllMarks = () => {
    const [marks, setMarks] = useState([]);
    const token = localStorage.getItem("token");

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:4000/admin/marks/student`,{
                headers:{
                    Authorization: `Bearer ${token}` 
                },
            });
            const json = await response.json();
            
            if (!json.success) {
                toast.error(json.msg);
            }
            setMarks(json.data);
        } catch (error) {
            console.error('Error:', error);
            setMarks([]);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    console.log(marks)

    return { marks };
}

export default useGetAllMarks;