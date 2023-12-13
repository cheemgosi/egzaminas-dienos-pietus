import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const adminPietus = () => {
    const navigate = useNavigate();
    const [dishes, setDishes] = useState([]);
    const [editedValues, setEditedValues] = useState({});


    const handleEdit = (id) => {
        // Find the dish to edit by ID
        const dishToEdit = dishes.find(dish => dish._id === id);
        const editedDishes = [...dishes];
    
        // Modify the specific dish's values in the local state
        editedDishes.forEach(item => {
          if (item._id === id) {
            item.editMode = true;
          } else {
            item.editMode = false;
          }
        });
    
        setDishes(editedDishes);
        setEditedValues({
          ...editedValues,
          [id]: {
            name: dishToEdit.name,
            description: dishToEdit.description,
            price: dishToEdit.price
          }
        });
      };
    
      const handleInputChange = (event, id, field) => {
        const { value } = event.target;
    
        setEditedValues({
          ...editedValues,
          [id]: {
            ...editedValues[id],
            [field]: value
          }
        });
      };
    
      const handleUpdate = async (id) => {
        try {
          const updatedData = editedValues[id];
          
          const response = await fetch(`http://localhost:3000/api/foods/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
          });
    
          if (response.ok) {
            const updatedDishes = await fetchDishes();
            setDishes(updatedDishes);
            window.location.reload(false);
        } else {
            console.error('Failed to update the food item');
            alert("Informacija nepakeista, patikrinkite, ar viską įvedėte teisingai")
          }
        } catch (error) {
          console.error('Error occurred while updating:', error);
        }
      };

    const handleDelete = async (id) => {
        try {
          const response = await fetch(`http://localhost:3000/api/foods/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials:"include"
          });

          if (response.ok) {
            setDishes(dishes.filter(dish => dish._id !== id));
          } else {
            console.error('Failed to delete the food item');
          }
        } catch (error) {
          console.error('Error occurred while deleting:', error);
        }};

        async function fetchDishes() {
            try {
                const response = await fetch('http://localhost:3000/api/foods', {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    setDishes(data);
                    console.log("fetch succesful");
                    console.log(data);
                } else {
                    console.log('Failed to fetch dishes');
                }
            } catch (error) {
                console.error('Error fetching dishes:', error);
            }
        }

    useEffect(() => {
        async function checkCookie() {
            console.log("checkedCookie")
            try {
                const response = await fetch('http://localhost:3000/api/admin/decryptCookie', {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.ok) {
                    console.log('Good');
                    console.log(response);
                } else{
                    console.log("Bad");
                    navigate('/admin')
                }
            } catch (error) {
                console.error('Error checking cookie:', error);
            }
        }

        

        checkCookie();
        fetchDishes();
    }, []);

    return (
        <div className='container-xl bg-secondary text-center mt-5 '>
            <div className="row py-3">
                <div className="col-md-3" />
                <div className='col-md-6 row'>
                    <div className="col-md-6">
                        <p className='fs-2 text-white'>Dienos pietūs</p>
                    </div>
                    <div className="col-md-6">
                        <Link to="/admin/pietus/naujas">
                            <button type="submit" className="btn btn-success mt-2">Pridėti naują</button>
                        </Link>
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
          <div className="col-md-2 border py-2">{dish.editMode ? <input type="text" value={editedValues[dish._id]?.name || ''} onChange={(e) => handleInputChange(e, dish._id, 'name')} /> : dish.name}</div>
          <div className="col-md-3 border py-2">{dish.editMode ? <input type="text" value={editedValues[dish._id]?.description || ''} onChange={(e) => handleInputChange(e, dish._id, 'description')} /> : dish.description}</div>
          <div className="col-md-3 border py-2">{dish.editMode ? <input type="text" value={editedValues[dish._id]?.price || ''} onChange={(e) => handleInputChange(e, dish._id, 'price')} /> : dish.price}</div>
          <div className="col-md-3 border py-2">
            <button className="btn btn-primary m-1" onClick={() => handleEdit(dish._id)}>Redaguoti</button>
            <button className="btn btn-danger" onClick={() => handleDelete(dish._id)}>Trinti</button>
            {dish.editMode && <button className="btn btn-success" onClick={() => handleUpdate(dish._id)}>Išsaugoti</button>}
          </div>
        </div>
      ))
      ) : (
        <p>Patiekalų nėra, pridėkite arba perkraukite puslapį, jei manote, kad tai klaida</p>
      )}
        </div>
    );
};

export default adminPietus;
