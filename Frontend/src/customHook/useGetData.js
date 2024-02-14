/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { getUserData } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { adminUrl } from "../helper/utils";

const useGetData = (email) => {
    // console.log(email)
    const dispatch = useDispatch()
    const fetchData = async() => {
        try {
            const response = await fetch(`${adminUrl}student/showStudent`, {
                method: "POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email : email})
            })
            const json = await response.json()
            // console.log(json)
            dispatch(getUserData(json))
        } catch (error) {
            // console.log(error)
        }
    }


    useEffect(() => {
        fetchData();
    },[])
}


export default useGetData;