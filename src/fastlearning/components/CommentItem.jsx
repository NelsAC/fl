import React from "react";

import photo from '../../assets/images/photo.png';
import './comment.css';

export const CommentItem = ({ comment }) => {

  const { displayName, date, body: description, photoURL } = comment;

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
                style={{ backgroundImage: `url(${ ( photoURL === null ) ? photo : photoURL })` }}
              ></div>
            </div>
            <p className="comment__body--userText">{ displayName }</p>
          </div>
          <div className="comment__time">
            <i className="fa-solid fa-clock"></i>
            <span>{ date }</span>
          </div>
        </div>
        <div className="comment__body--description">
          <p>{ description }</p>
        </div>
      </div>
    </div>
  );
};
