import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import TodoPage from "./pages/TodoPage";
import Signup from "./pages/Signup";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/todos" element={<TodoPage />} />
            </Routes>
        </Router>
    );
};

export default App;
