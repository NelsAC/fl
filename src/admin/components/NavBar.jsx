import { useDispatch } from "react-redux";

import { LogoutIcon } from "../../assets/icons";
import { setClearLogoutUser } from "../../store/user";
import { setClearLogoutPosts } from "../../store/post";
import { setClearLogoutComments } from "../../store/comment";
import { startLogout } from "../../store/auth";

export const NavBar = ({ name }) => {

    const dispatch = useDispatch();

const onLogout = () => {
    dispatch( setClearLogoutUser() );
    dispatch( setClearLogoutPosts() );
    dispatch( setClearLogoutComments() );
    dispatch( startLogout() );
  }; 

   return (
    <nav className="w-full md:flex-row md:flex-nowrap md:justify-start flex items-center nav__admin">
    <div className="w-full items-center flex justify-between md:flex-nowrap flex-wrap md:px-16 px-4">
      <h2 className="text-xl font-bold uppercase text-gray-100">
        / { name }
      </h2>
      <div onClick={ onLogout } className='logout-icon'>
        <LogoutIcon />
      </div>
    </div>
  </nav>
   )
}