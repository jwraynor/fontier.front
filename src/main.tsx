import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Layout from './components/Layout.tsx';
import Dashboard from './pages/dashboard';
import FontsPage from './pages/fonts';
import UsersPage from './pages/users';
import GroupsPage from './pages/groups';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import LibrariesPage from "@/pages/libraries.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Dashboard/>}/>
                        <Route path="fonts" element={<FontsPage/>}/>
                        <Route path="libraries" element={<LibrariesPage />} />
                        <Route path="users" element={<UsersPage/>}/>
                        <Route path="groups" element={<GroupsPage/>}/>
                    </Route>
                </Routes>
            </Router>
            <ReactQueryDevtools/>
        </QueryClientProvider>
)
