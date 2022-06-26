import "./styles/progress.css";
import { Tooltip } from "./Tooltip";

export const Porgress = () => {
  return (
    <div className="progress__container">
      <div className="progress__advance">29%</div>
      <div className="progress__figure">
        <div className="progress__figure--intern">
          <div className="progress__intern--perc"></div>
        </div>
      </div>
      <div className="tooltip-container">
        <i className="fa-solid fa-circle-question"></i>
        <Tooltip 
          // respuestas={`Tienes ${respuestas} respuestas bien calificadas`}
          respuestas={`Tienes 3 respuestas bien calificadas`}
          // desc={`Te faltan ${20 - respuestas} más para pasar al siguiente nivel`}
          desc={`Te faltan 17 más para pasar al siguiente nivel`}
          bgColor={`#6200ee`}
        />
      </div>
    </div>
  );
};
