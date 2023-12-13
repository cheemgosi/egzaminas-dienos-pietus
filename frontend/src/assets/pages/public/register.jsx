import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      console.log(response)
      if (response.ok) {
        setSuccessMessage(data.message);
        navigate('/login')
      } else {
        setError(data.message);
        setSuccessMessage('');
      }
    } catch (err) {
      setError('Registration failed');
      setSuccessMessage('');

      console.log(err);
    }
  };

  return (
    <div className='container-xl bg-secondary text-center mt-5 '>
      <div className="row py-3">
        <div className="col-md-3" />
        <div className='col-md-6'>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="InputEmail1" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="InputEmail1"
                aria-describedby="emailHelp"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="InputPassword1" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="InputPassword1"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-success fs-3 p-3">Register</button>
            <p className="text-danger">{error}</p>
            <p className="text-success">{successMessage}</p>
            <Link to='/login'>
                <button className="btn btn-info mx-3">Prisijungti</button>
            </Link>
          </form>
        </div>
        <div className="col-md-3" />
      </div>
    </div>
    );
};

export default Register;