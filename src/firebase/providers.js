import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(firebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        // console.log({ credentials });

        const { displayName, email, photoURL, uid } = result.user;
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid,
        };

    }
    catch (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorCode,
            errorMessage,
        }
    }
}

export const registerWithEmailAndPassword = async ({ name, lastName, email, password }) => {
    try {
        const resp = await createUserWithEmailAndPassword(firebaseAuth, email, password);
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
            errorMessage: 'El correo ya fue registrado o no es válido.',
        }
    }
}

export const signInWithEmailPassword = async ({ email, password }) => {
    try {
        const resp = await signInWithEmailAndPassword(firebaseAuth, email, password);
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            uid,
            photoURL,
            displayName,
            email,
        };
    } 
    catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorCode,
            errorMessage: 'El correo o la contraseña no son correctos.',
        }
    }
}

export const logoutFirebase = async () => {
    return await firebaseAuth.signOut();
}

export const updateUserFirebase = async ({ name }) => {


    try {
        await updateProfile(firebaseAuth.currentUser, {
            displayName: name,
            });


        return {
            isSaving: true,
            messageSaved: 'Datos actualizados correctamente.',
            nameUser: name,
        };

        
    } catch (error) {

        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            isSaving: false,
            messageSaved: error.message,
        }
    }
}