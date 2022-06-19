import { Navigate, Route, Routes } from 'react-router-dom';
import { FastLearningPage, CursosPage } from '../pages';

export const FastLearningRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={ <FastLearningPage /> } />
        <Route path='/cursos' element={ <CursosPage /> } />

        <Route path='/*' element={ <Navigate to="/" /> } />
    </Routes>
  )
}
