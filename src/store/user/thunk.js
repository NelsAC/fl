import { collection, doc, setDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase/config";

import { loadRegisteredUsers } from "../../helpers/loadRegisteredUsers";
import { addNewUser, setActiveUser, setUsers } from "./userSlice";


export const startNewUser = (user) => {
    return async (dispatch) => {

        const newUser = {
            ...user,
            date: new Date().getTime(),
            rol: 'iniciante',
        }
        delete newUser.ok;

        const newDoc = doc(collection(firebaseDB, `FL2022/fastlearning/Users`));
        newUser.userId = newDoc.id;

        await setDoc(newDoc, newUser);


        dispatch( addNewUser( newUser ) );
    };
}

export const startUpdatePhotoURLUser = () => {
    return async (dispatch, getState) => {
        const { photoURL } = getState().auth; 
        const { active: user } = getState().user;

        const docRef = doc( firebaseDB, `FL2022/fastlearning/Users/${user}` );
        await setDoc( docRef, { photoURL }, { merge: true } );

        const registeredUsers = await loadRegisteredUsers();

        dispatch(setUsers(registeredUsers));
    }
}

export const startUpdateNameAndEmailUser = () => {
    return async (dispatch, getState) => {
        const { displayName, email } = getState().auth; 
        const { active: user } = getState().user;

        const docRef = doc( firebaseDB, `FL2022/fastlearning/Users/${user}` );
        
        await setDoc( docRef, { displayName, email }, { merge: true } );

        const registeredUsers = await loadRegisteredUsers();

        dispatch(setUsers(registeredUsers));
    }
}

export const startLoadingUsers = () => {
    return async (dispatch) => {
        const registeredUsers = await loadRegisteredUsers();
        dispatch(setUsers(registeredUsers));
    }
}

export const startLoadingActiveUser = (userId) => {
    return async (dispatch) => {
        const activeUser = await loadRegisteredUsers();

        activeUser.forEach((user) => {
            if (user.uid === userId) {
                dispatch(setActiveUser(user.userId));
            }
        }
        )
        
    }
}