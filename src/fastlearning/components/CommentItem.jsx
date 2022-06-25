import TimeAgo from 'react-timeago';
import SpanishStrings from 'react-timeago/lib/language-strings/es';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

import "./styles/commentItem.css";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { UserInfoView } from '../views/UserInfoView';
import { Modal } from './Modal';

const formatter = buildFormatter(SpanishStrings);
const photo = 'https://res.cloudinary.com/dbmqyx6gp/image/upload/v1656033153/fastlearning/photo_ukecoh.png';

export const CommentItem = ({ comment }) => {

  const [modalUserInfo, setModalUserInfo] = useState(false);

  const { date, commentDescription, uid } = comment;

  const { users } = useSelector((state) => state.user);

  const onModalUserCommentInfo = () => {
    setModalUserInfo(true);
  }

  const onModalUserInfo = () => {
    setModalUserInfo(true);
  };

  const postUser = users.find((user) => user.uid === uid);

  return (
    <div className="comment">
      <div className="comment__like">
        <i className="fa-solid fa-heart"></i>
        <span>0</span>
      </div>
      <div className="comment__body">
        <div className="coment__body--header">
          <div className="comment__body--user">
            <div className="comment__body--userImg">
              <div
                className="photo-user"
                style={{
                  backgroundImage: `url(${
                    postUser.photoURL === null 
                      ? photo 
                      : postUser.photoURL
                  })`
                }}
              ></div>
            </div>
            <p className="comment__body--userText" onClick={onModalUserCommentInfo}>{postUser.displayName}</p>
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
        title="Nombre del usuario"
        visible={modalUserInfo}
        setVisible={setModalUserInfo}
      >
        <UserInfoView displayName="desde los comments" />
      </Modal>
    </div>
  );
};
