import { Link } from 'react-router-dom';

import './styles/floatButton.css';


export const FloatButton = () => {
  return (
    <Link 
      to="/" 
      className="float__button"
    >
      <i className="fa-solid fa-angle-left"></i>
    </Link>
  )
}
