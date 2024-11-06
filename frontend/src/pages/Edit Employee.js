// EditEmployee.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:5000/api';

const EditEmployee = () => {
  const { empNo } = useParams();
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
    const fetchEmployee = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/employee/${empNo}`);
        
        if (!response.ok) throw new Error(`Failed to load employee details. Status: ${response.status}`);
        
        const data = await response.json();
        
        setEmpName(data.empName);
        setDepartmentCode(data.departmentCode);
        setBasicSalary(data.basicSalary);
        setEmpAddressLine1(data.empAddressLine1);
        setEmpAddressLine2(data.empAddressLine2);
        setEmpAddressLine3(data.empAddressLine3);
        setDateOfJoin(data.dateOfJoin);
        setDateOfBirth(data.dateOfBirth);
        setIsActive(data.isActive);
        
      } catch (error) {
        console.error('Error fetching employee:', error);
        setError('Failed to load employee details');
      } finally {
        setLoading(false);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await fetch(`${BASE_URL}/departments`);
        
        if (!response.ok) throw new Error('Failed to load departments');
        
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error('Error fetching departments:', error);
        setError('Failed to load departments');
      }
    };

    fetchEmployee();
    fetchDepartments();
  }, [empNo]);

  const handleUpdateEmployee = async (e) => {
    e.preventDefault();
    const updatedEmployee = { 
      empName,
      departmentCode,
      basicSalary,
      empAddressLine1,
      empAddressLine2,
      empAddressLine3,
      dateOfJoin,
      dateOfBirth,
      isActive: isActive === 'true' || isActive === true, // Ensures correct boolean type
    };
    
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/employee/${empNo}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEmployee),
      });
      
      if (!response.ok) throw new Error('Failed to update employee');
      
      navigate('/');
    } catch (error) {
      console.error('Error updating employee:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-employee-container">
      <h2>Edit Employee</h2>
      {error && <p className="error">{error}</p>}
      {loading && <p>Loading...</p>}
      {!loading && (
        <form onSubmit={handleUpdateEmployee}>
          <input
            type="text"
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
            value={basicSalary}
            onChange={(e) => setBasicSalary(e.target.value)}
            required
          />
          <input
            type="text"
            value={empAddressLine1}
            onChange={(e) => setEmpAddressLine1(e.target.value)}
            required
          />
          <input
            type="text"
            value={empAddressLine2}
            onChange={(e) => setEmpAddressLine2(e.target.value)}
            required
          />
          <input
            type="text"
            value={empAddressLine3}
            onChange={(e) => setEmpAddressLine3(e.target.value)}
          />
          <input
            type="date"
            value={dateOfJoin}
            onChange={(e) => setDateOfJoin(e.target.value)}
            required
          />
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
          <select
            value={isActive}
            onChange={(e) => setIsActive(e.target.value)}
            required
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
          <button type="submit" disabled={loading}>Update Employee</button>
        </form>
      )}
    </div>
  );
};

export default EditEmployee;
