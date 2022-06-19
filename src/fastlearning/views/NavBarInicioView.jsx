import "./navbar.css";

export const NavBarInicioView = () => {
  return (
    <div className="content__header">
      <h1 className="content__header--title">Inicio</h1>
      <div className="content__header--filter">
        <span className="active">Tus publicaciones</span>
        <span>Todas las publicaciones</span>
      </div>
    </div>
  );
};
