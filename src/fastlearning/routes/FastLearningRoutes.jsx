import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminRoutes } from '../../admin/routes/AdminRoutes';
import { FastLearningPage, CursosPage } from '../pages';
import { ForoView } from '../views';

export const FastLearningRoutes = () => {

  const { active } = useSelector((state) => state.post);
  const { email } = useSelector((state) => state.auth);

  return (
    <Routes>
        <Route path='/' element={ <FastLearningPage /> } />
        <Route path='/cursos' element={ <CursosPage /> } />
        {
          active === null 
          ? <Route path='/' element={ <FastLearningPage /> } />
          : <Route path='/post/:id' element={ <ForoView /> } />
        }
        {
          email === 'admin@gmail.com'
          ? <Route path='/admin/*' element={ <AdminRoutes /> } />
          : <Route path='/*' element={ <Navigate to="/" /> } />
        }
        <Route path='/*' element={ <Navigate to="/" /> } />
    </Routes>
  )
}