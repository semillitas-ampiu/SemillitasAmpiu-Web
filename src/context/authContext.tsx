import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

import type { AuthContextValue, LoginResponse, Usuario } from '@/types';

/**
 * Contexto de autenticación
 * 
 * IMPORTANTE: Este contexto puede ser null si se usa fuera del provider.
 * Siempre usá el hook useAuth() para acceder al contexto de forma segura.
 */
const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provider de autenticación
 * 
 * Maneja el estado del usuario logueado y persiste en localStorage.
 * Debe envolver toda la aplicación para que el contexto esté disponible.
 */
const AuthProvider = ({ children }: AuthProviderProps): React.ReactNode => {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    try {
      const storedUsuario = localStorage.getItem('usuario');
      if (storedUsuario && storedUsuario !== 'undefined') {
        return JSON.parse(storedUsuario) as Usuario;
      }
      return null;
    } catch (error) {
      console.error('Error al cargar usuario desde almacenamiento local:', error);
      return null;
    }
  });

  /**
   * Inicia sesión con los datos recibidos del backend
   * Guarda el usuario y token en localStorage
   */
  const login = (usuarioData: LoginResponse): void => {
    setUsuario(usuarioData.user);
    localStorage.setItem('usuario', JSON.stringify(usuarioData.user));
    localStorage.setItem('token', usuarioData.access);
  };

  /**
   * Cierra sesión
   * Limpia el estado y el localStorage
   */
  const logout = (): void => {
    setUsuario(null);
    localStorage.clear();
  };

  const value: AuthContextValue = {
    usuario,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
