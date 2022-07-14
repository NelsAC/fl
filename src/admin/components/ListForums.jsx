import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import jsPDF from "jspdf";
import { NavBar } from "./NavBar";
import { startUpdateForum } from "../../store/post";

export const ListForums = () => {

  const dispatch = useDispatch();
  const pdfRef = useRef(null);


  const { posts } = useSelector((state) => state.post);

  const handleUpdateForum = (id) => {
    dispatch ( startUpdateForum(id) );
  }

  const handlePdf = () => {
    const content = pdfRef.current;
    const doc = new jsPDF();
    doc.html(content, {
        callback: function (doc) {
            doc.save('forosFastlearning.pdf');
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
        <NavBar name={"Foros"} />
        <div className="content__dashboard animate__animated animate__fadeIn">
            <div className="md:w-5/6 mx-auto flex flex-col min-w-0 break-words w-full mb-6 rounded pt-20">
              <div className="rounded-t px-6 py-6 bg-white">
                <div className="flex flex-wrap items-center">
                  <div className="w-full pr-4 max-w-full flex flex-grow flex-1 justify-between items-center">
                    <h3 className="font-bold text-xl">Foros</h3>
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
                      Titulo
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left w-4/12 font-bold">
                      Descripción
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left w-4/12 font-bold">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white tBodyListForo">
                  {
                    posts.map((post) => (
                    <tr key={post.postId}>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 w-4/12 font-semibold text-sm text-purple-700">
                        {post.title.length > 35 ? post.title.substring(0, 35) + "..." : post.title}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 w-4/12 text-sm">
                      {post.description.length > 45 ? post.description.substring(0, 45) + "..." : post.description}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 w-4/12 text-sm flex items-center">
                      <p className="cursor-pointer pruebaxd" onClick={ () => handleUpdateForum(post.postId) }>{ !!post.status ? 'Activo' : 'Inactivo' }</p>
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
}
