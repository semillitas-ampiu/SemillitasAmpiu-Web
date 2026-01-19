import type { FC } from 'react';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '@/context/authContext';

/**
 * Página de logout
 * Cierra la sesión y redirige al login con mensaje de confirmación
 */
const Logout: FC = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const salir = (): void => {
      authContext?.logout();
      navigate('/Login?message=Sesión cerrada exitosamente');
    };
    salir();
  }, [authContext, navigate]);

  return null;
};

export default Logout;
