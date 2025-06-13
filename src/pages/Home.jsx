import { useEffect } from "react";
import CardComponent from "../components/CardComponent.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import "../index.css";

const Loader = () => (
  <div className="d-flex justify-content-center align-items-center w-100 py-5">
    <div className="spinner-border text-light" role="status">
      <div className="spinner-border text-light" role="status">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden text-light">
            Loading from a distant galaxy...
          </span>
        </div>
      </div>
    </div>
  </div>
);

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {}, [store]);

  return (
    <div className="checkBg">
      <h2 className="text-light mb-3">Databank| People</h2>
      <div className="d-flex overflow-auto gap-4 mb-5 checkBg">
        {store.entities.people.length > 0 ? (
          store.entities.people.map((person) => (
            <CardComponent
              key={person.uid}
              name={person.name}
              type={"people"}
              id={person.uid}
            />
          ))
        ) : (
          <Loader />
        )}
      </div>
      <h2 className="text-light mb-3">Databank| Vehicles</h2>
      <div className="d-flex overflow-auto gap-4 mb-5 checkBg">
        {store.entities.vehicles.length > 0 ? (
          store.entities.vehicles.map((vehicle) => (
            <CardComponent
              key={vehicle.uid}
              name={vehicle.name}
              type={"vehicles"}
              id={vehicle.uid}
            />
          ))
        ) : (
          <Loader />
        )}
      </div>
      <h2 className="text-light mb-3">Databank| Planets</h2>
      <div className="d-flex overflow-auto gap-4 mb-5 mb-5 checkBg">
        {store.entities.planets.length > 0 ? (
          store.entities.planets.map((planet) => (
            <CardComponent
              key={planet.uid}
              name={planet.name}
              type={"planets"}
              id={planet.uid}
            />
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};
