import type { ReactElement, ReactNode } from 'react';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '@/context/authContext';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps): ReactElement => {
  const authContext = useContext(AuthContext);

  // Si el contexto es null, el usuario no está autenticado
  if (!authContext || !authContext.usuario) {
    return <Navigate to="/login?message=Debe Iniciar Sesión para acceder" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
