import { Link } from "react-router-dom";
import { FavoriteComponent } from "./FavoriteComponent";
import useGlobalReducer from "../hooks/useGlobalReducer";
import "../index.css";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  console.log(store.favorites);
  return (
    <nav className="navbar  navBg">
      <div className="container ">
        <Link to="/">
          <span className="navbar-brand mb-0  ">
            <img
              src="https://static.cdnlogo.com/logos/s/58/star-wars.png"
              alt="starWarsLogo"
              style={{ width: "7rem" }}
              className="fakeLogo  "
            ></img>
          </span>
        </Link>
        <div className="ml-auto ">
          <FavoriteComponent likes={store.favorites} />
        </div>
      </div>
    </nav>
  );
};
