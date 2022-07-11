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
import { startUpdateNameAndEmailUser, setUsers, startLoadingActiveUser, startNewUser, startUpdatePhotoURLUser } from '../user';
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

    if ( registeredUsers.length > 0 ) {
      
      const stateAcc = registeredUsers.some( user => user.uid === result.uid );

      if ( stateAcc === false ) {
        dispatch(startNewUser(result));
        dispatch(startLoadingActiveUser(result.uid));
      }

    } else {
      dispatch(startNewUser(result));
    }
    
    dispatch(setUsers(registeredUsers));
    dispatch(login(result));
    dispatch(startLoadingActiveUser(result.uid));
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
    const result =
      await registerWithEmailAndPassword({ name, lastName, email, password });

    if (!result.ok) return dispatch(logout(result.errorMessage));
    
    const registeredUsers = await loadRegisteredUsers();

    if ( registeredUsers.length > 0 ) {
      const stateAcc = registeredUsers.some( user => user.uid === result.uid );

      if ( stateAcc === false ) {
        dispatch(startNewUser(result));
        dispatch(startLoadingActiveUser(result.uid));
      }
    } else {
      dispatch(startNewUser(result));
    }

    dispatch(setUsers(registeredUsers));
    dispatch(login(result));
    dispatch(startLoadingActiveUser(result.uid));
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
    dispatch( startUpdatePhotoURLUser() ); 
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
    dispatch( startUpdateNameAndEmailUser() );

  };
};