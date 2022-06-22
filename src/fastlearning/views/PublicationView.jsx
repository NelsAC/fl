import { useMemo } from 'react';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePost } from '../../store/learning';
import { setActiveComments } from '../../store/comment';

import './styles/publication.css';
import photo from '../../assets/images/photo.png';

export const PublicationView = ({ post }) => {

  const dispatch = useDispatch();

  const { comments } = useSelector((state) => state.comment);
  
  const { 
    title = '', 
    course, 
    body: description, 
    date, 
    displayName, 
    id, 
    photoURL
  } = post;

  const onClickPost = () => {
    dispatch( setActivePost(post) );
    dispatch( setActiveComments() );
  };

  const dateBefore = useMemo(() => {
    return new Date().getHours() - new Date( date ).getHours();
  }, [date]);

  const newTitle = useMemo(() => {
    return title.length > 50 ? title.substring(0, 50) + '...' : title;
  }, [title]);

  const newDescription = useMemo( () => {
    return description.length > 150
      ? description.substring(0, 150) + "..."
      : description;
  }, [description]);

  let courseIcon = "";
  switch (course) {
    case "programación":
      courseIcon = "fa-solid fa-code";
      break;
    case "diseño":
      courseIcon = "fa-solid fa-compass-drafting";
      break;
    case "datos":
      courseIcon = "fa-solid fa-database";
      break;
  }

  return (
    <div className="content__body--publications" onClick={onClickPost}>
      <Link className="content__publication" to={`/post/${id}`}>
        <h2 className="content__publication--title">{newTitle}</h2>
        <p className="content__publication--description">{newDescription}</p>
        <div className="content__publication--info">
          <div className="publication__info--curso">
            <i className={`${courseIcon}`}></i>
            <span>{course}</span>
          </div>
          <div className="publication__info--comment">
            <i className="fa-solid fa-comment"></i>
            <span>
              {comments.filter((comment) => comment.postId === id).length}
            </span>
          </div>
          <div className="publication__info--time">
            <i className="fa-solid fa-clock"></i>
            {/* <span>Hace 4 horas</span> */}
            <span>{`Hace ${dateBefore} ${
              dateBefore !== 1 ? "horas" : "hora"
            }`}</span>
          </div>
          <div className="publication__info--user">
            <div className="foro__header--userImg">
              <div
                className="photo-user"
                style={{
                  backgroundImage: `url(${
                    photoURL === null ? photo : photoURL
                  })`,
                }}
              ></div>
            </div>
            <span>{displayName}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};
