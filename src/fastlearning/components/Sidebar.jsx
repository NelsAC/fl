import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startLogout, startUpdatePhotoURL } from "../../store/auth";
import { NewPostView, UpdateProfileView } from "../views";
import { Modal } from "./";

import "./styles/sidebar.css";

import logo from "../../assets/images/logo.png";
import logoMobile from "../../assets/images/logomobile.png";
import { setClearLogoutUser } from "../../store/user";
import { setClearLogoutPosts } from "../../store/post";
import { setClearLogoutComments } from "../../store/comment";
import { RolUser } from "./RolUser";
import { Porgress } from "./Porgress";

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
      <header className="header__mobile">
        <div className="header__mobile--logo">
          <img src={ logo } alt="logo" />
        </div>
        <RolUser />
      </header>
      <aside className="navigation animate__animated animate__fadeIn">
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
                <div className="photo-user"
                  style={{
                    backgroundImage: `url(${
                      updatedMessage === null && photoURL === null ? photo : photoURL
                    }; )`,
                  }}
                >
                </div>
              }
            </div>
            <i
              className="fa-solid fa-upload"
              onClick={() => fileInputRef.current.click()}
            ></i>
            <input
              ref={fileInputRef}
              type="file"
              className="upload"
              onChange={onFileInputChange}
            />
            <div className="navigation__header--name">
              <h2>{ displayName }</h2>
              <h3>{ email }</h3>
            </div>
            <div className="navigation__header--rol">
              <RolUser />
            </div>
          </div>
        </div>
        <div className="navigation__body">
          <div className="navigation__body--list">
            <Link className="navigation__body--item" to="/">
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
            <span className="navigation__body--item" onClick={onModalNewPost}>
              <i className="fa-regular fa-square-plus"></i>
              <p>Publicar</p>
            </span>
            <span className="navigation__body--item mobile-nav">
            <i className="fa-solid fa-circle-notch"></i>
            </span>
          </div>
          <div className="progress__section">
          <Porgress />
          </div>
        </div>
      </aside>
      <Modal
        title="Actualizar perfil"
        visible={modalProfile}
        setVisible={setModalProfile}
      >
        <UpdateProfileView setVisible={setModalProfile} />
      </Modal>
      <Modal
        title="Nueva Publicación"
        visible={modalNewPost}
        setVisible={setModalNewPost}
      >
        <NewPostView setVisible={setModalNewPost} />
      </Modal>
    </>
  );
};
