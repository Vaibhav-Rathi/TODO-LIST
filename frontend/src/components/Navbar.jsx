import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import {useNavigate} from "react-router-dom"

const Navbar = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3001/user/logout", 
                {}, 
                { withCredentials: true }
            );
            setMessage(response.data.message);
            navigate("/");
            
        } catch (error) {
            setMessage("Failed to log out. Please try again.");
        }
    };
    return (
        <nav className="bg-[#FF5845] text-white px-4 py-3">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Todo App</h1>
                <ul className="flex gap-4">
                    <li>
                        <Link to="/" className="hover:underline">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/todos" className="hover:underline">
                            Todos
                        </Link>
                    </li>
                    <li>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-lg"
                    >
                        Logout
                    </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
