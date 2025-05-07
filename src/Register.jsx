import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('freelancer'); 
  const [rollNumber, setRollNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    const userData = {
      name,
      email,
      password,
      role,
    };

  
    if (role === 'freelancer') {
      userData.roll_number = rollNumber;
    }

    try {
      await axios.post('http://localhost:8000/api/register', userData);
      alert('Registration successful! Please login.');
      navigate('/'); 
    } catch (err) {
      const msg = err.response?.data?.errors
        ? Object.values(err.response.data.errors).join('\n')
        : 'Registration failed.';
      setError(msg);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="freelancer">Freelancer</option>
          <option value="client">Client</option>
        </select><br />

        {role === 'freelancer' && (
          <>
            <input
              type="text"
              placeholder="COMSATS Roll Number (e.g. FA20-BCS-01)"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              required
            />
            <br />
          </>
        )}


        <button type="submit">Register</button>
      </form>

      {error && <p style={{ color: 'red', whiteSpace: 'pre-line' }}>{error}</p>}
    </div>
  );
}

export default Register;
