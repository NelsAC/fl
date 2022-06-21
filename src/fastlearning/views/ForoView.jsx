import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { useForm } from "../../hooks";
import { startLoadingComments, startSaveComment } from "../../store/comment";
import { CommentItem } from "../components";
import "./styles/foro.css";
import { CheckingAuth } from "../../ui/components/CheckingAuth";

import photo from "../../assets/images/photo.png";
import comilla from "../../assets/images/comillaForo.png";
import { FloatButton } from "../components/FloatButton";

export const ForoView = () => {
  const { photoURL: photoURLActualUser } = useSelector((state) => state.auth);
  const { active: post } = useSelector((state) => state.learning);
  const { comments, loadingComments } = useSelector((state) => state.comment);


  const dispatch = useDispatch();

  const { commentDescription, onInputChange } = useForm(post);

  const {
    course,
    date,
    body: description,
    title,
    displayName,
    photoURL,
  } = post;

  useEffect(() => {
    dispatch(startLoadingComments());
  }, []);

  const onSaveComment = () => {
    dispatch(startSaveComment({ commentDescription }));
  };

  const dateBefore = useMemo(() => {
    return new Date().getHours() - new Date(date).getHours();
  }, [date]);

  return (
    <>
      {!!loadingComments ? (
        <CheckingAuth />
      ) : (
        <div className="content__body--foro animate__animated animate__fadeIn">
          <FloatButton />
          <div className="content__foro--header">
            <div className="foro__header--container">
              <h1 className="foro__header--title">{title}</h1>
              <div className="foro__header--user">
                <div className="userInformation">
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
                  <p className="foro__header--userText">{displayName}</p>
                </div>

                <div className="foro__header--info">
                  <div className="foro__header--time">
                    <i className="fa-solid fa-clock"></i>
                    <span>{`Hace ${dateBefore} ${
                      dateBefore > 1 ? "horas" : "hora"
                    }`}</span>
                  </div>
                  <div className="foro__header--course">
                    <i className="fa-solid fa-book"></i>
                    <span>{course}</span>
                  </div>
                  <div className="foro__header--date">
                    <i className="fa-solid fa-calendar-alt"></i>
                    <span>{`${new Date(date).getDate()}/${
                      new Date(date).getMonth() + 1
                    }/${new Date(date).getFullYear()}`}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="body-foro">
            <div className="content__foro--body">
              <div className="content__body--container">
                <div className="comilla-foro">
                  <img src={comilla} alt="comilla" />
                </div>
                <p className="foro__body--description">{description}</p>
              </div>
            </div>
            <div className="content__foro--newComment">
              <p>Aporta o ayuda con tu valioso comentario! ✌</p>
              <div className="foro-model">
                <div className="foro-modelChat">
                  <div className="foro__comment--userImg">
                    <div
                      className="photo-user"
                      style={{
                        backgroundImage: `url(${
                          photoURLActualUser === null ? photo : photoURLActualUser
                        })`,
                      }}
                    ></div>
                  </div>
                  <textarea
                    name="commentDescription"
                    id="comment"
                    className="content__foro--entryComment"
                    cols="30"
                    rows="10"
                    value={commentDescription}
                    onChange={onInputChange}
                  ></textarea>
                </div>
                <button className="content__foro--btn" onClick={onSaveComment}>
                  Sumar comentario 😀
                </button>
              </div>
            </div>
            <div className="content__foro--comments">
              <p>{`Comentarios (${comments.length})`}</p>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <CommentItem key={comment.id} comment={comment} />
                ))
              ) : (
                <p>Aún no hay comentarios</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
