
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CreateTodos from "./pages/CreateTodos";
import ShowTodo from "./pages/ShowTodo";
import EditTodo from "./pages/EditTodo";
import DeleteTodo from "./pages/DeleteTodo";
import Signup from "./pages/Signup";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/todos/create" element={<CreateTodos />} />
        <Route path="/todos/details/:id" element={<ShowTodo />} />
        <Route path="/todos/edit/:id" element={<EditTodo />} />
        <Route path="/todos/delete/:id" element={<DeleteTodo />} />
      </Routes>
    </Router>
  );
}

export default App;