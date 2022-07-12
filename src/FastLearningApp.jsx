import { Provider } from 'react-redux';
import { AppRouter } from './router/AppRouter';
import { store } from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FastLearningApp = () => {
  return (
    <Provider store={ store } >
      <AppRouter />
      <ToastContainer 
        theme='dark'
      />
    </Provider>
  )
}

export default FastLearningApp;