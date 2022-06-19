import { doc, collection, setDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase/config";
import { addNewEmptyPost, setActivePost } from "./learningSlice";
import { loadPosts } from "../../helpers";

export const startNewPost = ({course, title, description}) => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;
        
        const newPost = {
            course,
            title,
            body: description,
            date: new Date().getTime(),
        }

        const newDoc = doc( collection( firebaseDB, `${ uid }/learning/posts` ) );
        await setDoc( newDoc, newPost );

        newPost.id = newDoc.id;

        dispatch( addNewEmptyPost( newPost ) );
        dispatch( setActivePost( newPost ) );
        
    }
}

export const startLoadingPosts = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if ( !uid ) throw new Error('El UID no existe');

        await loadPosts( uid );

    }
}