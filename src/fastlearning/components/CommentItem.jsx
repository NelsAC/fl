import TimeAgo from 'react-timeago';
import SpanishStrings from 'react-timeago/lib/language-strings/es';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

import "./styles/commentItem.css";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { UserInfoView } from '../views/UserInfoView';
import { Modal } from './Modal';
import { startBestComment, startLikeComment, startUnLikeComment } from '../../store/comment/thunk';

const formatter = buildFormatter(SpanishStrings);
const photo = 'https://res.cloudinary.com/dbmqyx6gp/image/upload/v1656033153/fastlearning/photo_ukecoh.png';

export const CommentItem = ({ comment, currentPost }) => {

  const [myPost, setMyPost] = useState(false);

  const { uid: currentUidUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if ( currentUidUser === currentPost.uid ) {
      setMyPost(true);
    }
    }, []);
  

  const [modalUserCommentInfo, setModalUserCommentInfo] = useState(false);

  const { date, commentDescription, uid, id, postId, likes, best } = comment;

  const currentUserLike = likes.some((like) => like.uid === currentUidUser);
  const { users } = useSelector((state) => state.user);

  const onModalUserCommentInfo = () => {
    setModalUserCommentInfo(true);
  }

  const onCommentLike = () => {
    dispatch( startLikeComment(postId, id) );
  }

  const onCommentUnlike = () => {
    dispatch( startUnLikeComment(postId, id) );
  }

  const onBestComment = () => {
    dispatch( startBestComment(postId, id) );
  }

  const postCommentUser = users.find((user) => user.uid === uid);


  return (
    <div className="comment">
      {
        !!currentUserLike
          ? (
              <div className="comment__like" onClick={ onCommentUnlike }>
                <i className="fa-solid fa-heart"></i>
                <span>{ likes.length }</span>
              </div>
            )
          : (
              <div className="comment__like" onClick={ onCommentLike }>
                <i className="far fa-heart"></i>
                <span>{ likes.length }</span>
              </div>
            )
      }
      <div className="comment__body">
        <div className="coment__body--header">
          <div className="comment__body--user">
            <div className="comment__body--userImg">
              <div
                className="photo-user"
                style={{
                  backgroundImage: `url(${
                    postCommentUser.photoURL === null 
                      ? photo 
                      : postCommentUser.photoURL
                  })`
                }}
              ></div>
            </div>
            <p className="comment__body--userText" onClick={onModalUserCommentInfo}>{postCommentUser.displayName}</p>
            {
              !!myPost && (
                <div className={`comment__body--userBest ${!!best ? 'best' : ''}`} onClick={ onBestComment }>
                  <i className="fa-solid fa-circle-check"></i>
                  <span>Mejor respuesta</span>
                </div>
              )
            }
            {
              ( !myPost && !!best ) && (
                <div className='comment__body--userBestExt bestExt'>
                  <i className="fa-solid fa-circle-check"></i>
                  <span>Mejor respuesta</span>
                </div>
                ) 
            }
          </div>
          <div className="comment__time">
            <i className="fa-solid fa-clock" style={{ marginRight: '6px' }}></i>
            <TimeAgo date={ date } formatter={formatter} />
          </div>
        </div>
        <div className="comment__body--description">
          <p>{commentDescription}</p>
        </div>
      </div>
      <Modal
        visible={modalUserCommentInfo}
      >
        <UserInfoView 
          autor={postCommentUser}
          setVisible={setModalUserCommentInfo}
        />
      </Modal>
    </div>
  );
};

