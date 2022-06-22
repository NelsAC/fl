import {
  logoutFirebase,
  registerWithEmailAndPassword,
  signInWithEmailPassword,
  signInWithGoogle,
} from '../../firebase/providers';
import { fileUpload } from '../../helpers';
import { setSaving } from '../learning';
import {
  checkingCredentials,
  login,
  logout,
  setUpdatePhoto,
} from './authSlice';

export const checkingAuthenticated = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await signInWithGoogle();

    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result));
  };
};

export const startCreatingUserWithEmailAndPassword = ({
  name,
  lastName,
  email,
  password,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const { ok, uid, photoURL, errorMessage, displayName } =
      await registerWithEmailAndPassword({ name, lastName, email, password });

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, photoURL, email, displayName }));
  };
};

export const startSignInWithEmailAndPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await signInWithEmailPassword({ email, password });

    if (!result.ok) return dispatch(logout(result));

    dispatch(login(result));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();
    dispatch(logout());
  };
};

export const startUpdatePhotoURL = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());

    const result = await fileUpload(files[0]);

    dispatch(setUpdatePhoto(result));
  };
};
