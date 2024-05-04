/* eslint-disable react/prop-types */
import { MdOutlineCancel } from "react-icons/md";
import useGetAllAlert from "../../customHook/useGetAllAlert";


const Alerts = ({ setShowAlerts }) => {
    const alerts = useGetAllAlert();
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="bg-gray-300 p-8 rounded-lg shadow-xl relative">
        <div onClick={() => setShowAlerts(false)} className="absolute top-3 right-3 cursor-pointer"><MdOutlineCancel className="text-base"/></div>
        {alerts.map((alert) => (
          <div key={alert._id} className="bg-white p-4 my-2 rounded-lg shadow-md">
            <p className="text-gray-600">{alert.message}</p>
          </div>
        ))}
        </div>
    </div>
  );
};

export default Alerts;
