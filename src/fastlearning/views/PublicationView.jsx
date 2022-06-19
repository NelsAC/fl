import './publication.css';

export const PublicationView = () => {
  return (
    <div className="content__body--publications">
    <a className="content__publication" href="foro.html">
      <h2 className="content__publication--title">Pregunta</h2>
      <p className="content__publication--description">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Molestiae ipsum, nobis amet officia quasi, corrupti eum, est iste
        facilis rerum nostrum repudiandae natus expedita voluptates fugit.
        Maxime accusamus error expedita...
      </p>
      <div className="content__publication--info">
        <div className="publication__info--curso">
          <i className="fa-solid fa-code"></i>
          <span>programación</span>
        </div>
        <div className="publication__info--comment">
          <i className="fa-solid fa-comment"></i>
          <span>2</span>
        </div>
        <div className="publication__info--time">
          <i className="fa-solid fa-clock"></i>
          <span>Hace 4 horas</span>
        </div>
        <div className="publication__info--user">
          <i className="fa-solid fa-user"></i>
          <span>Usuario</span>
        </div>
      </div>
    </a>
  </div>
  )
}
