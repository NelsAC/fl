import { useMemo } from 'react';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TimeAgo from 'react-timeago';
import SpanishStrings from 'react-timeago/lib/language-strings/es';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

import { setActivePost } from '../../store/post';
// import { setActiveComments } from '../../store/comment';

import './styles/publication.css';

const formatter = buildFormatter(SpanishStrings);
const photo = 'https://res.cloudinary.com/dbmqyx6gp/image/upload/v1656033153/fastlearning/photo_ukecoh.png';

export const PublicationView = ({ post }) => {
  // El post viene de pages/ FastLearningPage

  const dispatch = useDispatch();

  const { comments } = useSelector((state) => state.comment);
  const { users } = useSelector((state) => state.user);

  const { title = '', course, description, date, postId, uid } = post;

  const onClickPost = () => {
    dispatch(setActivePost(post));
    // dispatch(setActiveComments());
  };

  const newTitle = useMemo(() => {
    return title.length > 50 ? title.substring(0, 50) + '...' : title;
  }, [title]);

  const newDescription = useMemo(() => {
    return description.length > 150
      ? description.substring(0, 150) + '...'
      : description;
  }, [description]);

  let courseIcon = '';
  switch (course) {
    case 'programación':
      courseIcon = 'fa-solid fa-code';
      break;
    case 'diseño':
      courseIcon = 'fa-solid fa-compass-drafting';
      break;
    case 'datos':
      courseIcon = 'fa-solid fa-database';
      break;
  }

  const postUser = users.find((user) => user.uid === uid);

  return (
    <div className='content__body--publications animate__animated animate__fadeIn' onClick={onClickPost}>
      <Link className='content__publication' to={`/post/${postId}`}>
        <h2 className='content__publication--title'>{newTitle}</h2>
        <p className='content__publication--description'>{newDescription}</p>
        <div className='content__publication--info'>
          <div className='publication__info--curso'>
            <i className={`${courseIcon}`}></i>
            <span>{course}</span>
          </div>
          <div className='publication__info--comment'>
            <i className='fa-solid fa-comment'></i>
            <span>
              {comments.filter((comment) => comment.postId === postId).length}
            </span>
          </div>
          <div className='publication__info--time'>
            <i className='fa-solid fa-clock' style={{ marginRight: '6px' }}></i>
            <TimeAgo date={ date } formatter={formatter} />
          </div>
            {
              !!postUser && (
                <div className='publication__info--user'>
                  <div className='foro__header--userImg'>
                    <div
                      className='photo-user'
                      style={{
                        backgroundImage: `url(${
                          postUser.photoURL === null ? photo : postUser.photoURL
                        })`,
                      }}
                    ></div>
                  </div> 
                  <span>{postUser.displayName}</span>
                </div>
              )
            }
        </div>
      </Link>
    </div>
  );
};
