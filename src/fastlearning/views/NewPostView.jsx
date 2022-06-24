import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks';
import { startNewPost } from '../../store/post';

import './styles/profile.css';

const formData = {
  course: 'diseño',
  title: '',
  description: '',
};

const formValidations = {
  title: [
    (value) => value.length >= 3,
    'El titulo debe tener almenos 3 caracteres.',
  ],
  description: [
    (value) => value.length >= 10,
    'La descripción debe tener almenos 10 caracteres.',
  ],
};

export const NewPostView = ({ setVisible }) => {

  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    course,
    title,
    description,
    onInputChange,
    formState,
    isFormValid,
    titleValid,
    descriptionValid,
  } = useForm(formData, formValidations);

  const onSubmit = (e) => {
    e.preventDefault();

    setFormSubmitted(true);
    if (!isFormValid) return;

    dispatch( startNewPost(formState) );
    setVisible(false);
  };

  return (
    <div className="modal__content--body">
      <form action="#" onSubmit={ onSubmit }>
        <div className="form__group">
          <label className="form__group--label" htmlFor="course">
            Curso
          </label>
          <select
            name="course"
            className="form__group--select"
            value={ course }
            onChange={ onInputChange }
          >
            <option value="diseño">Diseño UI/UX</option>
            <option value="datos">Base de datos</option>
            <option value="programación">Programación</option>
          </select>
        </div>
        <div className="form__group">
          <label className="form__group--label" htmlFor="title">
            Título
          </label>
          {
            formSubmitted && !!titleValid 
              ? ( <div className="error-message">{titleValid}</div> ) 
              : null
          }
          <input
            className={`form__group--text ${!!titleValid && formSubmitted && "input-error-active"
              }`}
            type="text"
            name="title"
            placeholder="Escriba un título de pregunta..."
            value={ title }
            onChange={ onInputChange }
          />
        </div>
        <div className="form__group">
          <label className="form__group--label" htmlFor="description">
            Descripción
          </label>
          {
            formSubmitted && !!descriptionValid 
              ? ( <div className="error-message">{descriptionValid}</div> ) 
              : null
          }
          <textarea
            className={`form__group--text ${!!descriptionValid && formSubmitted && "input-error-active"
              }`}
            name="description"
            cols="30"
            rows="7"
            placeholder="Describa el problema..."
            value={ description }
            onChange={ onInputChange }
          ></textarea>
        </div>
        <div className="form__submit">
          <button className="btn form__submit--btn" type="submit">
            Publicar
          </button>
        </div>
      </form>
    </div>
  );
};
