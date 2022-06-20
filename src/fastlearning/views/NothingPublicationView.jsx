import vacio from '../../assets/images/vacio.png';
import './styles/publication.css';

export const NothingPublicationView = () => {
  return (
   <div className="content__body--image">
    <img src={ vacio } alt="nada por mostrar" />
    <span>No tienes publicaciones aún!</span>
  </div> 
  )
}
