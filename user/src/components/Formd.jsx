import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
const Formd = () => {
  const token = localStorage.getItem("token");  
  var userId = '';
  var Email = '';
  var Name = '';
  var registerStatus = false;

  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    Email = payload.userEmail;
    userId = payload.userId;
    Name=payload.userName;
    registerStatus = payload.registerStatus;
  }

  const [registration, setRegistration] = useState(registerStatus);
  const [formData, setFormData] = useState({
    userId: userId,
    Name: Name,
    email: Email,
    mobileNumber: "",
    age: "",
    gender: "",
    institution: "",
    role: "",
    country: "",
    state: "",
    district: "",
    city: "",
    postalCode: "",
    accommodation: false,
    hotel: "",
  });

  const [Data, setData] = useState(null);

  useEffect(() => {
    if (registration) {
      fetchFormData(); // Renamed function
    }
  }, [registration]);

  const fetchFormData = async () => { // Renamed function
    try {
      let response = await axios.get(`${backendUrl}/getformdata`, {
        params: { userId },
        validateStatus: (status) => status < 500,
      });
      
      setData(response.data);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
    }));
  };

  const RegisterForm = async () => {
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
       const loadingToast = toast.loading("Loading... Please wait");
      let response = await axios.post(`${backendUrl}/register`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
        validateStatus: (status) => status < 500,
      });

      if (response.status === 200) {
         toast.update(loadingToast, {
              render: response.data.message,
              type: "success",
              isLoading: false,
              autoClose: 3000,
            });
        setData(response.data);
        setRegistration(true);
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      alert("Error occurred. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Application Form", 20, 20);
    const displayData = Data || formData;
    Object.entries(displayData).forEach(([key, value], index) => {
      if (key !== "image") {
        doc.text(`${key}: ${value}`, 20, 30 + index * 10);
      }
    });
    doc.save("application.pdf");
  };

  if (registration) {
    const displayData = Data || formData;

    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-gray-800 to-white-950 p-4">
        <div className="bg-white shadow-md p-6 rounded-md max-w-lg w-full">
          <h4 className="text-2xl text-center text-blue-800 mb-6">Application Form</h4>
          <div className="grid gap-4">
          {displayData?.image && (
  <div className="mt-2">
    <img 
      src={displayData.image instanceof File ? URL.createObjectURL(displayData.image) : displayData.image}
      alt="Profile"
      className="w-32 h-32 object-cover rounded-md mt-2"
    />
  </div>
)}

{Object.entries(displayData || {}).map(([key, value]) => (
  key !== "image" && (
    <div key={key} className="p-2">
      <strong>{key}:</strong> {value instanceof File ? value.name : value.toString()}
    </div>
  )
))}

          </div>
          <button onClick={handleDownloadPDF} className="mt-6 py-2 w-full bg-green-500 hover:bg-green-600 text-white rounded-md">
            Download PDF
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans p-4 sm:p-6 min-h-screen flex justify-center items-center bg-gradient-to-r from-gray-800 to-white-950">
      <form className="w-full max-w-4xl bg-white shadow-md p-6 sm:p-8 rounded-md" onSubmit={handleSubmit}>
        <h4 className="text-2xl sm:text-3xl text-center text-blue-800 mb-6">Registration Form</h4>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <input name="Name" type="text" placeholder="Name" className="input-field" onChange={handleChange} value={formData.Name} />
          <input name="email" type="email" placeholder="Email" className="input-field" value={formData.email} readOnly />
          <input name="mobileNumber" type="text" placeholder="Mobile No." className="input-field" onChange={handleChange} />
          <select name="gender" className="input-field" onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input name="age" type="text" placeholder="age" className="input-field" onChange={handleChange} />
          <select name="role" className="input-field" onChange={handleChange}>
            <option value="">Select Role</option>
            <option value="Faculty">Faculty</option>
            <option value="Student">Student</option>
          </select>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <input name="institution" type="text" placeholder="Institution" className="input-field" onChange={handleChange} />
          <input name="country" type="text" placeholder="Country" className="input-field" onChange={handleChange} />
          <input name="state" type="text" placeholder="State" className="input-field" onChange={handleChange} />
          <input name="district" type="text" placeholder="District" className="input-field" onChange={handleChange} />
          <input name="city" type="text" placeholder="City" className="input-field" onChange={handleChange} />
          <input name="postalCode" type="text" placeholder="Postal Code" className="input-field" onChange={handleChange} />
        </div>

        <div className="mt-4">
          <label className="block text-gray-500">Upload Profile Image</label>
          <input type="file" name="image" className="w-full border p-2 rounded-md" onChange={handleChange} />
          {formData.image && (
            <div className="mt-2">
              <img 
                src={URL.createObjectURL(formData.image)}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-md border mt-2"
              />
            </div>
          )}
        </div>

        <div className="mt-4">
          <input name="accommodation" type="checkbox" className="mr-2" onChange={handleChange} />
          <label className="text-gray-500">Need Accommodation?</label>
        </div>

        {formData.accommodation && (
          <div className="mt-4">
            <label className="block text-gray-500">Select Hotel</label>
            <select name="hotel" className="input-field" onChange={handleChange}>
              <option value="">Select Hotel</option>
              <option value="Hotel A">Hotel A</option>
              <option value="Hotel B">Hotel B</option>
              <option value="Hotel C">Hotel C</option>
              <option value="Hotel D">Hotel D</option>
            </select>
          </div>
        )}

        <button onClick={RegisterForm} type="button" className="w-full mt-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
          Register
        </button>
      </form>
    </div>
  );
};

export default Formd;