import './styles/publication.css';
import vacio from '../../assets/images/vacio.png';

export const NothingPublicationView = () => {
  return (
   <div className="content__body--image">
    <img src={ vacio } alt="nada por mostrar" />
    <span>No existen publicaciones aún!</span>
  </div> 
  )
}
