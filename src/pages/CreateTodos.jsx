/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateTodos = () => {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState("false");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveTodo = () => {
    const token = localStorage.getItem("token"); // ✅ Get token
    if (!token) {
      alert("User not authenticated!");
      return;
    }
    const data = {
      title,
      completed
    };
    setLoading(true);
    axios
      .post("https://todo-backend-vjlz.onrender.com/api/todos", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setLoading(false);
        navigate("/home");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happend , please check console");
        console.log(error);
      });
  };
  return (
    <div className="p-4">

      <div className="mb-4">
        <BackButton />
        <h1 className="text-3xl my-4">Create Todo</h1>
      </div>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-x1 mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Completed</label>
          <select
            value={completed}
            onChange={(e) => setCompleted(e.target.value === "true")}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          >
            <option value="false">Not Completed</option>
            <option value="true">Completed</option>
          </select>
        </div>
        {/* <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">User</label>
          <input
            type="number"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="border-2 ☐ border-gray-500 px-4 py-2 w-full"
          />
        </div> */}
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveTodo}>
          Save
        </button>
      </div>
    </div>
  );
};
export default CreateTodos;