import { useSelector } from 'react-redux';

import { useForm } from '../../hooks';

import './styles/profile.css';

export const UpdateProfileView = () => {

  const { displayName, email: emailUser } = useSelector((state) => state.auth);

  const { name, email, onInputChange } = useForm({
    name: displayName,
    email: emailUser,
  });

  return (
    <>
      <div className="modal__content--rol">
        <i className="fa-solid fa-graduation-cap"></i>
        <i className="fa-solid fa-person-chalkboard"></i>
      </div>
      <div className="modal__content--body profile__body">
        <form action="#">
          <div className="form__group">
            <label className="form__group--label" htmlFor="nombre">
              Nombres y Apellidos
            </label>
            <input
              className="form__group--text"
              type="text"
              name="name"
              value={ name }
              onChange={onInputChange}
            />
          </div>

          <div className="form__group">
            <label className="form__group--label" htmlFor="correo">
              Correo
            </label>
            <input
              className="form__group--text"
              type="email"
              name="email"
              value={ email }
              onChange={ onInputChange }
            />
          </div>

          <div className="form__submit">
            <button className="btn form__submit--btn" type="submit">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
