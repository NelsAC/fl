import { useDispatch, useSelector } from "react-redux";
import { SearIcon } from "../../assets/icons";
import { startLoadingPostsByFilter, unsetCurrentUsersPosts } from "../../store/post";
import "./styles/navbar.css";

export const NavBarInicioView = ({ search, onInputChange }) => {

  const dispatch = useDispatch();

  const { uid } = useSelector((state) => state.auth);

  const onSelectInputChange = ({ target }) => {
    if ( target.value === "allPosts" ) {
      dispatch( unsetCurrentUsersPosts() );
      onInputChange({ target: { value: "" } });
    } else {
      dispatch( startLoadingPostsByFilter(uid) );
    }
  }

  return (
    <div className="content__header">
      <div className="leftDiv">
      <h1 className="content__header--title">Inicio</h1>
      <div className="searchDiv">
        <SearIcon />
        <input 
          type="search" 
          name="search"
          placeholder="Buscar"
          className="content__header--search"
          autoComplete="off"
          value={ search }
          onChange={ onInputChange }
        />
      </div>
      </div>
      <div className="content__header--filter">
        <select className="content__header--filter-select"
          onChange={ onSelectInputChange }
        >
          <option value="allPosts">Todas las publicaciones</option>
          <option value="myPosts">Mis publicaciones</option>
        </select>
      </div>
    </div>
  );
};
