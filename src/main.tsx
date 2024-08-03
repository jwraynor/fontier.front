import ReactDOM from 'react-dom/client'
import './index.css'
import Root from './components/Root.tsx';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <Root/>
        {/*<UnifiedResourcesPage/>*/}
        <ReactQueryDevtools/>
    </QueryClientProvider>
)
