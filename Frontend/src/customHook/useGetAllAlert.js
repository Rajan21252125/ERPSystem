import { useEffect, useState } from "react";
import { adminUrl } from "../helper/utils";

const useGetAllAlert = () => {
    const [alerts, setAlerts] = useState([]);
    // Get all alerts from the server.
    const fetchData = async () => {
        try {
            const response = await fetch(`${adminUrl}alert/`)
            const json = await response.json();
            // console.log(json)
            if (json.success === false ){
               return alert(json?.msg)
            }
            setAlerts(json?.data);
            console.log(alerts)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        fetchData()
    },[])


    return alerts
}


export default useGetAllAlert