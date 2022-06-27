import { useDispatch, useSelector } from 'react-redux';
import { getPostsByWord } from '../../helpers';
import { useForm } from '../../hooks';
import { startLoadingAllComments } from '../../store/comment';

import { CheckingAuth } from '../../ui/components/CheckingAuth';
import { FastLearningLayout } from '../layout/FastLearningLayout';

import {
  NavBarInicioView,
  NothingPublicationView,
  PublicationView,
} from "../views";

//buscar
const initialState = {
  search: "",
}

export const FastLearningPage = () => {
  const dispatch = useDispatch();

  const { loading, posts, currentUserPosts } = useSelector( (state) => state.post );

  const { loadingUsers } = useSelector( (state) => state.user );

  const { loadingAllComments } = useSelector( (state) => state.comment );

  const { search, onInputChange } = useForm(initialState);


  const filteredPosts = getPostsByWord( posts, search );

  let filteredPostsAll = [];
  

  if ( !!loading || !!loadingUsers || !!loadingAllComments ) {
    return <CheckingAuth />;
  }

  
  // dispatch( startLoadingAllComments() );

  if( filteredPosts.length > 0 && (currentUserPosts === null  ) ) {
    filteredPostsAll.push(...filteredPosts);
  }

  if( currentUserPosts !== null ) {
    filteredPostsAll.push(...currentUserPosts);
  }

  return (
    <FastLearningLayout>
      <NavBarInicioView search={ search } onInputChange={ onInputChange } />
      <div className="content__body">
        {
          ( filteredPostsAll.length > 0 )
            ? ( filteredPostsAll.map((post) => 
                <PublicationView 
                  key={post.postId} 
                  post={post} 
                />)
              )
            : ( <NothingPublicationView /> )
        }
      </div>
    </FastLearningLayout>
  );
};
