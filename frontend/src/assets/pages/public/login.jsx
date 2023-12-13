import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include', // Send cookies for authentication
      });

      if (response.ok) {
        // Login successful
        // Redirect or perform necessary action upon successful login
        console.log('Login successful');
        navigate('/')

      } else {
        // Handle login error
        const data = await response.json();
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };

  return (
    <div className='container-xl bg-secondary text-center mt-5 '>
            <div className="row py-3">
        <div className="col-md-3" />
        <div className='col-md-6'>
      <form onSubmit={handleLogin}>
      <div className="mb-3">
                <label htmlFor="InputEmail1" className="form-label">Vartotojo vardas</label>
            <input
            type="text"
            className="form-control"
            id="InputEmail1"
            aria-describedby="emailHelp"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
        </div> 

              <div className="mb-3">
              <label htmlFor="InputPassword1" className="form-label">Slaptažodis</label>

        <input
          type="password"
          className="form-control"
          id="InputPassword1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
                </div> 

        <button type="submit" className="btn btn-success fs-3 p-3">Prisijungti</button>
            <Link to='/register'>
                <button className="btn btn-info mx-3">Registruotis</button>
            </Link>
          </form>
        </div>
        <div className="col-md-3" />
      </div>
    </div>
  );
};

export default Login;
