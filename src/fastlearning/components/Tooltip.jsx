import "./styles/tooltip.css";

export const Tooltip = ({respuestas, desc, bgColor, left = '200%'}) => {
  return (

      <div className="tooltip-one animate__animated animate__zoomIn animate__faster" style={{ backgroundColor: bgColor, left: left }}>
        <span>{respuestas}</span>
        <p>{desc}</p>
        </div>
  );
};
