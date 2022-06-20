// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import Swal from "sweetalert2";

import 'sweetalert2/dist/sweetalert2.css';
import { Sidebar } from "../components";
import './layout.css';


export const FastLearningLayout = ({ children }) => {

  // const { messageSaved: messageSavedUser } = useSelector((state) => state.user);

  // useEffect(() => {
  //   if (messageSavedUser.length > 0) {
  //     Swal.fire('Datos actualizados', messageSavedUser,'success');
  //   }
  //   console.log(messageSavedUser);
  // }, [messageSavedUser])

  // const { messageSaved } = useSelector((state) => state.learning);

  

  // useEffect(() => {
  //   if (messageSaved.length > 0) {
  //     Swal.fire('Nueva publicación', messageSaved,'success');
  //     console.log(messageSaved.length);
  //   }
  // }, [messageSaved])

  return (
    <>
        <Sidebar />

        <div className="content animate__animated animate__fadeIn">
            { children }
        </div>
    </>
  )
}
