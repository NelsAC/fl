import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  updateEmail,
} from "firebase/auth";

import { firebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(firebaseAuth, googleProvider);

    const { displayName, email, photoURL, uid } = result.user;
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      ok: false,
      errorCode,
      errorMessage,
    };
  }
};

export const registerWithEmailAndPassword = async ({
  name,
  lastName,
  email,
  password,
}) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const { uid, photoURL } = resp.user;

    await updateProfile(firebaseAuth.currentUser, {
      displayName: `${name} ${lastName}`,
      photoURL: photoURL,
    });

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName: `${name} ${lastName}`,
    };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      ok: false,
      errorCode,
      errorMessage: "El correo ya fue registrado o no es válido.",
    };
  }
};

export const signInWithEmailPassword = async ({ email, password }) => {
  try {
    const resp = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const { uid, photoURL, displayName } = resp.user;

    return {
      ok: true,
      uid,
      photoURL,
      displayName,
      email,
    };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      ok: false,
      errorCode,
      errorMessage: "El correo o la contraseña no son correctos.",
    };
  }
};

export const logoutFirebase = async () => {
  return await firebaseAuth.signOut();
};

export const updatePhotoUser = async (photo) => {
  try {
    await updateProfile(firebaseAuth.currentUser, {
      photoURL: photo,
    });

    return {
      ok: true,
      updatedPhotoMessage: "Foto Actualizada",
      photoURL: photo,
    };
  } catch (error) {
    console.log(error.message);
  }
};

export const updateNameAndEmail = async ({ name, email }) => {

  try {
    await updateProfile(firebaseAuth.currentUser, {
      displayName: name,
    });
    await updateEmail(firebaseAuth.currentUser, email);

    return {
      updatedMessageNameAndEmail: "Datos Actualizados",
      displayName: name,
      email: email,
    };

  } catch (error) {
    console.log(error)
    return {
      updatedMessageNameAndEmail: "Datos No Actualizados"
    };
  }

};
