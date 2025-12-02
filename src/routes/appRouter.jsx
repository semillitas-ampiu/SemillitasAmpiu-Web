import {Routes,Route} from 'react-router-dom';
import ListarAdministradores from '../pages/administrador/ListarAdministradores.jsx'
import ListarJugadores from '../pages/administrador/ListarJugadores.jsx'
import Detalles from '../pages/administrador/Detalles.jsx';

import Login from '../pages/administrador/Login.jsx';
import HomePage from "../pages/Home/HomePage.jsx";
import PrivateRoute from './PrivateRouter.jsx';
import Layout from '../components/Layout.jsx';
import Logout from '../pages/administrador/Logout.jsx';
import AdminLayout from '../components/AdminLayout.jsx';
import Dashboard from '../components/barras/Dashboard.jsx';

const AppRouter=()=>{
    return (
        <Routes> 
            <Route path='/' element={<Layout><HomePage/></Layout>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/logout' element={<Logout/>}/>
            <Route path="/administradores" element = {<PrivateRoute> <AdminLayout><ListarAdministradores/></AdminLayout></PrivateRoute> }/>
            <Route path="/dashboard" element = {<PrivateRoute> <AdminLayout><Dashboard/></AdminLayout></PrivateRoute> }/>
            <Route path="/jugadores" element = { <PrivateRoute><AdminLayout> <ListarJugadores/></AdminLayout></PrivateRoute> }/>
            <Route path='/detalles/:id' element = {<PrivateRoute><AdminLayout><Detalles/></AdminLayout></PrivateRoute> }/>
        </Routes>
    );
}
export default AppRouter