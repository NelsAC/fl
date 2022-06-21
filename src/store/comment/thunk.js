import {
  addNewComment,
  setAllComments,
  setComments,
  setSaving,
} from "./commentSlice";
import { doc, collection, setDoc } from "firebase/firestore/lite";
import { loadAllComments, loadComments } from "../../helpers";
import { firebaseDB } from "../../firebase/config";

export const startSaveComment = ({ commentDescription }) => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { active: post } = getState().learning;

    const { uid, displayName, photoURL } = getState().auth;

    const newComment = {
      date: new Date().getTime(),
      uid,
      displayName,
      body: commentDescription,
      photoURL,
      postId: post.id,
    };

    const newDoc = doc(
      collection(firebaseDB, `FL2022/learning/posts/${post.id}/comments`)
    );
    await setDoc(newDoc, newComment);
    newComment.id = newDoc.id;

    dispatch(addNewComment(newComment));
  };
};

export const startLoadingComments = () => {
  return async (dispatch, getState) => {
    const { active: post } = getState().learning;

    const comments = await loadComments(post.id);
    dispatch(setComments(comments));
  };
};

export const startLoadingAllComments = () => {
  return async (dispatch, getState) => {
    const { posts } = getState().learning;

    const allComments = [];
    posts.forEach((post) => {
      allComments.push(loadAllComments(post.id));
    });

    const allCommentsPromise = Promise.all(allComments);
    const all = await allCommentsPromise;
    const allCommentsArray = [];
    all.forEach((comments) => {
      comments.forEach((comment) => {
        allCommentsArray.push(comment);
      });
    });
    dispatch(setAllComments(allCommentsArray));
  };
};
