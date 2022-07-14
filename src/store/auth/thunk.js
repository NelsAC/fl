import { toast } from 'react-toastify';
import {
  logoutFirebase,
  registerWithEmailAndPassword,
  signInWithEmailPassword,
  signInWithGoogle,
  updateNameAndEmail,
} from '../../firebase/providers';
import { fileUpload } from '../../helpers';
import { loadRegisteredUsers } from '../../helpers/loadRegisteredUsers';
import { startUpdateNameAndEmailUser, startNewUser, startUpdatePhotoURLUser } from '../user';
import {
  checkingCredentials,
  login,
  logout,
  setUpdateNameAndEmail,
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

    const registeredUsers = await loadRegisteredUsers();

    const user = registeredUsers.find((user) => user.uid === result.uid);

    if (!user) {
      return dispatch( startNewUser(result) );
    }
    
    return dispatch( login(user) );
  };
};

export const startCreatingUserWithEmailAndPassword = ({
  name,
  lastName,
  email,
  password
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result =
      await registerWithEmailAndPassword({ name, lastName, email, password });

    if (!result.ok) return dispatch(logout(result.errorMessage));
    
    const registeredUsers = await loadRegisteredUsers();

    const user = registeredUsers.find((user) => user.uid === result.uid);

    if (!user) {
      return dispatch( startNewUser(result) );
    }

    return dispatch( login(user) );
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
    const result = await toast.promise(
      fileUpload(files[0]),
      {
        pending: 'Actualizando foto...',
        success: 'Foto actualizada 📷',
      });
    dispatch( setUpdatePhoto(result) );

    //actualizar photo en la bd
    dispatch( startUpdatePhotoURLUser(result.photoURL) );
  };
};

export const startUpdateNameAndEmail = ({ name, email }) => {
  return async (dispatch) => {
    const result = await toast.promise(
      updateNameAndEmail({ name, email }),
      {
        pending: 'Actualizando datos..',
        success: 'Datos actualizados 👌',
      });

    dispatch( setUpdateNameAndEmail(result) );
    
    //actualizar datos en la bd
    dispatch( startUpdateNameAndEmailUser({ name, email }) );

  };
}