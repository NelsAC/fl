import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../hooks';
import { startUpdateNameAndEmail } from '../../store/auth';
import { RolUser } from '../components/RolUser';

import './styles/profile.css';

const formValidations = {
  name: [ (value) => value.length >= 3, 'El nombre debe tener almenos 3 caracteres.' ],
  email: [ (value) => value.includes('@'), 'El email debe tener una @.' ]
}

export const UpdateProfileView = ({ setVisible }) => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false)

  const { displayName: currentName, email: currentEmail } = useSelector((state) => state.auth);


  const { 
    name, 
    email, 
    onInputChange, 
    nameValid,
    formState,
    emailValid,
    isFormValid 
  } = useForm({
    name: currentName,
    email: currentEmail,
  }, formValidations);

  const onSubmit = (e) => {
    e.preventDefault();
    document.getElementById("modalChild").parentElement.classList.remove("animate__fadeInDown");
    document.getElementById("modalChild").parentElement.classList.add("animate__backOutUp");
    setFormSubmitted(true)
    if ( !isFormValid ) return;
    dispatch( startUpdateNameAndEmail( formState ) );
    setTimeout(() => {
      setVisible(false);
    }, 500);
  }

  return (
    <div id="modalChild">
      <div className="modal__content--rol">
        <RolUser />
      </div>
      <div className="modal__content--body profile__body">
        <form action="#" onSubmit={ onSubmit }>
          <div className="form__group">
            <label className="form__group--label" htmlFor="nombre">
              Nombres y Apellidos
            </label>
            {
              ( formSubmitted && !!nameValid ) ? (
                <div className="error-message">
                  { nameValid }
                </div>
              ) : null
            }
            <input
              className="form__group--text"
              type="text"
              name="name"
              value={ name }
              onChange={ onInputChange }
            />
          </div>

          <div className="form__group">
            <label className="form__group--label" htmlFor="correo">
              Correo
            </label>
            {
              ( formSubmitted && !!emailValid ) ? (
                <div className="error-message">
                  { emailValid }
                </div>
              ) : null
            }
            <input
              className="form__group--text"
              type="email"
              name="email"
              value={ email }
              onChange={ onInputChange }
            />
          </div>

          <div className="form__submit">
            <button className="btn form__submit--btn" type="submit">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
