import { useSelector } from "react-redux";
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import './styles/dashboard.css';
import { NavBar } from "./NavBar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
"Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"];

export const Dashboard = () => {


  const { courses, users } = useSelector(state => state.user);
  const { posts } = useSelector(state => state.post);

  const dataForos = [];
  posts.forEach(foro => {
    dataForos.push(new Date(foro.date).getMonth());
  });

  const dataForos2 = [];

  dataForos.forEach(foro => {
    dataForos2.push(monthNames[foro]);
  })

  let repetidos = {};

  posts.forEach(function(foro){
    repetidos[new Date(foro.date).getMonth()] = (repetidos[new Date(foro.date).getMonth()] || 0) + 1;
  });

  let dataForos3 = [];

  for(let key in repetidos) {
    dataForos3.push(
      repetidos[key]
    )
  }

  const dataUsers = [];

users.forEach(user => {
  dataUsers.push(new Date(user.date).getMonth());
});

const dataUsers2 = [];

dataUsers.forEach(user => {
  dataUsers2.push(monthNames[user]);
})

let repetidos2 = {};

users.forEach(function(user){
  repetidos2[new Date(user.date).getMonth()] = (repetidos2[new Date(user.date).getMonth()] || 0) + 1;
});

let dataUsers3 = [];

for(let key in repetidos2) {
  dataUsers3.push(
    repetidos2[key]
  )
}


  return (
    <div>
      <div className="relative md:ml-64 dashboard__admin">
        <NavBar name={ 'Dashboard' } />

        {/* <!-- Hasta aqui van en todos --> */}

        <div className="content__dashboard animate__animated animate__fadeIn">
          <div className="pt-8 pb-32">
            <div className="px-4 md:px-10 mx-auto w-full">
              <div>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words rounded mb-6 xl:mb-0 shadow-lg navigation__admin">
                      <div className="flex-auto p-4">
                        <div className="flex flex-wrap">
                          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="uppercase font-bold text-xs">
                              Cursos
                            </h5>
                            <span className="font-semibold text-xl text-blueGray-700 coursesCount">{courses.length}</span>
                          </div>
                          <div className="relative w-auto pl-4 flex-initial">
                            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                              <i className="fa-solid fa-book"></i>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm mt-4">
                          <span className="text-emerald-500 mr-2">
                            <i className="fas fa-arrow-up"></i>
                          </span>
                          <span className="whitespace-nowrap">
                            En el último mes
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <!-- fin cursos --> */}
                  <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words rounded mb-6 xl:mb-0 shadow-lg navigation__admin">
                      <div className="flex-auto p-4">
                        <div className="flex flex-wrap">
                          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="uppercase font-bold text-xs">
                              Usuarios
                            </h5>
                            <span className="font-semibold text-xl text-blueGray-700 usersCount">{users.length}</span>
                          </div>
                          <div className="relative w-auto pl-4 flex-initial">
                            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500">
                              <i className="fa-solid fa-users"></i>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm mt-4">
                          <span className="text-emerald-500 mr-2">
                            <i className="fas fa-arrow-up"></i>
                          </span>
                          <span className="whitespace-nowrap">
                            En el último mes
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <!-- fin usuarios --> */}
                  <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words rounded mb-6 xl:mb-0 shadow-lg navigation__admin">
                      <div className="flex-auto p-4">
                        <div className="flex flex-wrap">
                          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="uppercase font-bold text-xs">Foros</h5>
                            <span className="font-semibold text-xl text-blueGray-700 forosCount">{posts.length}</span>
                          </div>
                          <div className="relative w-auto pl-4 flex-initial">
                            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-purple-700">
                              <i className="fa-solid fa-clone"></i>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm mt-4">
                          <span className="text-emerald-500 mr-2">
                            <i className="fas fa-arrow-up"></i>
                          </span>
                          <span className="whitespace-nowrap">
                            En el último mes
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <!-- fin foros --> */}
                </div>
              </div>
            </div>
          </div>
          {/* <!-- FIN TARJETAS --> */}

          <div className="px-4 md:px-10 mx-auto w-full -m-24">
            <div className="flex flex-wrap">
              <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded navigation__admin">
                  <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div className="flex flex-wrap items-center">
                      <div className="relative w-full max-w-full flex-grow flex-1">
                        <h6 className="uppercase text-gray-900 mb-1 text-xs font-semibold">
                          Resumen
                        </h6>
                        <h2 className="text-gray-900 text-xl font-semibold">
                          Foros en el tiempo
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex-auto">
                    <div className="relative h-350-px">
                      <div className="chartjs-size-monitor">
                        <div className="chartjs-size-monitor-expand">
                          <div className=""></div>
                        </div>
                        <div className="chartjs-size-monitor-shrink">
                          <div className=""></div>
                        </div>
                      </div>
                      <Line
                          data = {{
                            labels: dataForos2.filter((item, index) => dataForos2.indexOf(item) === index),
                            datasets: [
                              {
                                label: new Date().getFullYear(),
                                backgroundColor: "#6200ee",
                                borderColor: "#6200ee",
                                data: dataForos3,
                                fill: false,
                              }
                            ]
                          }}

                          options = {{
                            scale: {
                              ticks: {
                                precision: 0,
                              }
                            }
                          }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- END CHART --> */}

              <div className="w-full xl:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded navigation__admin">
                  <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div className="flex flex-wrap items-center">
                      <div className="relative w-full max-w-full flex-grow flex-1">
                        <h6 className="uppercase mb-1 text-xs font-semibold">
                          Resumen
                        </h6>
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                          Usuarios registrados
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex-auto">
                    <div className="relative h-350-px">
                      <div className="chartjs-size-monitor">
                        <div className="chartjs-size-monitor-expand">
                          <div className=""></div>
                        </div>
                        <div className="chartjs-size-monitor-shrink">
                          <div className=""></div>
                        </div>
                      </div>
                      <Bar
                          style={{display: 'block', height: '350px'}}
                          height={350}
                          data = {{
                            labels: dataUsers2.filter((item, index) => dataUsers2.indexOf(item) === index),
                            datasets: [
                              {
                                label: new Date().getFullYear(),
                                fill: false,
                                backgroundColor: "#de4859",
                                borderColor: "#de4859",
                                data: dataUsers3,
                                barThickness: 8,
                              }
                            ]
                          }}
                          options = {{
                            scale: {
                              ticks: {
                                precision: 0,
                              }
                            }
                          }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- END CHART --> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
