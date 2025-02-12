import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const EditForm = ({setToken}) => {
  
  const token = localStorage.getItem("token");
  let userId = "";
  let email = "";
  let name = "";

  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    email = payload.userEmail;
    name = payload.userName;
    userId = payload.userId;
  }

  const [formData, setFormData] = useState({
    Name:name,
  });
console.log("logon",formData)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/getformdata`, {
          params: { userId },
        });
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, type, value, files, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
    }));
  };




  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Uploading... Please wait");
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

    await axios.put(`${backendUrl}/update`, formDataToSend, {
      params: { userId },
    });

    toast.update(loadingToast, {
      render: "✅ Update Successful!",
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });
  } catch (error) {
    console.error("Error updating user data:", error);
  }

  }
  
  

  return (
    <div>
      <Navbar setToken={setToken} />
      <div className="font-sans p-4 sm:p-6 min-h-screen flex justify-center items-center bg-gradient-to-r from-gray-800 to-white-950">
        <form className="w-full max-w-4xl bg-white shadow-md p-6 sm:p-8 rounded-md" onSubmit={handleSubmit} encType="multipart/form-data">
          <h4 className="text-2xl sm:text-3xl text-center text-blue-800 mb-6">Edit User Form</h4>

          <div className="grid sm:grid-cols-2 gap-4">
            <input name="Name" type="text" placeholder="Name" className="input-field" onChange={handleChange} value={formData.Name} />
            <input name="email" type="email" placeholder="Email" className="input-field" value={email} readOnly />
            <input name="mobileNumber" type="text" placeholder="Mobile No." className="input-field" onChange={handleChange} value={formData.mobileNumber} />
            <select name="gender" className="input-field" onChange={handleChange} value={formData.gender}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input name="age" type="text" placeholder="Age" className="input-field" onChange={handleChange} value={formData.age} />
            <select name="role" className="input-field" onChange={handleChange} value={formData.role}>
              <option value="">Select Role</option>
              <option value="Faculty">Faculty</option>
              <option value="Student">Student</option>
            </select>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <input name="institution" type="text" placeholder="Institution" className="input-field" onChange={handleChange} value={formData.institution} />
            <input name="country" type="text" placeholder="Country" className="input-field" onChange={handleChange} value={formData.country} />
            <input name="state" type="text" placeholder="State" className="input-field" onChange={handleChange} value={formData.state} />
            <input name="district" type="text" placeholder="District" className="input-field" onChange={handleChange} value={formData.district} />
            <input name="city" type="text" placeholder="City" className="input-field" onChange={handleChange} value={formData.city} />
            <input name="postalCode" type="text" placeholder="Postal Code" className="input-field" onChange={handleChange} value={formData.postalcode} />
          </div>

          <div className="mt-4">
            <label className="block text-gray-500">Upload Profile Image</label>
            <input type="file" name="image" className="w-full border p-2 rounded-md" onChange={handleChange} />
            {formData.image && (
              <div className="mt-2">
                <img
                  src={typeof formData.image === "string" ? formData.image : URL.createObjectURL(formData.image)}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-md border mt-2"
                />
              </div>
            )}
          </div>

          <div className="mt-4">
            <input name="accommodation" type="checkbox" className="mr-2" onChange={handleChange} checked={formData.accommodation} />
            <label className="text-gray-500">Need Accommodation?</label>
          </div>

          {formData.accommodation && (
            <div className="mt-4">
              <label className="block text-gray-500">Select Hotel</label>
              <select name="hotel" className="input-field" onChange={handleChange} value={formData.hotel}>
                <option value="">Select Hotel</option>
                <option value="Hotel A">Hotel A</option>
                <option value="Hotel B">Hotel B</option>
                <option value="Hotel C">Hotel C</option>
                <option value="Hotel D">Hotel D</option>
              </select>
            </div>
          )}

          <button  type="submit" className="w-full mt-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
