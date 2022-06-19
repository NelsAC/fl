import { useMemo, useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailAndPassword } from "../../store/auth/thunk";

const formData = {
  name: "",
  lastName: "",
  email: "",
  password: ""
}

const formValidations = {
  name: [ (value) => value.length >= 3, 'El nombre debe tener almenos 3 caracteres.' ],
  lastName: [ (value) => value.length >= 3, 'El apellido debe tener almenos 3 caracteres.' ],
  email: [ (value) => value.includes('@'), 'El email debe tener una @.' ],
  password: [ (value) => value.length >= 5, 'La contraseña debe tener almenos 5 caracteres.' ]
}

export const RegisterPage = () => {

  const { status, errorMessage } = useSelector( state => state.auth );

  const [formSubmitted, setFormSubmitted] = useState(false)

  const dispatch = useDispatch();

  const {
    name,
    lastName,
    email,
    password,
    onInputChange,
    formState,
    isFormValid,
    nameValid,
    lastNameValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  const isAuthenticating = useMemo( ()=> status === "checking", [status] );

  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if( !isFormValid ) return;

    dispatch( startCreatingUserWithEmailAndPassword(formState) )

  }

  return (
    <AuthLayout title='register'>
      <form action="/" className="form animate__animated animate__fadeIn" onSubmit={ onSubmit }>
        <label htmlFor="nombre" className="label">
          Nombre
        </label>
        {
          ( formSubmitted && !!nameValid ) ? (
            <div className="error-message">
              { nameValid }
            </div>
          ) : null
        }
        <input
          type="text"
          id="nombre"
          placeholder="fast"
          className={`input input-email ${(!!nameValid && formSubmitted) && 'input-error-active'}`}
          name="name"
          value={ name }
          onChange={ onInputChange }
        />

        <label htmlFor="apellido" className="label">
          Apellido
        </label>
        {
          ( formSubmitted && !!lastNameValid ) ? (
            <div className="error-message">
              { lastNameValid }
            </div>
          ) : null
        }
        <input
          type="text"
          id="apellido"
          placeholder="learning"
          className={`input input-email ${(!!lastNameValid && formSubmitted) && 'input-error-active'}`}
          name="lastName"
          value={ lastName }
          onChange={ onInputChange }
          
        />

        <label htmlFor="email" className="label">
          Email
        </label>
        {
          ( formSubmitted && !!emailValid ) ? (
            <div className="error-message">
              { emailValid }
            </div>
          ) : null
        }
        <input
          type="text"
          id="email"
          placeholder="Fastlearning@gmail.com"
          className={`input input-email ${(!!emailValid && formSubmitted) && 'input-error-active'}`}
          name="email"
          value={ email }
          onChange={ onInputChange }
        />

        <label htmlFor="password" className="label">
          Password
        </label>
        {
          ( formSubmitted && !!passwordValid ) ? (
            <div className="error-message">
              { passwordValid }
            </div>
          ) : null
        }
        <input
          type="password"
          id="password"
          placeholder="*********"
          className={`input input-password ${(!!passwordValid && formSubmitted) && 'input-error-active'}`}
          name="password"
          value={ password }
          onChange={ onInputChange }
        />

        <div 
          className="alert-firebase" 
          style={ { display: !!errorMessage ? '' : 'none' } }
        >
         <i className="fa-solid fa-circle-exclamation"></i>{ errorMessage }
        </div>

        <input
          type="submit"
          value="Registrarme"
          disabled={ isAuthenticating }
          className="primary-button register-button"
        />
      </form>

      <Link to="/auth/login" className="secondary-button signup-button">
        Iniciar Sesión
      </Link>
    </AuthLayout>
  );
};
