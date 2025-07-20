import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {
  const email = localStorage.getItem("userEmail"); // assuming you store it on login
type FormData = {
  username: string;
  email: string;
  password: string;
  phone: string;
  age: string;
  gender: string;
  [key: string]: string; // 👈 Add this line
};

const [formData, setFormData] = useState<FormData>({
  username: "",
  email: "",
  password: "",
  phone: "",
  age: "",
  gender: ""
});
const userId = localStorage.getItem('userId'); 
  // Fetch data on mount
  useEffect(() => {
      if (userId) {
      axios.get(`http://localhost:5000/api/users/${userId}`)
        .then(res => {
          setFormData(res.data);
        })
        .catch(err => {
          console.error('Error fetching user data', err);
        });
    }
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSave = () => {
    axios.put(`http://localhost:5000/api/users/${userId}`, formData)
      .then(res => {
        alert("Profile updated successfully!");
        setFormData(res.data); 
      })
      .catch(err => {
        console.error("Error updating profile", err);
      });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-200 to-emerald-300 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-purple-600 mb-6 text-center">User Profile</h2>

        <div className="space-y-4">
  {["username", "email","password", "phone", "age", "gender"].map((field) => (
    <div key={field}>
      <label className="block text-sm font-semibold capitalize">{field}</label>
      <input
        type={field === "age" ? "number" : "text"}
        name={field}
        value={formData[field]} 
        onChange={handleChange}
        className="mt-1 w-full px-4 py-2 border rounded"
      />
    </div>
  ))}
</div>

<div className="mt-6 flex justify-end">
  <button
    onClick={handleSave}
    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
  >
    Save
  </button>
</div>

        </div>
      </div>
  
  );
};

export default UserProfile;
