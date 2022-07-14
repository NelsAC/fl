import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import jsPDF from "jspdf";
import { NavBar } from "./NavBar";
import { startUpdateUser } from "../../store/user";

export const ListUsers = () => {

  const dispatch = useDispatch();
  const pdfRef = useRef(null);

  const { users } = useSelector((state) => state.user);

  const handleUpdateUser = (id) => {
    dispatch ( startUpdateUser(id) );
  }

  const handlePdf = () => {
    const content = pdfRef.current;
    const doc = new jsPDF();
    doc.html(content, {
        callback: function (doc) {
            doc.save('UsuariosFastlearning.pdf');
          },
          html2canvas: { scale: 0.235 },
          x: 10,
          y: 30,
    });

  }

  return (
    <div>
      <ToastContainer theme='dark' />
      <div className="relative md:ml-64 dashboard__admin">
        <NavBar name={"Usuarios"} />
        <div className="content__dashboard animate__animated animate__fadeIn">
            <div className="md:w-5/6 mx-auto flex flex-col min-w-0 break-words w-full mb-6 rounded pt-20">
              <div className="rounded-t px-6 py-6 bg-white">
                <div className="flex flex-wrap items-center">
                  <div className="w-full pr-4 max-w-full flex flex-grow flex-1 justify-between items-center">
                    <h3 className="font-bold text-xl">Usuarios</h3>
                    <button className="pdfButton" onClick={handlePdf}>
                      Exportar PDF
                    </button>
                  </div>
                </div>
              </div>
              <div className="block w-full overflow-x-auto navigation__admin">
                {/* <!-- cursos tabla --> */}
                <table
                className="items-center w-full bg-transparent border-collapse"
                ref={pdfRef}
              >
                <thead>
                  <tr>
                    <th className="px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left w-4/12 font-bold">
                      Nombre y Apellido
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left w-4/12 font-bold">
                      Rol
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left w-4/12 font-bold">
                      Correo
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left w-4/12 font-bold">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white tBodyListUser">
                  {users.map((user) => (
                    <tr key={user.userId}>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 w-4/12 font-semibold text-sm text-purple-700">
                        {user.displayName}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 w-4/12 text-sm">
                        {user.rol}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 w-4/12 text-sm">
                        {user.email}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 w-4/12 text-sm flex items-center">
                        <p className="cursor-pointer pruebaxd" onClick={ () => handleUpdateUser( user.userId ) }>{ !!user.status ? 'Habilitado' : 'Inhabilitado' }</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
                </table>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};
