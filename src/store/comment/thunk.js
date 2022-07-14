import {
  addNewComment,
  setAllComments,
  setBestComment,
  setComments,
  setLikes,
  setSaving,
} from './commentSlice';
import { doc, collection, setDoc } from 'firebase/firestore/lite';
import { loadComments } from '../../helpers';
import { firebaseDB } from '../../firebase/config';
import { startGetBestAnswers } from '../user';
import { toast } from 'react-toastify';

export const startSaveComment = ({ commentDescription }) => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    
    const { active: post } = getState().post;

    const { uid } = getState().auth;

    const newComment = {
      date: new Date().getTime(),
      uid,
      commentDescription,
      postId: post.postId,
      best: false,
      likes: [],
    };
    
    const newDoc = doc(
      collection(firebaseDB, `FL2022/fastlearning/comments`)
      );
      newComment.commentId = newDoc.id;
      await setDoc(newDoc, newComment);

      toast.success('Comentario agregado');

    dispatch(addNewComment(newComment));
  };
};

export const startLoadingComments = () => {
  return async (dispatch, getState) => {
    const { active: post } = getState().post;
    const { comments } = getState().comment;

    const commentsArray = [];
    comments.map( comment => {
      if ( comment.postId === post.postId ) {
        commentsArray.push(comment);
      }
    });
    dispatch(setComments(commentsArray));
  };
};

export const startLoadingAllComments = () => {
  return async (dispatch, getState) => {
    const result = await loadComments();

    dispatch(setAllComments(result));
  };
};



// likes

export const startLikeComment = (commentId) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { activeComments } = getState().comment;

    const comment = activeComments.find((comment) => comment.commentId === commentId);

    let commentLikeArray = [];
    const newLike = {
      date: new Date().getTime(),
      uid,
    };
    
    commentLikeArray = [...comment.likes, newLike];

    const docRef = doc(
      firebaseDB, 
      `FL2022/fastlearning/comments/${commentId}`
    );
    const data = {
      commentLikeArray,
      commentId,
    }
    
    dispatch( setLikes(data) );
    await setDoc(docRef, { likes: commentLikeArray }, { merge: true });
}}

export const startUnLikeComment = (commentId) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { activeComments } = getState().comment;

    const comment = activeComments.find((comment) => comment.commentId === commentId);

    let commentLikeArray = [];
    commentLikeArray = comment.likes.filter((like) => like.uid !== uid);

    const docRef = doc(
      firebaseDB, 
      `FL2022/fastlearning/comments/${commentId}`
    );
    const data = {
      commentLikeArray,
      commentId,
    }

    dispatch( setLikes(data) );
    await setDoc(docRef, { likes: commentLikeArray }, { merge: true });
}}


//best comment

export const startBestComment = (commentId) => {
  return async (dispatch, getState) => {
    const { activeComments } = getState().comment;

    const comment = activeComments.find((comment) => comment.best === true);

    const data = {
      commentId,
    }
    dispatch( setBestComment(data) );

    if ( comment !== undefined ) {
      const docRef = doc(
        firebaseDB, 
        `FL2022/fastlearning/comments/${comment.commentId}`
      );
      await setDoc(docRef, { best: false }, { merge: true });
    }

    const docRef = doc(
      firebaseDB, 
      `FL2022/fastlearning/comments/${commentId}`
    );
    await setDoc(docRef, { best: true }, { merge: true });
    dispatch( startGetBestAnswers() );
}}