import logo from '../../assets/images/logo.png';

export const AuthLayout = ({ children, title }) => {
  return (
    <div className={ title }>
        <div className="form-container">
            <img src={ logo } alt="logo" className="logo" />
            { children }
        </div>
    </div>
  )
}
