import { useState } from 'react';
import { Link } from 'react-router-dom';

import './sidebar.css';
import logo from '../../assets/images/logo.png';
import logoMobile from '../../assets/images/logomobile.png';
import photo from '../../assets/images/photo.png';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../store/auth';
import { Modal } from './Modal';
import { NewPostView, UpdateProfileView } from '../views';

export const Sidebar = () => {

  const [modalProfile, setModalProfile] = useState(false);

  const [modalNewPost, setModalNewPost] = useState(false);

  const dispatch = useDispatch();
  const { photoURL, displayName, email } = useSelector(state => state.auth);

  const { messageSaved, nameUser } = useSelector((state) => state.user);


  const onLogout = () => {
    dispatch( startLogout() );
  }

  const onModalProfile = () => {
    setModalProfile(true);
  }

  const onModalNewPost = () => {
    setModalNewPost(true);
  }

  return (
    <>
      <header className="header__mobile">
        <div className="header__mobile--logo">
          <img src={ logo } alt="logo" />
        </div>
      </header>
      <aside className="navigation">
        <div className="navigation__header">
          <div className="navigation__header--barra">
            <img src={ logoMobile } alt="logo" />
            <p onClick={ onLogout }>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </p>
          </div>
          <div className="navigation__header--profile">
            <div className="navigation__header--photo">
              {
                photoURL === null
                  ? <img src={ photo } alt="foto" />
                  : <img src={ photoURL } alt="foto" />
              }
            </div>
            <div className="navigation__header--name">
              {
                messageSaved.length > 0
                  ? <h2>{ nameUser }</h2>
                  : <h2>{ displayName }</h2>
              }
              <h3>{ email }</h3>
            </div>
            <div className="navigation__header--rol">
              <h4>
                <i className="fa-solid fa-graduation-cap"></i>Estudiante
              </h4>
              <h4>
                <i className="fa-solid fa-person-chalkboard"></i>Tutor
              </h4>
            </div>
          </div>
        </div>
        <div className="navigation__body">
          <div className="navigation__body--list">
            <Link className="navigation__body--item active" to="/">
              <i className="fa-solid fa-home"></i>
              <p>Inicio</p>
            </Link>
            <span className="navigation__body--item" onClick={ onModalProfile }>
              <i className="fa-solid fa-user"></i>
              <p>Perfil</p>
            </span>
            <Link className="navigation__body--item" to="/cursos">
              <i className="fa-solid fa-book"></i>
              <p>Cursos</p>
            </Link>
            <span className="navigation__body--item" onClick={ onModalNewPost }>
              <i className="fa-regular fa-square-plus"></i>
              <p>Publicar</p>
            </span>
          </div>
        </div>
      </aside>
      <Modal 
        title="Actualizar perfil"
        visible={ modalProfile }
        setVisible={ setModalProfile }
      >
        <UpdateProfileView  
          photoFB={ photoURL }
          setVisible={ setModalProfile }
        />
      </Modal>
      <Modal 
        title="Nueva Publicación"
        visible={ modalNewPost }
        setVisible={ setModalNewPost }
      >
        <NewPostView
          setVisible={ setModalNewPost }
        />
      </Modal>
    
    </>
  );
};
