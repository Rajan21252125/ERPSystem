import { useEffect, useState } from "react";
import { adminUrl } from "../helper/utils";

const useGetAllCourse = () => {
    const [ data,setData ] = useState([])
    const fetchCourseName = async () => {
        try {
          const response = await fetch(`${adminUrl}course/`);
          const json = await response.json();
          if (json.success === false) {
            console.log("something went wrong");
          }
          setData(json.courseName);
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        fetchCourseName()
      },[])
    return data
}

export default useGetAllCourse
