import { useEffect, useState } from "react"

const useGetLastEmail = () => {
    const [ lastEmail , setLastEmail ] = useState("")
    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/auth/getLastEmail")
            const json = await response.json()
            if(json.success === true){
                setLastEmail(json.lastUpdatedEmail)
            } else {
                alert("error finding the last email")
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData()
    },[])
    // console.log(lastEmail)
    const mail = lastEmail.split("@")[0]
    let numbers = '';
    for (let i = 0; i < mail.length; i++) {
        const char = mail.charAt(i);
        if (!isNaN(char)) {
            // If the character is a number, append it to the 'numbers' string
            numbers += char;
        }
    }
    const incrementedNumber = String(parseInt(numbers) + 1)
    let res = ""
    if (incrementedNumber < 10){
        res =  `student0${incrementedNumber}@rpscollege.in`
    } else {
        res =  `student${incrementedNumber}@rpscollege.in`
    }
    // console.log(res)
    return res
}


export default useGetLastEmail