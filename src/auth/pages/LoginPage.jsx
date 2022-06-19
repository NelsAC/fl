import "./login.css";
import { Link } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import GoogleButton from 'react-google-button';
import { useDispatch, useSelector } from "react-redux";
import { startGoogleSignIn, startSignInWithEmailAndPassword } from "../../store/auth";
import { useMemo } from "react";

export const LoginPage = () => {

  const { status, errorMessage } = useSelector( state => state.auth );

  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm({
    email: "",
    password: ""
  });

  const isAuthenticating = useMemo( ()=> status === "checking", [status] );

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch( startSignInWithEmailAndPassword({ email, password }) );
  }

  const onGoogleSignIn = () => {
    dispatch( startGoogleSignIn() );
  }

  return (
    <AuthLayout title="login">
      <form action="/" className="form animate__animated animate__fadeIn" onSubmit={ onSubmit }>
        <label htmlFor="email" className="label">
          Email address
        </label>
        <input
          type="text"
          id="email"
          placeholder="Fastlearning@gmail.com"
          className="input input-email"
          autoComplete="off"
          name="email"
          value={ email }
          onChange={ onInputChange }
        />

        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="*********"
          className="input input-password"
          autoComplete="off"
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
          disabled={ isAuthenticating }
          type="submit"
          value="Iniciar Sesión"
          className="primary-button login-button"
          autoComplete="off"
        />

        <GoogleButton
        style={ { width: "100%", marginBottom: "14px" } }
        onClick={ onGoogleSignIn }
        disabled={ isAuthenticating }
        />

        <Link to="/">He olvidado mi contraseña</Link>
      </form>

      <Link to="/auth/register" className="secondary-button signup-button">
        Registrarme
      </Link>
    </AuthLayout>
  );
};
