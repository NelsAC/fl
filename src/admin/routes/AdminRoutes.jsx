import { Route, Routes } from 'react-router-dom';
import { AddCoursePage } from '../pages/AddCoursePage';
import { AdminPage } from '../pages/AdminPage';
import { ListCoursesPage } from '../pages/ListCoursesPage';
import { ListForumsPage } from '../pages/ListForumsPage';
import { ListUsersPage } from '../pages/ListUsersPage';
import { UpdateCoursePage } from '../pages/UpdateCoursePage';

export const AdminRoutes = () => {

  return (
    <Routes>
        <Route path='/' element={ <AdminPage /> } />
        <Route path='/addCourse' element={ <AddCoursePage /> } />
        <Route path='/listCourses' element={ <ListCoursesPage /> } />
        <Route path='/listUsers' element={ <ListUsersPage /> } />
        <Route path='/listForums' element={ <ListForumsPage /> } />
        <Route path='/updateCourse/:id' element={ <UpdateCoursePage /> } />
    </Routes>
  )
}