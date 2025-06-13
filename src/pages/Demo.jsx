import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DetailedComponent } from "../components/DetailedComponent";

export const Demo = () => {
  const { tipo, id } = useParams();

  useEffect(() => {
    if (tipo === "people") {
      console.log("info de persona", id);
    } else if (tipo === "vehicles") {
      console.log("info vehiculo", id);
    } else if (tipo === "planets") {
      console.log("info planets", id);
    }
  }, [tipo, id]);

  return (
    <div>
      {tipo === "people" ? (
        <DetailedComponent type={tipo} id={id} />
      ) : tipo === "vehicles" ? (
        <DetailedComponent type={tipo} id={id} />
      ) : tipo === "planets" ? (
        <DetailedComponent type={tipo} id={id} />
      ) : (
        <p>fallo al conseguir tipo</p>
      )}
    </div>
  );
};
