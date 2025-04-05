/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditTodo = () => {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  // const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [todoId, setTodoId] = useState("");
  const navigate = useNavigate();
  const { id: paramId } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://todo-backend-vjlz.onrender.com/api/todos/${paramId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        // console.log("Fetched Todo Data:", response.data); 
        setTitle(response.data.title);
        setCompleted(response.data.completed);
        // setUser(response.data.user);
        setLoading(false);
        setTodoId(response.data._id);

      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.status === 401) {
          alert("Session expired. Please log in again.");
          navigate("/login");
        } else {
          alert("An error occurred, please check the console.");
          console.log(error);
        }
      });
  }, [paramId]);


  const handleEditTodo = () => {
    setLoading(true);
    axios
      .put(
        `https://todo-backend-vjlz.onrender.com/api/todos/${paramId}`,
        { title, completed },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        setLoading(false);
        navigate("/home");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error updating todo:", error);
        alert("An error occurred while updating. Check the console.");
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Todo</h1>
      {loading && <Spinner />}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
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
            type="text" 
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div> */}

        <button className="p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-700" onClick={handleEditTodo}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditTodo;
