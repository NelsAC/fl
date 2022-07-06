import './styles/courses.css';

import code from "../../assets/images/code.jpg";
import design from "../../assets/images/design.jpg";
import bd from "../../assets/images/bd.jpg";
import { Link } from 'react-router-dom';

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
          <Link to="/" style={{ display: 'inline-block' }} className="content__curso--btn">Ir a preguntas</Link>
        </div>
        <div className="content__curso--img even">
          <img src={ code } />
        </div>
      </div>
      <div className="content__curso">
        <div className="content__curso--main">
          <h2>Diseño</h2>
          <div className="separacion"></div>
          <p className="content__curso--obj">
            <i className="fa-solid fa-bullseye"></i>Patrones de diseño y experiencia de usuario
          </p>
          <p className="content__curso--stack">
            <i className="fa-brands fa-stack-overflow"></i>UX, UI
          </p>
          <p className="content__curso--resume">
            Realiza preguntas, resuelve problemas y ayuda a los demás en temas
            de diseño
          </p>
          <Link to="/" style={{ display: 'inline-block' }} className="content__curso--btn">Ir a preguntas</Link>
        </div>
        <div className="content__curso--img odd">
          <img src={ design } />
        </div>
      </div>
      <div className="content__curso">
        <div className="content__curso--main">
          <h2>Base de datos</h2>
          <div className="separacion"></div>
          <p className="content__curso--obj">
            <i className="fa-solid fa-bullseye"></i>Leguaje SQL y bases de datos
          </p>
          <p className="content__curso--stack">
            <i className="fa-brands fa-stack-overflow"></i>SQL SERVER, Heidi SQL y MySQL
          </p>
          <p className="content__curso--resume">
            Realiza preguntas, resuelve problemas y ayuda a los demás en temas
            de base de datos
          </p>
          <Link to="/" style={{ display: 'inline-block' }} className="content__curso--btn">Ir a preguntas</Link>
        </div>
        <div className="content__curso--img even">
          <img src={ bd } />
        </div>
      </div>
    </div>
  );
};
