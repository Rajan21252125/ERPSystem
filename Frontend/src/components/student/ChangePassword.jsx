import { useEffect, useState } from "react";

const ChangePassword = () => {
  const [inputNewPass, setInputNewPass] = useState("");
  const [inputConfrmPass, setInputConfrmPass] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [inputOtp, setInputOtp] = useState("");
  const [ otp,setOtp ] = useState("")

  const email = localStorage.getItem("email");

  const ChangeData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: inputNewPass,
        }),
      });
      const json = await response.json();
      if (json.success === true) {
        alert("Successfully Changed Password");
        window.location = "/";
      } else {
        alert("something went wrong !!");
      }
    } catch (error) {
      console.log(error);
      alert("We will be back shortly !!");
    }
  };

  
  const handleGetOtp = () => {
    // Generate a random 4-digit OTP
    const randomOtp = Math.floor(1000 + Math.random() * 9000);
    setOtp(randomOtp)
  };


  useEffect(() => {
    console.log(otp)
  },[otp])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp === parseInt(inputOtp)) {
      ChangeData();
    } else {
      alert("Invalid OTP");
    }
  };

  const handleConfirmPass = (e) => {
    setInputConfrmPass(e.target.value);
    // Password validation logic
    if (inputNewPass !== e.target.value && e.target.value !== "") {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  return (
    <>
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            readOnly
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="New Password"
            name="new_pass"
            value={inputNewPass}
            onChange={(e) => setInputNewPass(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confrm_pass"
            value={inputConfrmPass}
            onChange={handleConfirmPass}
            required
            className="w-full border p-2 rounded"
          />
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Enter OTP"
              value={inputOtp}
              onChange={(e) => setInputOtp(e.target.value)}
              className="w-full border p-2 rounded"
            />
            <button
              type="button"
              onClick={() => handleGetOtp()}
              className="bg-blue-500 w-32 text-white px-4 py-2 rounded"
            >
              Get-OTP
            </button>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default ChangePassword;
