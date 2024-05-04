import { useSelector } from 'react-redux';
import Landing from './Landing';
import Sidebar from './Sidebar';

const Profile = () => {
  // Retrieve profile data from Redux store
  const profileData = useSelector(state => state.user.user);

  return (
    <>
    <Landing />
    <hr />
        <Sidebar />
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-8">
        <h2 className="text-xl text-center font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 font-semibold">First Name:</p>
            <p>{profileData.firstName}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Last Name:</p>
            <p>{profileData.lastName}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Email:</p>
            <p>{profileData.email}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Date of Birth:</p>
            <p>{new Date(profileData.dateOfBirth).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Contact Number:</p>
            <p>{profileData.contactNumber}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Enrolled Course:</p>
            <p>{profileData.enrolledCourseName}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Year:</p>
            <p>{profileData.year}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Semester:</p>
            <p>{profileData.semester}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Address:</p>
            <p>{profileData.address.street}, {profileData.address.city}, {profileData.address.state} - {profileData.address.zipCode}</p>
          </div>
        </div>
      </div>
    </div> 
    </>
  );
};

export default Profile;
