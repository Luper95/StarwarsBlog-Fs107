import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import "../index.css";

import { useNavigate } from "react-router-dom";

const CardComponent = ({ name, type, id }) => {
  const { store, dispatch } = useGlobalReducer();
  const [isFa, setIsfa] = useState(false);
  const navigate = useNavigate();

  const GoNewSite = () => {
    navigate(`/demo/${type}/${id}`);
  };

  const HandleClick = () => {
    setIsfa((prev) => !prev);
    console.log(isFa);
    isFa
      ? dispatch({ type: "REMOVE_FAV", payload: name })
      : dispatch({ type: "ADD_FAV", payload: name });
  };
  useEffect(() => {
    setIsfa(store.favorites.includes(name));
  }, [store.favorites]);

  return (
    <div
      className="card col-6 bodyCard d-flex flex-column"
      style={{ width: "18rem", height: "100%" }}
    >
      {" "}
      <img
        src={`https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/${type}/${id}.jpg`}
        className="card-img-top  align-self-center mx-0 px-0"
        alt="..."
        onError={(e) => {
          e.target.onerror = null; // evita un bucle infinito
          e.target.src = "src/assets/img/404.jpg"; // imagen por defecto
        }}
      />
      <div className="card-body flex-grow-1 d-flex flex-column justify-content-between">
        <h5 className="card-title text-light">
          <b>{name}</b>
        </h5>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <button className="btn btn-danger imperialRed" onClick={GoNewSite}>
            See {name}
          </button>
          <a onClick={HandleClick}>
            {isFa ? (
              <i className="fa-solid fa-heart fs-4 heart"></i>
            ) : (
              <i className="fa-regular fa-heart fs-4 heart"></i>
            )}
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
