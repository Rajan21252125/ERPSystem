/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { getUserData } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { adminUrl } from "../helper/utils";

const useGetData = () => {
    const id = localStorage.getItem("token");
    const dispatch = useDispatch();

    const fetchData = async () => {
        try {
            const response = await fetch(`${adminUrl}student/profile`, {
                method: "GET",
                headers:{
                    Authorization: `Bearer ${id}` 
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch user data");
            }
            const json = await response.json();
            dispatch(getUserData(json.data));
        } catch (error) {
            console.log(error)
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);
};

export default useGetData;
