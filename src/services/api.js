import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Authentication APIs
export const registerUser = async (userData) => await axios.post(`${API_URL}/auth/register`, userData);
export const loginUser = async (userData) => (await axios.post(`${API_URL}/auth/login`, userData)).data;

// Employee APIs
export const getEmployees = async (token) =>
    (await axios.get(`${API_URL}/employees`, { headers: { Authorization: `Bearer ${token}` } })).data;

export const getEmployeeById = async (id, token) =>
    (await axios.get(`${API_URL}/employees/${id}`, { headers: { Authorization: `Bearer ${token}` } })).data;

export const createEmployee = async (employeeData, token) =>
    await axios.post(`${API_URL}/employees`, employeeData, {
        headers: {
            "Content-Type": "application/json", // Ensure JSON content type
            Authorization: `Bearer ${token}`,
        },
    });

export const updateEmployee = async (id, employeeData, token) =>
    await axios.put(`${API_URL}/employees/${id}`, employeeData, {
        headers: {
            "Content-Type": "application/json", // Ensure JSON content type
            Authorization: `Bearer ${token}`,
        },
    });

export const deleteEmployee = async (id, token) =>
    await axios.delete(`${API_URL}/employees/${id}`, { headers: { Authorization: `Bearer ${token}` } });
