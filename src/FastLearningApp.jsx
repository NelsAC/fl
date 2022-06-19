import { Provider } from 'react-redux';
import { AppRouter } from './router/AppRouter';
import { store } from './store';

const FastLearningApp = () => {
  return (
    <Provider store={ store } >
      <AppRouter />
    </Provider>
  )
}

export default FastLearningApp;