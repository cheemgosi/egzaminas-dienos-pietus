import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AdminNaujiPietus = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/admin/add-food', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Food added successfully');
                alert('Maistas pridėtas')
                // Redirect or perform any action upon successful addition
            } else {
                console.log('Failed to add food');
                // Handle error case
            }
        } catch (error) {
            console.error('Error adding food:', error);
        }
    };

    useEffect(() => {
        async function checkCookie() {
            console.log("checkedCookie")
            try {
                const response = await fetch('http://localhost:3000/api/admin/decryptCookie', {
                    method: 'GET',
                    credentials: 'include'
                });

                if (!response.ok) {
                    console.log("Bad");
                    navigate('/admin');
                }
            } catch (error) {
                console.error('Error checking cookie:', error);
            }
        }

        checkCookie();
    }, [navigate]);

    return (
        <div className='container-xl bg-secondary text-center mt-5 '>
            <div className="row py-3">
                <div className="col-md-3">
                    <Link to="/admin/pietus">
                        <button type="submit" className="btn btn-outline-dark">Atgal</button>
                    </Link>
                </div>
                <div className="col-md-6">
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Pavadinimas</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                aria-describedby="emailHelp"
                                required
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Aprašas</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Kaina</label>
                            <input
                                type="text"
                                pattern="([0-9]+.{0,1}[0-9]*,{0,1})*[0-9]"
                                className="form-control"
                                id="price"
                                required
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-success fs-3 p-3">Įkelti</button>
                    </form>
                </div>
                <div className="col-md-3" />
            </div>
        </div>
    );
};

export default AdminNaujiPietus;
