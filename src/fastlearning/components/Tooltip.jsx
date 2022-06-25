import "./styles/tooltip.css";

export const Tooltip = ({respuestas = 3}) => {
  return (
    <div className="tooltip-container">
      <i className="fa-solid fa-circle-question"></i>
      <div className="tooltip-one animate__animated animate__zoomIn animate__faster">
        <span>Tienes {respuestas} respuestas bien calificadas</span>
        <p>Te faltan 17 más para pasar al siguiente nivel</p>
        </div>
    </div>
  );
};
