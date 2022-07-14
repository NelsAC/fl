import { Link, NavLink } from "react-router-dom";
import { HomeIcon } from "../../assets/icons";

import logo from '../../assets/images/logomobile.png';


export const Sidebar = () => {
  return (
    <aside className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-8 aside__admin">
    <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto font-sans">
      <div className="w-full flex items-center justify-between">
        <Link
          className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-xl uppercase font-bold p-4 px-0 w-10"
          to="/admin"
        >
          <img src={logo} alt="logo Fastlearning" />
        </Link>
        <span className="text-xl text-white bold">Fastlearning</span>
      </div>
      <button
        className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
        type="button"
        id="bar-mobile"
      >
        <i className="fas fa-bars"></i>
      </button>
      <div
        className="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded hidden flex-column justify-center"
        id="collapseNav"
      >
        <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-6">
          <li className="items-center">
            <NavLink
              className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block link__admin"
              to="/admin/"
            >
              <i className="fas fa-tv mr-2 text-xl"></i> Dashboard
            </NavLink>
          </li>
        </ul>

        <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-6">
          <li className="items-center">
            <NavLink
              className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block link__admin"
              to="/admin/listCourses"
            >
              <i className="fa-solid fa-list mr-2 text-xl"></i>
              Listar Cursos
            </NavLink>
          </li>
        </ul>

        <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-6">
          <li className="items-center">
            <NavLink
              className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block link__admin"
              to="/admin/addCourse"
            >
              <i className="fa-solid fa-plus mr-2 text-xl"></i>
              Crear Nuevo Curso
            </NavLink>
          </li>
        </ul>

        <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-6">
          <li className="items-center">
            <NavLink
              className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block link__admin"
              to="/admin/listUsers"
            >
              <i className="fa-solid fa-list mr-2 text-xl"></i>
              Listar Usuarios
            </NavLink>
          </li>
        </ul>
        <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-6">
          <li className="items-center">
            <NavLink
              className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block link__admin"
              to="/admin/listForums"
            >
              <i className="fa-solid fa-list mr-2 text-xl"></i>
              Listar Foros
            </NavLink>
          </li>
        </ul>
        <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-6">
          <li className="items-center">
            <NavLink
              className="text-xs uppercase py-3 font-bold block link__admin flex items-center"
              to="/"
            >
              <HomeIcon />
              Volver a Inicio
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  </aside>
  )
}
