import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowTodo = () => {
  const [todo, setTodo] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Unauthorized! Please login.");
      navigate("/");
      return;
    }

    setLoading(true);
    axios
      .get(`https://todo-backend-vjlz.onrender.com/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTodo(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching todo:", error.response?.data || error);
        setLoading(false);
      });
  }, [id, navigate]);

  return (
    <div className="p-4">

      <div className="mb-4">
        <BackButton />
        <h1 className="text-3xl my-4">Todo Details</h1>
      </div>

      <div className="flex justify-center">
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col border-2 border-sky-400 rounded-xl w-full max-w-md p-6 shadow-md bg-white">
            {/* Row */}
            <div className="flex justify-between items-center my-2">
              <span className="text-lg font-semibold text-gray-500">ID:</span>
              <span className="text-lg">{todo._id}</span>
            </div>

            {/* Row */}
            <div className="flex justify-between items-center my-2">
              <span className="text-lg font-semibold text-gray-500">Title:</span>
              <span className="text-lg">{todo.title}</span>
            </div>

            {/* Row */}
            <div className="flex justify-between items-center my-2">
              <span className="text-lg font-semibold text-gray-500">Completed:</span>
              <span className="text-lg">
                {todo.completed ? "✅ Completed" : "❌ Not Completed"}
              </span>
            </div>

            {/* Row */}
            <div className="flex justify-between items-center my-2">
              <span className="text-lg font-semibold text-gray-500">User:</span>
              <span className="text-lg">{todo.user}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowTodo;
