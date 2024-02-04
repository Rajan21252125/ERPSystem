import { useSelector } from "react-redux";


function heading() {
  const data = useSelector(state => state.user.user)
  return (
    <div className='ml-4'>
      <div className="w-[87vw] flex justify-center">
        <p> {`${data?.year} ${data?.enrolledCourseName} 2023-2024 (SEMESTER-${data?.semester})`} </p>
      </div>
    </div>
  )
}
export default heading
