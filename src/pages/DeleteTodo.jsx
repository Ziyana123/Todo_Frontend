/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const DeleteTodo = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteTodo = () => {
    setLoading(true);

    axios
      .delete(`https://todo-backend-vjlz.onrender.com/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` // Ensure token is included
        }
      })
      .then(() => {
        setLoading(false);
        navigate("/home");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console.");
        console.log(error.response ? error.response.data : error);
      });
  };
  return (
    <div className="p-4">

      <div className="mb-4">
        <BackButton />
        <h1 className="text-3xl my-4">Delete Todo</h1>
      </div>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2x1">Are You Sure You want to delete this todo?</h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteTodo}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};
export default DeleteTodo;