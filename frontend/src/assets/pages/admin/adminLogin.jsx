import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials:"include"
      });

      if (response.body) {
        console.log('Login successful');
        navigate('/admin/pietus')
      } else {
        const data = await response.json();
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Login failed:', error.message);
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
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="InputPassword1" className="form-label">Slaptažodis</label>
              <input
                type="password"
                className="form-control"
                id="InputPassword1"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-success fs-3 p-3">Prisijungti</button>
          </form>
        </div>
        <div className="col-md-3" />
      </div>
    </div>
  );
};

export default AdminLogin;
