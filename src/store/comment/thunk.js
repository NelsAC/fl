import { addNewComment, setComments, setSaving } from "./commentSlice";
import { doc, collection, setDoc } from "firebase/firestore/lite";
import { loadComments } from "../../helpers/loadComments";
import { firebaseDB } from "../../firebase/config";

export const startSaveComment = ({commentDescription}) => {
    return async (dispatch, getState) => {

        dispatch( setSaving() );

        const { active: post } = getState().learning;

        const { uid, displayName, photoURL } = getState().auth;

        const newComment = {
            date: new Date().getTime(),
            uid,
            displayName,
            body: commentDescription,
            photoURL,
        }

        const newDoc = doc( collection( firebaseDB, `FL2022/learning/posts/${ post.id }/comments` ) );
        await setDoc( newDoc, newComment );
        newComment.id = newDoc.id;

        dispatch( addNewComment( newComment ) );
    }
}

export const startLoadingComments = () => {
    return async (dispatch, getState) => {
        const { active: post } = getState().learning;

        const comments = await loadComments(post.id);
        dispatch( setComments( comments ) );
    }
}
