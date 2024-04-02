import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make a POST request to /users/login endpoint on the server
      const response = await axios.post('http://localhost:3000/users/login', {
        username,
        password,
      });
      if (response.data.status === true) {
        
        document.cookie = `token=${response.data.token}; path=/`;
        localStorage.setItem('token',response.data.token)
        window.location.href = '/';
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while logging in.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;