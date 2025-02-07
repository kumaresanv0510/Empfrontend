import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEmployees, deleteEmployee } from "../services/api";
import "../styles/Dashboard.css"; // Import the CSS file

const Dashboard = ({ token }) => {
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterDepartment, setFilterDepartment] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 5; // Number of employees per page

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await getEmployees(token);
                setEmployees(data);
            } catch (error) {
                alert("Error fetching employees.");
            }
        };

        fetchEmployees();
    }, [token]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await deleteEmployee(id, token);
                setEmployees(employees.filter(emp => emp._id !== id));
                alert("Employee deleted successfully.");
            } catch (error) {
                alert("Error deleting employee.");
            }
        }
    };

    // Filter employees based on search query and department
    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filterDepartment === "" || emp.department === filterDepartment)
    );

    // Pagination Logic
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

    return (
        <div className="dashboard-container">
            <h2>Employee Dashboard</h2>
            <button className="add-button" onClick={() => navigate("/employee-form")}>+ Add Employee</button>

            {/* Search & Filter Section */}
            <div className="search-filter-container">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select value={filterDepartment} onChange={(e) => setFilterDepartment(e.target.value)}>
                    <option value="">All Departments</option>
                    {Array.from(new Set(employees.map(emp => emp.department))).map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                    ))}
                </select>
            </div>

            {/* Employee List */}
            <div className="employee-list">
                {currentEmployees.length === 0 ? (
                    <p className="no-employees">No employees found.</p>
                ) : (
                    currentEmployees.map((emp) => (
                        <div key={emp._id} className="employee-card">
                            <h3>{emp.name}</h3>
                            <p><strong>Email:</strong> {emp.email}</p>
                            <p><strong>Department:</strong> {emp.department}</p>
                            <p><strong>Salary:</strong> ${emp.salary}</p>
                            <div className="card-buttons">
                                <button className="edit-button" onClick={() => navigate(`/employee-form?id=${emp._id}`)}>Edit</button>
                                <button className="delete-button" onClick={() => handleDelete(emp._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
