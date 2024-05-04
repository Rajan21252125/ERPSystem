import { useEffect, useState } from "react"
import { adminUrl } from "../../helper/utils"

const AddAlert = () => {
    const [alert, setAlert] = useState([])

    const fetchAlert = async () => {
        try {
            const alertData = await fetch(`${adminUrl}attendance/`)
            const jsonData = await alertData.json()
            if (jsonData.success) {
                setAlert(jsonData?.data)
            } else {
                console.log(jsonData?.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAlert()
    }, [])

    return (
        <div>

            {alert.map((data) => (
                <div key={data._id} className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4" role="alert">
                    <p className="text-gray-700">{data._id}</p>
                </div>
            ))}
        </div>
    )
}

export default AddAlert
