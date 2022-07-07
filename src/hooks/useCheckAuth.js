import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../firebase/config';
import { login, logout } from '../store/auth';
import { startLoadingPosts } from '../store/post';
import { startLoadingActiveUser, startLoadingCourses, startLoadingUsers } from '../store/user';
import { startLoadingAllComments } from '../store/comment';

export const useCheckAuth = () => {

  const { status } = useSelector((state) => state.auth);

  const { loading } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  useEffect(() => {

    onAuthStateChanged(firebaseAuth, async (user) => {
      if (!user) return dispatch( logout() );

      const { 
        uid, 
        email, 
        displayName, 
        photoURL 
      } = user;
      dispatch( login({ uid, email, displayName, photoURL }) );
      dispatch( startLoadingActiveUser(uid) );
      dispatch( startLoadingAllComments() );
      dispatch( startLoadingUsers() );
      dispatch( startLoadingPosts() );
      dispatch( startLoadingCourses() );
    });
  }, []);

  return {
    status,
    loading,
  };
};
