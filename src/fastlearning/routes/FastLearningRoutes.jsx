import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { FastLearningPage, CursosPage } from '../pages';
import { ForoView } from '../views';

export const FastLearningRoutes = () => {

  const { active } = useSelector((state) => state.post);

  return (
    <Routes>
        <Route path='/' element={ <FastLearningPage /> } />
        <Route path='/cursos' element={ <CursosPage /> } />
        {
          active === null 
          ? <Route path='/' element={ <FastLearningPage /> } />
          : <Route path='/post/:id' element={ <ForoView /> } />
        }
        <Route path='/*' element={ <Navigate to="/" /> } />
    </Routes>
  )
}