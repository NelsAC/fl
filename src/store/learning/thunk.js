import { doc, collection, setDoc } from 'firebase/firestore/lite';
import { firebaseDB } from '../../firebase/config';
import { addNewEmptyPost, setPosts } from './learningSlice';
import { loadPosts } from '../../helpers';

export const startNewPost = ({ course, title, description }) => {
  return async (dispatch, getState) => {
    const { uid, displayName, photoURL } = getState().auth;

    const newPost = {
      course,
      title: title.toString().toLowerCase(),
      body: description.toString().toLowerCase(),
      date: new Date().getTime(),
      uid,
      displayName,
      photoURL,
    };
    const newDoc = doc(collection(firebaseDB, `FL2022/learning/posts`));
    await setDoc(newDoc, newPost);
    newPost.id = newDoc.id;

    dispatch(addNewEmptyPost(newPost));
  };
};

export const startLoadingPosts = () => {
  return async (dispatch, getState) => {
    const posts = await loadPosts();
    dispatch(setPosts(posts));
  };
};
