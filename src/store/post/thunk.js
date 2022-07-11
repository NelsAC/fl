import { doc, collection, setDoc } from 'firebase/firestore/lite';
import { firebaseDB } from '../../firebase/config';
import { addNewEmptyPost, setCurrentUserPosts, setPosts } from './postSlice';
import { loadPosts } from '../../helpers';

export const startNewPost = ({ course, title, description }) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newPost = {
      course,
      title: title.toString().toLowerCase(),
      description: description.toString().toLowerCase(),
      date: new Date().getTime(),
      uid
    };
    const newDoc = doc(collection(firebaseDB, `FL2022/fastlearning/posts`));
    newPost.postId = newDoc.id;

    await setDoc(newDoc, newPost);

    dispatch( addNewEmptyPost( newPost ) );
  };
};

export const startLoadingPosts = () => {
  return async (dispatch) => {
    const posts = await loadPosts();
    dispatch(setPosts(posts));
  };
};


export const startLoadingPostsByFilter = (uid) => {
  return async (dispatch, getState) => {
    const { posts } = getState().post;
    const filteredPosts = posts.filter(post => {
      return post.uid === uid;
    });
    dispatch(setCurrentUserPosts(filteredPosts));
  }

}