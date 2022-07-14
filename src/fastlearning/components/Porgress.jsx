import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetBestAnswers } from "../../store/user";
import "./styles/progress.css";
import { Tooltip } from "./Tooltip";

export const Porgress = () => {

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch( startGetBestAnswers() );
  }, [])

  const { countBestAnswer } = useSelector((state) => state.user);

  return (
    <div className="progress__container">
      <div className="tooltip-container">
        <i className="fa-solid fa-circle-question"></i>
        <Tooltip 
          respuestas={`Tienes ${countBestAnswer} respuestas bien calificadas`}
          // respuestas={countBestAnswer}
          desc={`Te faltan ${20 - countBestAnswer} más para pasar al siguiente nivel`}
          // desc={`Te faltan 17 más para pasar al siguiente nivel`}
          bgColor={`#6200ee`}
        />
      </div>
      <div className="progress__figure">
        <div className="progress__figure--intern">
          {/* <div className="progress__intern--perc" style={{ width: 5*countBestAnswer + '%' }}></div> */}
          <div className="progress__intern--perc" style={{ width: 5*2 + '%' }}></div>
        </div>
      </div>
      <div className="progress__advance">{ 5 * countBestAnswer }%
      </div>
    </div>
  );
};
