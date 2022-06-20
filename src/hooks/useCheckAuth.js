import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../firebase/config';
import { login, logout } from '../store/auth';
import { startLoadingPosts } from "../store/learning";
import { startLoadingComments } from "../store/comment";


export const useCheckAuth = () => {
    const { status } = useSelector( state => state.auth );

    const { loading } = useSelector( state => state.learning );

    const dispatch = useDispatch();
  
    useEffect(() => {
      onAuthStateChanged( firebaseAuth, async user => {
        if (!user) return dispatch( logout() );
  
        const { uid, email, displayName, photoURL } = user;
        dispatch( login({ uid, email, displayName, photoURL }) );
        dispatch( startLoadingPosts() );
      })
    }, [])

    return {
      status,
      loading
    };
}
