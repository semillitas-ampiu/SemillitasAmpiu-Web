import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import AdminLayout from '@/components/AdminLayout';
import Layout from '@/components/Layout';
import Dashboard from '@/pages/administrador/Dashboard';
import Detalles from '@/pages/administrador/Detalles';
import ListarAdministradores from '@/pages/administrador/ListarAdministradores';
import ListarJugadores from '@/pages/administrador/ListarJugadores';
import Login from '@/pages/administrador/Login';
import Logout from '@/pages/administrador/Logout';
import HomePage from '@/pages/Home/HomePage';
import PrivateRoute from '@/routes/PrivateRouter';
import Palabras from '@/pages/administrador/Palabras';

const AppRouter = (): ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<Layout><HomePage /></Layout>} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route
        path="/administradores"
        element={
          <PrivateRoute>
            <AdminLayout><ListarAdministradores /></AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <AdminLayout><Dashboard /></AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/jugadores"
        element={
          <PrivateRoute>
            <AdminLayout><ListarJugadores /></AdminLayout>
          </PrivateRoute>
        }
      />
      
      <Route
        path="/palabras"
        element={
          <PrivateRoute>
            <AdminLayout><Palabras /></AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/detalles/:id"
        element={
          <PrivateRoute>
            <AdminLayout><Detalles /></AdminLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
};


export default AppRouter;
