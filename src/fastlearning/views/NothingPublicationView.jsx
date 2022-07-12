import './styles/publication.css';
import vacio from '../../assets/images/vacio.png';

export const NothingPublicationView = () => {
  return (
   <div className="content__body--image animate__animated animate__fadeIn">
    <img src={ vacio } alt="nada por mostrar" />
    <span className='nothing'>No existen publicaciones aún!</span>
  </div> 
  )
}
