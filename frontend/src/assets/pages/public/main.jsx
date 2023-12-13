import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const [dishes, setDishes] = useState([]);
    const navigate = useNavigate();


    async function logOut() {
        try {
            const response = await fetch('http://localhost:3000/user/logout', {
                method: 'POST',
                credentials: 'include'
            });

            if (response.ok) {
                navigate('/login')
            } else {
                console.log('Failed to fetch dishes');
            }
        } catch (error) {
            console.error('Error fetching dishes:', error);
        }
    }

    useEffect(() => {
        async function fetchDishes() {
            try {
                const response = await fetch('http://localhost:3000/api/foods', {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    setDishes(data);
                    console.log("Fetch successful");
                    console.log(data);
                } else {
                    console.log('Failed to fetch dishes');
                }
            } catch (error) {
                console.error('Error fetching dishes:', error);
            }
        };

        
        
        fetchDishes();
    }, []); 

    console.log(dishes); 
    
    return (
        <div className='container-xl bg-secondary text-center mt-5'>
          <div className="row py-3">
            <div className="col-md-3" />
            <div className='col-md-6 row'>
              <div className="col-md-6">
                <p className='fs-2 text-white'>Dienos pietūs</p>
              </div>
              <div className="col-md-6">
                <button className="btn btn-danger mt-2" onClick={logOut}>Atsijungti</button>
              </div>
            </div>
            <div className="col-md-3" />
          </div>
      
          <div className="row">
            <div className="col-md-1 border py-2">Eilės nr.</div>
            <div className="col-md-2 border py-2">Pavadinimas</div>
            <div className="col-md-3 border py-2">Aprašymas</div>
            <div className="col-md-3 border py-2">Kaina</div>
            <div className="col-md-3 border py-2">Veiksmai</div>
          </div>
      
          {dishes && dishes.length > 0 ? (
            dishes.map((dish, index) => (
              <div className="row my-3" key={index}>
                <div className="col-md-1 border py-2">{index + 1}.</div>
                <div className="col-md-2 border py-2">{dish.name}</div>
                <div className="col-md-3 border py-2">{dish.description}</div>
                <div className="col-md-3 border py-2">{dish.price}</div>
                <div className="col-md-3 border py-1 pt-0">
                    <i class="bi bi-star text-info fs-3 darken-on-hover"></i>
                </div>
              </div>
            ))
          ) : (
            <p>Patiekalų nėra, pridėkite arba perkraukite puslapį, jei manote, kad tai klaida</p>
          )}
        </div>
      );
      
};

export default Main;
