import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!token) {
      alert("Unauthorized! Please login.");
      navigate("/");
      return;
    }

    setLoading(true);
    axios.get("https://todo-backend-vjlz.onrender.com/api/todos", {
      headers: {
          Authorization: `Bearer ${token}`,  // Attach the token
      }
  })
      .then((response) => {
        setTodos(response.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
        setTodos([]);
        setLoading(false);
      });
  }, [navigate]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl">Todo List</h1>
        <Link to="/todos/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Title</th>
              <th className="border border-slate-600 rounded-md">Completed</th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {todos.length > 0 ? (
              todos.map((todo, index) => (
                <tr key={todo._id}>
                  <td className="border border-slate-700 text-center">{index + 1}</td>
                  <td className="border border-slate-700 text-center">{todo.title}</td>
                  <td className="border border-slate-700 text-center">{todo.completed ? "✅" : "❌"}</td>
                  <td className="border border-slate-700 text-center">
                    <div className="flex justify-center gap-x-4">
                      <Link to={`/todos/details/${todo._id}`}>
                        <BsInfoCircle className="text-2xl text-green-800" />
                      </Link>
                      <Link to={`/todos/edit/${todo._id}`}>
                        <AiOutlineEdit className="text-2xl text-yellow-600" />
                      </Link>
                      <Link to={`/todos/delete/${todo._id}`}>
                        <MdOutlineDelete className="text-2xl text-red-600" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border border-slate-700 text-center">
                  No todos available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
