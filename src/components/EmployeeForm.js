import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createEmployee, updateEmployee, getEmployeeById } from "../services/api";
import "../styles/EmployeeForm.css"; // Import the CSS file

const EmployeeForm = ({ token }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");
    const [salary, setSalary] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const employeeId = new URLSearchParams(location.search).get("id");

    useEffect(() => {
        if (employeeId) {
            const fetchEmployee = async () => {
                try {
                    const data = await getEmployeeById(employeeId, token);
                    setName(data.name);
                    setEmail(data.email);
                    setDepartment(data.department);
                    setSalary(data.salary);
                } catch (error) {
                    console.error("Error fetching employee data:", error);
                    alert("Error fetching employee data.");
                }
            };
            fetchEmployee();
        }
    }, [employeeId, token]);

    const handleSubmit = async () => {
        if (!name || !email || !department || !salary) {
            alert("All fields are required.");
            return;
        }

        try {
            const employeeData = { name, email, department, salary: Number(salary) };
            console.log("Sending data to API:", employeeData);

            if (employeeId) {
                await updateEmployee(employeeId, employeeData, token);
                alert("Employee updated successfully.");
            } else {
                await createEmployee(employeeData, token);
                alert("Employee added successfully.");
            }
            navigate("/dashboard");
        } catch (error) {
            console.error("Error saving employee data:", error);
            alert(error.response?.data?.message || "Error saving employee data.");
        }
    };

    return (
        <div className="form-container">
            <h2>{employeeId ? "Edit Employee" : "Add Employee"}</h2>
            <div className="form-group">
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <input type="text" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
            </div>
            <div className="form-group">
                <input type="number" placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
            </div>
            <button className="submit-button" onClick={handleSubmit}>
                {employeeId ? "Update" : "Create"}
            </button>
        </div>
    );
};

export default EmployeeForm;
