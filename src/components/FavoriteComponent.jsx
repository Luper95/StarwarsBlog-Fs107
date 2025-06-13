import useGlobalReducer from "../hooks/useGlobalReducer";
import "../index.css";

export function FavoriteComponent({ likes }) {
  const { store, dispatch } = useGlobalReducer();

  const Handleclick = (id) => {
    console.log("Eliminar", id);
    dispatch({ type: "REMOVE_FAV", payload: id });
  };
  return (
    <div className="dropdown " data-bs-auto-close="outside">
      <button
        className="btn btn-danger text-light dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {`Your Likes ${likes.length > 0 ? likes.length : 0}`}
      </button>
      <ul className="dropdown-menu">
        {likes.length == 0 ? (
          <li className="dropdown-item text-muted">No favorites yet</li>
        ) : (
          likes.map((item) => (
            <li
              key={item}
              className="dropdown-item d-flex justify-content-between"
            >
              {item}
              <a
                onClick={(e) => {
                  Handleclick(item);
                  e.stopPropagation();
                }}
              >
                <i className="fa-solid fa-trash"></i>
              </a>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
