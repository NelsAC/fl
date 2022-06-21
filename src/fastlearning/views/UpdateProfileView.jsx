
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks";
import { startUpdateUser } from "../../store/user/thunk";

import "./styles/profile.css";
import photo from "../../assets/images/photo.png";
import { useRef } from "react";
import { startUpdatePhotoURL } from "../../store/auth";

export const UpdateProfileView = ({ photoFB, setVisible }) => {

  const fileInputRef = useRef();


  const { displayName, email: emailUser } = useSelector((state) => state.auth);
  let { nameUser } = useSelector((state) => state.user);

  if (nameUser === undefined) {
    nameUser = displayName;
  }else{
    nameUser = nameUser;
  }
  

  const dispatch = useDispatch();

  const { 
    name,
    email, 
    onInputChange,
  } = useForm(
    {
      name: nameUser,
      email: emailUser,
    },
  );

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch( startUpdateUser({name}) );
    setVisible(false);
  }

  const onFileInputChange = ({ target }) => {

    if ( target.files === 0 ) return;

    dispatch( startUpdatePhotoURL( target.files ) );
  }


  return (
    <>
      <div className="modal__content--photo">
        <div
          className="photo-user"
          style={{
            backgroundImage: `url(${photoFB === null ? photo : photoFB})`,
          }}
        ></div>
        <input
          type="file"
          className="upload"
          ref={ fileInputRef }
          onChange={ onFileInputChange }
        />
        <div className="upload-label" onClick={ ()=> fileInputRef.current.click() }>
          <i className="fa-solid fa-camera"></i>
        </div>
      </div>
      <div className="modal__content--rol">
        <i className="fa-solid fa-graduation-cap"></i>
        <i className="fa-solid fa-person-chalkboard"></i>
      </div>
      <div className="modal__content--body profile__body">
        <form action="#" onSubmit={ onSubmit }>
          <div className="form__group">
            <label className="form__group--label" htmlFor="nombre">
              Nombres y Apellidos
            </label>
            <input
              className="form__group--text"
              type="text"
              name="name"
              value={name}
              onChange={onInputChange}
            />
          </div>

          <div className="form__group">
            <label className="form__group--label" htmlFor="correo">
              Correo
            </label>
            <input
              className="form__group--text"
              type="email"
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </div>

          <div className="form__submit">
            <button className="btn form__submit--btn" type="submit">Guardar</button>
          </div>
        </form>
      </div>
    </>
  );
};
