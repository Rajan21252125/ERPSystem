import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { adminUrl } from "../helper/utils";

const useGetAllMarks = () => {
    const [marks, setMarks] = useState([]);
    const token = localStorage.getItem("token");

    const fetchData = async () => {
        try {
            const response = await fetch(`${adminUrl}marks/student`,{
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