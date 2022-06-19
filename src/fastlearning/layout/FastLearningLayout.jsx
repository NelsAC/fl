import { useEffect } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

import 'sweetalert2/dist/sweetalert2.css';
import { Sidebar } from "../components";
import './layout.css';


export const FastLearningLayout = ({ children }) => {

  const { messageSaved } = useSelector((state) => state.user);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Datos actualizados', messageSaved,'success');
    }
  }, [messageSaved])

  const { posts } = useSelector((state) => state.learning);

  useEffect(() => {
    if (posts.length > 0) {
      Swal.fire('Nueva publicación', 'La publicación fue creada correctamente','success');
    }
  }, [posts])

  return (
    <>
        <Sidebar />

        <div className="content animate__animated animate__fadeIn">
            { children }
        </div>
    </>
  )
}
