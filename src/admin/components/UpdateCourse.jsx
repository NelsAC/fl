import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks";
import { startUpdateCourse } from "../../store/user";
import { NavBar } from "./NavBar";


export const UpdateCourse = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { courses } = useSelector((state) => state.user);

  const { id } = useParams();

  const courseActive = courses.find(course => course.id === id);

  const { name, description, category, icon, onInputChange, formState } = useForm(courseActive);



  const onSubmit = (e) => {
    e.preventDefault();
    navigate("/admin/listCourses");
    dispatch( startUpdateCourse(formState) );
  }

  return (
    <div>
      <div className="relative md:ml-64 dashboard__admin">
        <NavBar name={ 'Actualizar Curso' } />

        {/* <!-- Hasta aqui van en todos --> */}

        <div className="content__dashboard animate__animated animate__fadeIn">
           <form onSubmit={ onSubmit } className="pt-20 pb-10">
             <div className="md:w-5/6 mx-auto flex flex-col min-w-0 break-words shadow-lg rounded navigation__admin">
               <div className="rounded-t bg-white mb-0 px-6 py-6">
                 <div className="text-center flex justify-between">
                   <h6 className="text-blueGray-700 text-xl font-bold">
                     Actualizar Curso
                   </h6>
                   <button
                     className="bg-purple-700 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                     type="submit"
                   >
                     Actualizar
                   </button>
                 </div>
               </div>
               <div className="flex-auto px-4 lg:px-10 py-10 pt-0 navigation__admin">
                 <h6 className="text-sm mt-3 mb-6 font-bold uppercase text-gray-500">
                   Información del curso
                 </h6>
                 <div className="flex flex-wrap">
                   <div className="w-full lg:w-6/12 px-4 mt-4">
                     <div className="relative w-full mb-3">
                       <label
                         className="block uppercase text-xs font-bold mb-2"
                         htmlFor="name"
                       >
                         Nombre del curso
                       </label>
                       <input
                         type="text"
                         name="name"
                         id="name"
                         className="border-0 px-3 py-3 placeholder-blueGray-300 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                         placeholder="Programación"
                         value={ name }
                         onChange={ onInputChange }
                       />
                     </div>
                   </div>
                   <div className="w-full lg:w-6/12 px-4 mt-4">
                     <div className="relative w-full mb-3">
                       <label
                         className="block uppercase text-xs font-bold mb-2"
                         htmlFor="category"
                       >
                         Categoría
                       </label>
                       <input
                         type="text"
                         name="category"
                         id="category"
                         className="border-0 px-3 py-3 placeholder-blueGray-300 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                         placeholder="Lenguajes de programación y algoritmos"
                         value={ category }
                         onChange={ onInputChange }
                       />
                     </div>
                   </div>
                   <div className="w-full lg:w-6/12 px-4 mt-8">
                     <div className="relative w-full mb-3">
                       <label
                         className="block uppercase text-xs font-bold mb-2"
                         htmlFor="description"
                       >
                         Descripción
                       </label>
                       <input
                         type="text"
                         name="description"
                         id="description"
                         className="border-0 px-3 py-3 placeholder-blueGray-300 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                         placeholder="Java, PHP, JS, Python"
                         value={ description }
                         onChange={ onInputChange }
                       />
                     </div>
                   </div>
                   <div className="w-full lg:w-6/12 px-4 mt-8">
                     <div className="relative w-full mb-3">
                       <label
                         className="block uppercase text-xs font-bold mb-2"
                         htmlFor="icon"
                       >
                         Icono
                       </label>
                       <input
                         type="text"
                         name="icon"
                         id="icon"
                         className="border-0 px-3 py-3 placeholder-blueGray-300 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                         placeholder="fa-solid fa-code"
                         value={ icon }
                         onChange={ onInputChange }
                       />
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </form>
        </div>
      </div>
    </div>
  );
};
