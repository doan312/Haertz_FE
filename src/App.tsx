import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import Router from './routes/Router'

function App() {
    const queryClient = new QueryClient()
    return (
        <div className='App'>
            <QueryClientProvider client={queryClient}>
                <Router />
            </QueryClientProvider>
        </div>
    )
}

export default App
