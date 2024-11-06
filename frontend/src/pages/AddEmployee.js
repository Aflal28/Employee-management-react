// AddEmployee.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:5000/api';

const AddEmployee = () => {
  const [empNo, setEmpNo] = useState('');
  const [empName, setEmpName] = useState('');
  const [departmentCode, setDepartmentCode] = useState('');
  const [basicSalary, setBasicSalary] = useState('');
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [empAddressLine1, setEmpAddressLine1] = useState('');
  const [empAddressLine2, setEmpAddressLine2] = useState('');
  const [empAddressLine3, setEmpAddressLine3] = useState('');
  const [dateOfJoin, setDateOfJoin] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [isActive, setIsActive] = useState(true); // Default is true (Active)
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(`${BASE_URL}/departments`);
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        setError('Failed to load departments');
      }
    };
    fetchDepartments();
  }, []);

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    const newEmployee = {
        empNo,
        empName,
        departmentCode,  // Ensure departmentCode matches the backend
        basicSalary,
        empAddressLine1,
        empAddressLine2,
        empAddressLine3,
        dateOfJoin,
        dateOfBirth,
        isActive,
      };
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/employee`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmployee),
      });
      if (!response.ok) throw new Error('Failed to add employee');
      navigate('/');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="add-employee-container">
      <h2>Add New Employee</h2>
      <form onSubmit={handleAddEmployee}>
      <input
    type="text"
    placeholder="Employee No"
    value={empNo}
    onChange={(e) => setEmpNo(e.target.value)}
    required
  />
  <input
    type="text"
    placeholder="Employee Name"
    value={empName}
    onChange={(e) => setEmpName(e.target.value)}
    required
  />
  <select
    value={departmentCode}
    onChange={(e) => setDepartmentCode(e.target.value)}
    required
  >
    <option value="">Select Department</option>
    {departments.map((dept) => (
      <option key={dept.departmentCode} value={dept.departmentCode}>
        {dept.departmentName}
      </option>
    ))}
  </select>
  <input
    type="number"
    placeholder="Basic Salary"
    value={basicSalary}
    onChange={(e) => setBasicSalary(e.target.value)}
    required
  />
  <input
    type="text"
    placeholder="Address Line 1"
    value={empAddressLine1}
    onChange={(e) => setEmpAddressLine1(e.target.value)}
    required
  />
  <input
    type="text"
    placeholder="Address Line 2"
    value={empAddressLine2}
    onChange={(e) => setEmpAddressLine2(e.target.value)}
    required
  />
  <input
    type="text"
    placeholder="Address Line 3"
    value={empAddressLine3}
    onChange={(e) => setEmpAddressLine3(e.target.value)}
  />
  <input
    type="date"
    placeholder="Date of Joining"
    value={dateOfJoin}
    onChange={(e) => setDateOfJoin(e.target.value)}
    required
  />
  <input
    type="date"
    placeholder="Date of Birth"
    value={dateOfBirth}
    onChange={(e) => setDateOfBirth(e.target.value)}
    required
  />
  <select
    value={isActive}
    onChange={(e) => setIsActive(e.target.value)}
    required
  >
    <option value={true}>Active</option>
    <option value={false}>Inactive</option>
  </select>
        <button type="submit" disabled={loading}>Add Employee</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AddEmployee;
