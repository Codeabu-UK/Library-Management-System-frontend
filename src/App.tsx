import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { Provider } from 'react-redux';
import { store } from './store/store';
// import ErrorBoundary from './utils/error-boundary';


function App() {

  const queryClient = new QueryClient();


  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
          <AppRoutes />
        {/* <ErrorBoundary>
        </ErrorBoundary> */}
      </Provider>
    </QueryClientProvider>
  )
}

export default App
