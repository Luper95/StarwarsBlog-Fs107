

//trae una lista con todos los url para trabajar
export const GetAllObjects =() =>{
    return fetch(`https://www.swapi.tech/api/`)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
      return response.json();
    })
    .catch((error) => console.error("Error fetching user:", error));
};

export const GetDetails=(type, id)=>{
  return fetch(`https://www.swapi.tech/api/${type}/${id}`)
  .then((response)=>{
    if(!response.ok){
      throw new Error("Cannot find this Id/Type");
    }
    return response.json();
  })
  .catch((error)=>console.error("Fetching this error: ", error));
};

//para cargar la info de las tarjetas, esto trae urls para la vista en detalle 
export const fetchEntities = async (centralData) => {
  const allEntities = {};

  for (const entity in centralData) {
    const url = `https://www.swapi.tech/api/${entity}?page=2&limit=90`
    const res = await fetch(url);
    const data = await res.json();

    const results = data.results;

    // Guardar en localStorage
    localStorage.setItem(`swapi-${entity}`, JSON.stringify(results));

    
    allEntities[entity] = results;
  }

  return allEntities; //aca devuelvo todo junto para luego hacer el dispatch
};