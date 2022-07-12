import "./styles/modal.css";

export const Modal = ({ children, title="", visible, setVisible }) => {

  const onClose = () => {
    document.getElementById("modalClose").classList.remove("animate__fadeInDown");
    document.getElementById("modalClose").classList.add("animate__backOutUp");
    setTimeout(() => {
      setVisible(false);
    }, 500);
  }

  return (
    <>
      {visible && (
        <div className="modal">
          <div id="modalClose" className="modal__content animate__animated animate__fadeInDown">
            {
              title.length > 0 && (
                  <div className="modal__content--title">
                    <h2>{title}</h2>
                    <span 
                      className="modal__close--profile"
                      onClick={ onClose }
                    >
                      &times;
                    </span>
                  </div>
                )
            }
            { children }
          </div>
        </div>
      )}
    </>
  );
};
