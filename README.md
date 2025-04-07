import React, { useEffect, useState } from 'react';

function UserDropdown() {
  const [users, setUsers] = useState([]);         // Store fetched users
  const [selectedUser, setSelectedUser] = useState(''); // Store selected user ID

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();       // Convert response to JSON
        setUsers(data);                           // Store users in state
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers(); // Call the function when the component mounts
  }, []); // Empty array = run once on mount

  const handleChange = (event) => {
    setSelectedUser(event.target.value);          // Update selected user ID
  };

  return (
    <div>
      <label>Select a User: </label>
      <select value={selectedUser} onChange={handleChange}>
        <option value="">-- Select --</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      {selectedUser && <p>You selected user ID: {selectedUser}</p>}
    </div>
  );
}

export default UserDropdown;


import React, { useEffect, useState } from 'react';

function StudentInfo() {
  const [student, setStudent] = useState(null);
  const [subject, setSubject] = useState(null);

  useEffect(() => {
    const fetchStudentAndSubject = async () => {
      try {
        // Step 1: Fetch student
        const studentRes = await fetch('/api/students/1/');
        const studentData = await studentRes.json();
        setStudent(studentData); // Set student data right away

        // Step 2: Fetch subject using the URL in student.subject
        const subjectRes = await fetch(studentData.subject);
        const subjectData = await subjectRes.json();
        setSubject(subjectData); // Set subject data
      } catch (error) {
        console.error('Error fetching student or subject:', error);
      }
    };

    fetchStudentAndSubject();
  }, []);

  if (!student || !subject) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{student.name}</h2>
      <p>Subject: {subject.name}</p>
    </div>
  );
}

export default StudentInfo;

https://docs.google.com/document/d/1769faL2gnSXRCdUkdvPrBwYKhfPSCydJescrR4CUf8s/edit?usp=sharing

npx create-react-app <name>
pip install --upgrade django-filter
