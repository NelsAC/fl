import { useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout, startUpdatePhotoURL } from '../../store/auth';
import { NewPostView, UpdateProfileView } from '../views';
import { Modal, RolUser, Porgress } from './';

import './styles/sidebar.css';

import logo from '../../assets/images/logo.png';
import logoMobile from '../../assets/images/logomobile.png';
import { setClearLogoutUser } from '../../store/user';
import { setClearLogoutPosts } from '../../store/post';
import { setClearLogoutComments } from '../../store/comment';
import { CourseIcon, DashIcon, HomeIcon, LogoutIcon, PostIcon, ProfileIcon, UploadIcon } from '../../assets/icons';

const photo = 'https://res.cloudinary.com/dbmqyx6gp/image/upload/v1656033153/fastlearning/photo_ukecoh.png';

export const Sidebar = () => {
  const fileInputRef = useRef();
  const dispatch = useDispatch();

  const [modalProfile, setModalProfile] = useState(false);
  const [modalNewPost, setModalNewPost] = useState(false);

  const { photoURL, displayName, email, updatedMessage } = useSelector((state) => state.auth);

  // salir de la app
  const onLogout = () => {
    dispatch( setClearLogoutUser() );
    dispatch( setClearLogoutPosts() );
    dispatch( setClearLogoutComments() );
    dispatch( startLogout() );
  };

  // abrir modal para perfil
  const onModalProfile = () => {
    setModalProfile(true);
  };

  // abrir modal para nuevo post
  const onModalNewPost = () => {
    setModalNewPost(true);
  };


  // cambiar foto perfil
  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;

    dispatch(startUpdatePhotoURL(target.files));
  };

  return (
    <>
      <header className='header__mobile'>
        <div className='header__mobile--logo'>
          <img src={ logo } alt='logo' />
        </div>
        <RolUser />
      </header>
      <aside className='navigation'>
        <div className='navigation__header'>
          <div className='navigation__header--barra'>
            <img src={ logoMobile } alt='logo' />
            <div onClick={ onLogout } className='logout-icon'>
              <LogoutIcon />
            </div>
          </div>
          <div className='navigation__header--profile'>
            <div className='navigation__header--photo'>
              {
                <div className='photo-user'
                  style={{
                    backgroundImage: `url(${
                      updatedMessage === null && photoURL === null ? photo : photoURL
                    }; )`,
                  }}
                >
                </div>
              }

              <div className='upload-icon' onClick={() => fileInputRef.current.click()} >
                <UploadIcon />
              </div>
              <input
                ref={fileInputRef}
                type='file'
                className='upload'
                onChange={ onFileInputChange }
              />
            </div>
            
            <div className='navigation__header--name'>
              <h2>{ displayName }</h2>
              <h3>{ email }</h3>
            </div>
            <div className='navigation__header--rol'>
              <RolUser />
            </div>
          </div>
        </div>
        <div className='navigation__body'>
          <div className='navigation__body--list'>
            <NavLink className='navigation__body--item' to='/'>
              <HomeIcon />
              <p>Inicio</p>
            </NavLink>
            {
              email === 'admin@gmail.com'
                ? (
                  <NavLink className='navigation__body--item' to='/admin'>
                    <DashIcon />
                    <p>Dashboard</p>
                  </NavLink>
                )
                : (
                  <span className='navigation__body--item' onClick={ onModalProfile }>
                    <ProfileIcon />
                    <p>Perfil</p>
                  </span>
                )
            }
            <NavLink className='navigation__body--item' to='/cursos'>
              <CourseIcon />
              <p>Cursos</p>
            </NavLink>
            <span className='navigation__body--item' onClick={onModalNewPost}>
              <PostIcon />
              <p>Publicar</p>
            </span>
            <span className='navigation__body--item mobile-nav'>
            <i className='fa-solid fa-circle-notch'></i>
            </span>
          </div>
          <div className='progress__section'>
            <Porgress />
          </div>
        </div>
      </aside>
      <Modal
        title='Actualizar perfil'
        visible={modalProfile}
        setVisible={setModalProfile}
      >
        <UpdateProfileView setVisible={setModalProfile} />
      </Modal>
      <Modal
        title='Nueva Publicación'
        visible={modalNewPost}
        setVisible={setModalNewPost}
      >
        <NewPostView setVisible={setModalNewPost} />
      </Modal>
    </>
  );
};
