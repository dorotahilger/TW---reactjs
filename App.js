import React, { useState } from 'react';

function App() {
  const [serverResponse, setServerResponse] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentSurname, setStudentSurname] = useState('');

  const createStudent = async () => {
    try {
      if (!studentName || !studentSurname) {
        throw new Error('Please provide both name and surname');
      }

      const response = await fetch('http://localhost:8000/students/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          first_name: studentName,
          last_name: studentSurname
        })
      });
      const data = await response.json();
      setServerResponse(JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  };

  const handleNameChange = (event) => {
    setStudentName(event.target.value);
  };

  const handleSurnameChange = (event) => {
    setStudentSurname(event.target.value);
  };

  return (
    <div>
      <h1>Studenci</h1>
      <div>
        <label htmlFor="studentName">Imię studenta:</label>
        <input
          type="text"
          id="studentName"
          value={studentName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <label htmlFor="studentSurname">Nazwisko studenta:</label>
        <input
          type="text"
          id="studentSurname"
          value={studentSurname}
          onChange={handleSurnameChange}
        />
      </div>
      <button onClick={createStudent}>Dodaj studenta</button>
      <p>{serverResponse}</p>
    </div>
  );
}

export default App;
