import { useEffect, useState } from "react";
import { GetDetails } from "../Services/services";
import notFoundImage from "../assets/img/404.jpg";

export function DetailedComponent({ type, id }) {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    console.log(type, id);
    const localDataRaw = localStorage.getItem(`swapi-data-${type}-${id}`);
    if (localDataRaw) {
      try {
        const localData = JSON.parse(localDataRaw);
        console.log("cargado desde el sistema", localData);
        setDetails(localData);
      } catch (error) {
        console.warn("No habia data, se hara el fetch de nuevo", error);
      }
    } else {
      GetDetails(type, id).then((data) => {
        console.log(data);
        if (data && data.result.properties) {
          localStorage.setItem(
            `swapi-data-${type}-${id}`,
            JSON.stringify(data.result.properties)
          );
          setDetails(data.result.properties);
          console.log(details);
        } else {
          throw new Error("La API no devolvió un result válido");
        }
      });
    }
  }, [type, id]);
  return (
    <div className="text-light">
      <div className="container-fluid d-flex">
        <div>
          <img
            src={`https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/${type}/${id}.jpg`}
            className=""
            alt="..."
            onError={(e) => {
              e.target.onerror = null; // evita un bucle infinito
              e.target.src = notFoundImage; // imagen por defecto
            }}
            style={{ width: "30rem" }}
          />
        </div>
        {type === "people" ? (
          <div className="ms-2">
            <h1>{details.name}</h1>
            <h4>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At rerum
              illum provident veniam totam molestias dolorem minus nobis
              necessitatibus voluptatem! Odit cumque itaque deleniti molestias
              inventore possimus ea sunt veritatis.
            </h4>
          </div>
        ) : type === "vehicles" ? (
          <div className="ms-2">
            <h1>{details.name}</h1>
            <h4>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At rerum
              illum provident veniam totam molestias dolorem minus nobis
              necessitatibus voluptatem! Odit cumque itaque deleniti molestias
              inventore possimus ea sunt veritatis.
            </h4>
          </div>
        ) : type === "planets" ? (
          <div className="ms-2">
            <h1>{details.name}</h1>
            <h4>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At rerum
              illum provident veniam totam molestias dolorem minus nobis
              necessitatibus voluptatem! Odit cumque itaque deleniti molestias
              inventore possimus ea sunt veritatis.
            </h4>
          </div>
        ) : (
          <p>no hay nada para mostrar</p>
        )}
      </div>
      {type === "people" ? (
        <div className="d-flex justify-content-around  text-center align-items-center mt-3 border border-3 border-danger">
          <div className="">
            <h3 className="">Birth year </h3>
            <h4>{details.birth_year}</h4>
          </div>
          <div>
            <h3 className="">Eye color</h3>
            <h4> {details.eye_color}</h4>
          </div>
          <div>
            <h3 className="">Hair color</h3>
            <h4> {details.hair_color}</h4>
          </div>
          <div>
            <h3 className="">Gender</h3>
            <h4> {details.gender}</h4>
          </div>
          <div>
            <h3 className="">Height</h3>
            <h4> {details.height}cm</h4>
          </div>
          <div>
            <h3 className="">Weight </h3>
            <h4>{details.mass}kg</h4>
          </div>
          <div>
            <h3 className="">Skin Color</h3>
            <h4>{details.skin_color}</h4>
          </div>
        </div>
      ) : type === "vehicles" ? (
        <div className="d-flex justify-content-around gap-3 text-center align-items-center mt-3 border border-3 border-danger ">
          <div>
            <h4 className="">Model</h4>
            <h5> {details.model}</h5>
          </div>
          <div>
            <h4 className="">Manufacturer</h4>
            <h5> {details.manufacturer}</h5>
          </div>
          <div>
            <h4 className="">Passengers</h4>
            <h5> {details.passengers}</h5>
          </div>
          <div>
            <h4 className="">length</h4>
            <h5> {details.length}</h5>
          </div>
          <div>
            <h4 className="">Cargo capacity</h4>
            <h5> {details.cargo_capacity}kg</h5>
          </div>
          <div>
            <h4 className="">Max speed</h4>
            <h5> {details.max_atmosphering_speed}mph</h5>
          </div>
          <div>
            <h4 className="">Vehicle class</h4>
            <h5> {details.vehicle_class}</h5>
          </div>
          <div>
            <h4 className="">Crew</h4>
            <h5> {details.crew}</h5>
          </div>
          <div>
            {" "}
            <h4 className="">Consumables</h4>
            <h5> {details.consumables}</h5>
          </div>
          <div>
            <h4 className="">Cost in credits </h4>
            <h5>{details.cost_in_credits}</h5>
          </div>
        </div>
      ) : type === "planets" ? (
        <div className="d-flex justify-content-around gap-3 text-center align-items-center mt-3 border border-3 border-danger  ">
          <div>
            <h4 className="">Climate</h4>
            <h5> {details.climate}</h5>
          </div>
          <div>
            <h4 className="">Diameter</h4>
            <h5> {details.diameter}</h5>
          </div>
          <div>
            <h4 className="">Gravity </h4>
            <h5>{details.gravity}</h5>
          </div>
          <div>
            <h4 className="">Orbital period </h4>
            <h5>{details.orbital_period}</h5>
          </div>
          <div>
            <h4 className="">Population</h4>
            <h5> {details.population}</h5>
          </div>
          <div>
            <h4 className="">Rotation speed</h4>
            <h5> {details.rotation_period}</h5>
          </div>
          <div>
            <h4 className="">Surface water</h4>
            <h5> {details.surface_water}</h5>
          </div>
          <div>
            <h4 className="">Terrain</h4>
            <h5> {details.terrain}</h5>
          </div>
        </div>
      ) : (
        <p>no info yet!</p>
      )}
    </div>
  );
}
