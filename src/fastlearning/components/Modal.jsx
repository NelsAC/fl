import "./modal.css";

export const Modal = ({ children, title, visible, setVisible }) => {
  return (
    <>
      {visible && (
        <div className="modal">
          <div className="modal__content animate__animated animate__fadeInDown animate__faster">
            <div className="modal__content--title">
              <h2>{title}</h2>
              <span 
                className="modal__close--profile"
                onClick={ () => setVisible(false) }
                >&times;</span>
            </div>
            { children }
          </div>
        </div>
      )}
    </>
  );
};
