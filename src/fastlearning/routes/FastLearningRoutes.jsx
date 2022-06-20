import { Navigate, Route, Routes } from 'react-router-dom';
import { FastLearningPage, CursosPage } from '../pages';
import { ForoView } from '../views';

export const FastLearningRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={ <FastLearningPage /> } />
        <Route path='/cursos' element={ <CursosPage /> } />
        <Route path='/post/:id' element={ <ForoView /> } />

        <Route path='/*' element={ <Navigate to="/" /> } />
    </Routes>
  )
}
