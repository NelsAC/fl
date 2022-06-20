import code from "../../assets/images/code.jpg";
import design from "../../assets/images/design.jpg";
import bd from "../../assets/images/bd.jpg";
import './styles/courses.css';

export const CoursesView = () => {
  return (
    <div className="content__body--cursos">
      <div className="content__curso">
        <div className="content__curso--main">
          <h2>Programación</h2>
          <div className="separacion"></div>
          <p className="content__curso--obj">
            <i className="fa-solid fa-bullseye"></i>Lenguajes de programación y
            algoritmos
          </p>
          <p className="content__curso--stack">
            <i className="fa-brands fa-stack-overflow"></i>Java, PHP, JS, Python
          </p>
          <p className="content__curso--resume">
            Realiza preguntas, resuelve problemas y ayuda a los demás en temas
            de programación
          </p>
          <button className="content__curso--btn">Ir a preguntas</button>
        </div>
        <div className="content__curso--img even">
          <img src={code} />
        </div>
      </div>
      <div className="content__curso">
        <div className="content__curso--main">
          <h2>Diseño</h2>
          <div className="separacion"></div>
          <p className="content__curso--obj">
            <i className="fa-solid fa-bullseye"></i>Lenguajes de programación y
            algoritmos
          </p>
          <p className="content__curso--stack">
            <i className="fa-brands fa-stack-overflow"></i>Java, PHP, JS, Python
          </p>
          <p className="content__curso--resume">
            Realiza preguntas, resuelve problemas y ayuda a los demás en temas
            de programación
          </p>
          <button className="content__curso--btn">Ir a preguntas</button>
        </div>
        <div className="content__curso--img odd">
          <img src={design} />
        </div>
      </div>
      <div className="content__curso">
        <div className="content__curso--main">
          <h2>Base de datos</h2>
          <div className="separacion"></div>
          <p className="content__curso--obj">
            <i className="fa-solid fa-bullseye"></i>Lenguajes de programación y
            algoritmos
          </p>
          <p className="content__curso--stack">
            <i className="fa-brands fa-stack-overflow"></i>Java, PHP, JS, Python
          </p>
          <p className="content__curso--resume">
            Realiza preguntas, resuelve problemas y ayuda a los demás en temas
            de programación
          </p>
          <button className="content__curso--btn">Ir a preguntas</button>
        </div>
        <div className="content__curso--img even">
          <img src={bd} />
        </div>
      </div>
    </div>
  );
};
