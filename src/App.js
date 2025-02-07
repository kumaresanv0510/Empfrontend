import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import EmployeeForm from "./components/EmployeeForm";
import './App.css';
 


function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));

    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route path="/dashboard" element={token ? <Dashboard token={token} /> : <Navigate to="/login" />} />
                <Route path="/employee-form" element={token ? <EmployeeForm token={token} /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to="/signup" />} />
            </Routes>
        </Router>
    );
}

export default App;
