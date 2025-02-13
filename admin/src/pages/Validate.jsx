import React, { useState, useEffect } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Validate = () => {
  var userId =""
  const location = useLocation();  // Get location object which contains the query params
  const navigate = useNavigate();
  // Use URLSearchParams to extract query parameters from the search string
  const params = new URLSearchParams(location.search);
  const _id = params.get('_id');
  userId=_id



  const [formData, setFormData] = useState({
    userId:userId,
    Name: "",
    email: "",
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
    image: null,
  });

  const [rejectReason, setRejectReason] = useState("");
  const [showRejectBox, setShowRejectBox] = useState(false);

  useEffect(() => {
    const fetchFormData = async () => {
      
      try {
        console.log("before")
        console.log(userId)
        const response = await axios.get(`${backendUrl}/getformdata`, {
          params: { userId },
          validateStatus: (status) => status < 500,
        });

        if (response.status === 200 && response.data) {
          setFormData(response.data);
          console.log(response.data)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFormData(userId);
  }, [userId]);

  const handleAccept = async () => {
    try {
      await axios.post(`${backendUrl}/admin/accept`, { userId });
      alert("Application Accepted");
      navigate("/"); 
      
    } catch (error) {
      console.error("Error accepting application:", error);
    }
  };

  const handleReject = async () => {
    try {
      await axios.post(`${backendUrl}/admin/reject`, { userId, reason: rejectReason });
      alert("Application Rejected");
      setShowRejectBox(false);
      setRejectReason("");
      navigate("/"); 
    } catch (error) {
      console.error("Error rejecting application:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-gray-800 to-gray-950 p-4">
      <div className="bg-white shadow-md p-6 rounded-md max-w-xl w-full">
        <h4 className="text-2xl text-center text-blue-800 mb-6">Application Form</h4>

        {formData.image && (
          <div className="flex justify-center mb-4">
            <img 
              src={formData.image instanceof File ? URL.createObjectURL(formData.image) : formData.image}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-md"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(formData).map(([key, value]) => (
            key !== "image" && (
              <div key={key} className="p-2 bg-gray-100 rounded-md">
                <strong className="text-gray-700">{key}:</strong> {value instanceof File ? value.name : value?.toString()}
              </div>
            )
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button onClick={handleAccept} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            Accept
          </button>
          <button onClick={() => setShowRejectBox(true)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            Reject
          </button>
        </div>

        {showRejectBox && (
          <div className="mt-4 p-4 border border-red-500 rounded-md">
            <textarea
              className="w-full p-2 border rounded-md"
              placeholder="Enter rejection reason..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <div className="flex justify-between mt-2">
              <button onClick={handleReject} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                Submit
              </button>
              <button onClick={() => setShowRejectBox(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Validate;
