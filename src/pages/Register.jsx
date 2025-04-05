import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await axios.post("https://todo-backend-vjlz.onrender.com/api/register", {
                username,
                password,
            });
            alert("Registration successful! Please login.");
            navigate("/");
        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    alert("User already exists. Please choose a different one.");
                } else {
                    alert(`Registration failed: ${error.response.data.message || "Unknown error"}`);
                }
            } else {
                alert("Registration failed. Please try again.");
            }
            console.error("Registration error:", error.response?.data || error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-3xl mb-4">Register New User</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2 mb-2 w-64"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 mb-4 w-64"
            />
            <button
                onClick={handleRegister}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
                Register
            </button>
        </div>
    );
};

export default Register;
