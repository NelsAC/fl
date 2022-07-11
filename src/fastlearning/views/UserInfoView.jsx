import { useSelector } from "react-redux";
import { RolUser } from "../components/RolUser";

import './styles/userInfo.css';


export const UserInfoView = ({autor, setVisible}) => {
  
  const { posts } = useSelector((state) => state.post);
  const { countBestAnswer } = useSelector((state) => state.user);
  const { uid: currentUserId } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comment);

  const { 
    date: registerDate, 
    uid, 
    displayName, 
    photoURL, 
    rol, 
    email 
  } = autor;

  const postsUser = [];
  posts.map((post) => {
    if(post.uid === uid) {
      postsUser.push(post);
    }
  });
  
  let countBestAnswerUser = 0;

  if ( currentUserId === uid ) {
    countBestAnswerUser = countBestAnswer;
  } else {
    const commentsUser = [];
    comments.map( comment => {
      if ( comment.uid === uid ) {
        commentsUser.push(comment);
      }
    })
    commentsUser.map( comment => {
      if ( comment.best === true ) {
        countBestAnswerUser++;
      }
    })
  }

  return (
    <div className='modal__user--info'>
      <div className="modal__user--photo">
        <div
          className="photo-user"
          style={{ backgroundImage: `url(${ photoURL })` }}
        ></div>
      </div>
      <div className="modal__user--rol">
        <RolUser />
      </div>
      <div className="modal__user--data">
        <div className="modal__data--resumen">
          <span>{ postsUser.length }</span>
          <p>publicaciones</p>
        </div>
        <div className="modal__data--resumen">
          <span>{countBestAnswerUser}</span>
          <p>mejores respuestas</p>
        </div>
      </div>
      <div className="modal__user--name">
        <p>{ displayName }</p>
        <span>{ email }</span>
        <span className="register-date">
          Se unió el 
          {
            ` ${new Date(registerDate).getDate()}/${
              new Date(registerDate).getMonth() + 1
            }/${new Date(registerDate).getFullYear()}`
          }
        </span>
      </div>
      <button className="modal__user--btn">
        Contactar
      </button>

      <span 
        className="modal__close--userInfo"
        onClick={ () => setVisible(false) }
      >
        &times;
      </span>
    </div>
  );
}
