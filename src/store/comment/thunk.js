import {
  addNewComment,
  setAllComments,
  setBestComment,
  setComments,
  setLikes,
  setSaving,
} from './commentSlice';
import { doc, collection, setDoc } from 'firebase/firestore/lite';
import { loadAllComments, loadComments } from '../../helpers';
import { firebaseDB } from '../../firebase/config';

export const startSaveComment = ({ commentDescription }) => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { active: post } = getState().post;

    const { uid } = getState().auth;

    const newComment = {
      date: new Date().getTime(),
      uid,
      commentDescription,
      postId: post.id,
      best: false,
      likes: [],
    };

    const newDoc = doc(
      collection(firebaseDB, `FL2022/fastlearning/posts/${post.postId}/comments`)
    );
    await setDoc(newDoc, newComment);
    newComment.id = newDoc.id;

    dispatch(addNewComment(newComment));
  };
};

export const startLoadingComments = () => {
  return async (dispatch, getState) => {
    const { active: post } = getState().post;

    const comments = await loadComments(post.postId);
    dispatch(setComments(comments));
  };
};

export const startLoadingAllComments = () => {
  return async (dispatch, getState) => {
    const { posts } = getState().post;

    const allComments = [];
    posts.forEach((post) => {
      allComments.push(loadAllComments(post.postId));
    });

    const allCommentsPromise = Promise.all(allComments);
    const all = await allCommentsPromise;
    const allCommentsArray = [];
    all.forEach((comments) => {
      comments.forEach((comment) => {
        allCommentsArray.push(comment);
      });
    });
    dispatch( setAllComments(allCommentsArray) );
  };
};



// likes

export const startLikeComment = (postId, id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { comments } = getState().comment;

    const comment = comments.find((comment) => comment.id === id);

    let commentLikeArray = [];
    const newLike = {
      date: new Date().getTime(),
      uid,
    };
    
    commentLikeArray = [...comment.likes, newLike];

    const docRef = doc(
      firebaseDB, 
      `FL2022/fastlearning/posts/${postId}/comments/${id}`
    );
    await setDoc(docRef, { likes: commentLikeArray }, { merge: true });

    const data = {
      commentLikeArray,
      id,
    }

    dispatch( setLikes(data) );

}}

export const startUnLikeComment = (postId, id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { comments } = getState().comment;

    const comment = comments.find((comment) => comment.id === id);

    let commentLikeArray = [];
    commentLikeArray = comment.likes.filter((like) => like.uid !== uid);

    const docRef = doc(
      firebaseDB, 
      `FL2022/fastlearning/posts/${postId}/comments/${id}`
    );
    await setDoc(docRef, { likes: commentLikeArray }, { merge: true });

    const data = {
      commentLikeArray,
      id,
    }

    dispatch( setLikes(data) );
}}


//best comment

export const startBestComment = (postId, id) => {
  return async (dispatch, getState) => {
    const { comments } = getState().comment;
 
    const docRef = doc(
      firebaseDB, 
      `FL2022/fastlearning/posts/${postId}/comments/${id}`
    );
    await setDoc(docRef, { best: true }, { merge: true });

    const data = {
      id,
    }

    dispatch( setBestComment(data) );
}}