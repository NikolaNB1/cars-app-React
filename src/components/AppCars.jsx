import { useEffect } from "react";
import { deleteCarById, getCars } from "../service/carsService";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeCar, setCars } from "../store/cars/slice";
import { selectCarsValue } from "../store/cars/selectors";

const AppCars = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCarsValue);

  useEffect(() => {
    getCars().then(({ data }) => dispatch(setCars(data.data)));
  }, []);

  const handleDelete = (id) => {
    const shouldDelete = window.confirm(
      "Da li ste sigurni da želite obrisati automobil?"
    );
    if (shouldDelete) {
      deleteCarById(id);
      dispatch(removeCar(id));
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table
          className="table table-striped table-hover"
          style={{ width: "300px", textAlign: "center" }}
        >
          <thead>
            <tr>
              <th>Model</th>
              <th>Brand</th>
              <th>Year</th>
              <th>Max speed</th>
              <th>Automatic</th>
              <th>Engine</th>
              <th>No of doors</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, id) => (
              <tr key={id}>
                <td>{car.model}</td>
                <td>{car.brand}</td>
                <td>{car.year}</td>
                <td>{car.maxSpeed}</td>
                <td>{car.is_automatic ? "Yes" : "No"}</td>
                <td>{car.engine}</td>
                <td>{car.number_of_doors}</td>
                <td>
                  <Link to={`edit/${car.id}`}>Edit</Link>
                </td>
                <td>
                  <button type="delete" onClick={() => handleDelete(car.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AppCars;
