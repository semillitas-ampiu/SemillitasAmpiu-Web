import {Routes,Route} from 'react-router-dom';
import ListarAdministradores from '../pages/administrador/ListarAdministradores.jsx'
import ListarJugadores from '../pages/administrador/ListarJugadores.jsx'
import Detalles from '../pages/administrador/Detalles.jsx';

import AgregarAdministrador from '../pages/administrador/AgregarAdministrador.jsx';
import Login from '../pages/administrador/Login.jsx';
import HomePage from "../pages/Home/HomePage.jsx";
import PrivateRoute from './PrivateRouter.jsx';
import Layout from '../components/Layout.jsx';
import Logout from '../pages/administrador/Logout.jsx';

const AppRouter=()=>{
    return (
        <Routes> 
            <Route path='/' element={<Layout><HomePage/></Layout>}/>
            <Route path='/login' element={<Layout><Login/></Layout>}/>
            <Route path='/logout' element={<Layout><Logout/></Layout>}/>
            <Route path="/administradores" element = {<PrivateRoute> <Layout><ListarAdministradores/></Layout></PrivateRoute> }/>
            <Route path="/jugadores" element = { <PrivateRoute><Layout> <ListarJugadores/></Layout></PrivateRoute> }/>
            <Route path='/addAdministrador' element = {<PrivateRoute><Layout><AgregarAdministrador/></Layout></PrivateRoute> }/>
            <Route path='/detalles/:id' element = {<PrivateRoute><Layout><Detalles/></Layout></PrivateRoute> }/>
        </Routes>
    );
}
export default AppRouter