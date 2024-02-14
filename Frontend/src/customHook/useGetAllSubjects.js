/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { adminUrl } from "../helper/utils";

const useGetAllSubjects = (datas) => {
    // console.log(datas)
    const [data, setData] = useState([])
    const fetchCourseName = async () => {
        try {
            const response = await fetch(`${adminUrl}course/getSubject`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datas)
            });
            const json = await response.json();
            if (json.success === false) {
                // return console.log(json);
            }
            // console.log(json)
            setData(json.data);
            // console.log(data)
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchCourseName()
    }, [datas])
    return data
}

export default useGetAllSubjects
