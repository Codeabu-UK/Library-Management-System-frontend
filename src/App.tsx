import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { Provider } from 'react-redux';
import { store } from './store/store';


function App() {

  const queryClient = new QueryClient();


  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </QueryClientProvider>
  )
}

export default App
