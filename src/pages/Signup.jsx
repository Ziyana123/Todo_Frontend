import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://todo-backend-vjlz.onrender.com/api/auth/login", {
        username,
        password,
      });


      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", username);

      // alert("Login successful!");
      // window.location.reload();
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Invalid username or password!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl mb-4">Login</h2>
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
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Login
      </button>
      <button
        onClick={() => navigate("/register")}
        className="bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Register New User
      </button>
    </div>
  );
};

export default Signup;
