import { BrowserRouter, Routes, Route } from 'react-router'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import AuthLayout from './layouts/AuthLayout'
import AppLayout from './layouts/AppLayout'
import LinkTreeView from './views/LinkTreeView'
import ProfileView from './views/ProfileView'
import HandleView from './views/HandleView'
import NotFoundView from './views/NotFoundView'
import HomeView from './views/HomeView'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/auth' element={<AuthLayout/>}>
                    <Route index element={<LoginView/>} />
                    <Route path="register-account" element={<RegisterView/>} />
                </Route>

                <Route path='/admin' element={<AppLayout/>}> 
                    <Route index element={<LinkTreeView/>} />
                    <Route path='profile' element={<ProfileView/>} />
                </Route>

                <Route path='/:handle' element={<AuthLayout/>}>
                    <Route element={<HandleView/>} index/>
                </Route>

                <Route path='/' element={<HomeView/>} />

                <Route path='/404' element={<AuthLayout/>}>
                    <Route element={<NotFoundView/>} index/>
                </Route>
            </Routes>
        </BrowserRouter>    
    )
}
