// Import necessary hooks and functions from React
import { useContext, useReducer, createContext, useEffect } from "react";
import { GetAllObjects, fetchEntities } from "../Services/services";
//context
const StoreContext = createContext();
//initialState en vacio pero un array de objetos?
//completo en un solo Reducer
const initialState = {
  centralData: {},
  favorites: [],
  entities: {
    planets: {},
    vehicles: {},
    people: {},
  },
};

//tareasDelDispatch
function storeReducer(state, action) {
  switch (action.type) {
    //conseguimos el 100 de la info y la guardamos en data
    case "SET_DATA":
      return { ...state, centralData: action.payload };
    case "ADD_FAV":
      //guardamos lo que necesitemos en favoritos
      return { ...state, favorites: [...state.favorites, action.payload] };
    case "REMOVE_FAV":
      return {
        ...state,
        favorites: state.favorites.filter((fav) => fav !== action.payload),
      };

    case "SET_ENTITY":
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.entity]: action.payload,
        },
      };
    default:
      console.log("bad request, try again another action");
      return state;
  }
}
export function StoreProvider({ children }) {
  const [store, dispatch] = useReducer(storeReducer, initialState);

  useEffect(() => {
    // Intentamos obtener los datos desde el localStorage
    const localDataRaw = localStorage.getItem("swapi-data");
    const cachedEntities = {};
    // Verificamos si hay algo guardado
    if (localDataRaw) {
      try {
        // Intentamos parsear el JSON
        const localData = JSON.parse(localDataRaw);
        if (localData) {
          console.log("Cargando datos desde localStorage:", localData);

          dispatch({ type: "SET_DATA", payload: localData });
          //si hay datos guardados en localstorage de las cards esto los traera de regreso
          ["planets", "vehicles", "people"].forEach((entity) => {
            const raw = localStorage.getItem(`swapi-entity-${entity}`);
            if (raw) {
              cachedEntities[entity] = JSON.parse(raw);
              dispatch({
                type: "SET_ENTITY",
                entity,
                payload: cachedEntities[entity],
              });
            } else console.log("entity not found ");
          });
          return; // Salimos del useEffect para evitar el fetch innecesario
        } else {
          // Si el parseo fue válido pero no hay datos útiles, lanzamos error
          throw new Error("Datos parseados son null");
        }
      } catch (error) {
        // Si hay error en el parseo, avisamos por consola
        console.warn(
          "Fallo al parsear swapi-data, se hará un fetch nuevo:",
          error
        );
      }
    }

    // Si no había datos válidos en localStorage, hacemos el fetch desde la API
    GetAllObjects()
      .then((data) => {
        if (data && data.result) {
          console.log("Guardando en localStorage:", data.result);
          localStorage.setItem("swapi-data", JSON.stringify(data.result));
          dispatch({ type: "SET_DATA", payload: data.result });

          const filteredResult = Object.entries(data.result)
            .filter(([key]) => ["people", "vehicles", "planets"].includes(key))
            .reduce((obj, [key, value]) => {
              obj[key] = value;
              return obj;
            }, {});

          return fetchEntities(filteredResult);
        } else {
          throw new Error("La API no devolvió un result válido");
        }
      })
      .then((entitiesObj) => {
        // Una vez obtenidas las entidades, actualizamos el estado global
        for (const entity in entitiesObj) {
          dispatch({
            type: "SET_ENTITY",
            entity: entity,
            payload: entitiesObj[entity],
          });
          //guardamos en localStorage
          localStorage.setItem(
            `swapi-entity-${entity}`,
            JSON.stringify(entitiesObj[entity])
          );
        }
      })
      .catch((error) => {
        console.error("Error al cargar datos desde la API:", error);
      });
  }, []);
  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

// Custom hook to access the global state and dispatch function.
export default function useGlobalReducer() {
  const { dispatch, store } = useContext(StoreContext);
  return { dispatch, store };
}
