/**
 * ============================================================================
 * TIPOS GLOBALES DEL PROYECTO SEMILLITAS AMPIU
 * ============================================================================
 * 
 * Este archivo centraliza TODOS los tipos del proyecto.
 * La idea es que cualquier desarrollador nuevo pueda entender la estructura
 * de datos del proyecto mirando este archivo.
 * 
 * IMPORTANTE: Estos tipos deben reflejar EXACTAMENTE lo que devuelve tu API.
 * Si la API cambia, estos tipos deben cambiar.
 */

// ============================================================================
// USUARIOS Y AUTENTICACIÓN
// ============================================================================

/**
 * Roles disponibles en el sistema
 * Por ahora solo Admin, pero preparado para expandirse
 */
export type UserRole = 'Admin' | 'Jugador';

/**
 * Usuario base del sistema
 * Representa un administrador o cualquier usuario con cuenta completa
 */
export interface Usuario {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  fecha_nacimiento: string; // formato: 'YYYY-MM-DD'
  rol: UserRole;
}

/**
 * Datos que devuelve el endpoint de login (token/)
 */
export interface LoginResponse {
  access: string;
  refresh?: string;
  user: Usuario;
}

/**
 * Credenciales para el login
 */
export interface Credenciales {
  username: string;
  password: string;
}

// ============================================================================
// ADMINISTRADORES
// ============================================================================

/**
 * Administrador del sistema
 * Hereda estructura de Usuario pero es específico para admins
 */
export interface Administrador {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  fecha_nacimiento: string;
}

/**
 * Payload para crear un nuevo administrador
 * El password se genera en el backend
 */
export interface CrearAdministradorPayload {
  first_name: string;
  last_name: string;
  email: string;
  fecha_nacimiento: string;
}

/**
 * Payload para actualizar un administrador
 */
export interface ActualizarAdministradorPayload {
  first_name: string;
  last_name: string;
  email: string;
  fecha_nacimiento: string;
}

/**
 * Respuesta al crear un administrador exitosamente
 */
export interface CrearAdministradorResponse {
  mensaje: string;
  data: {
    username: string;
    email: string;
  };
}

// ============================================================================
// JUGADORES
// ============================================================================

/**
 * Jugador del juego
 * Usuarios que juegan pero no tienen acceso al panel de admin
 */
export interface Jugador {
  id: number;
  username: string;
  fecha_nacimiento: string;
}

/**
 * Payload para actualizar un jugador
 */
export interface ActualizarJugadorPayload {
  username: string;
  fecha_nacimiento: string;
}

// ============================================================================
// PALABRAS Y RECOLECCIONES
// ============================================================================

/**
 * Palabra del vocabulario Ampiu-Español
 */
export interface Palabra {
  id: number;
  pal_ampiu: string;
  pal_espanol: string; // Corregido el typo 'pal_español' -> snake_case consistente
  nivel: number;
}

/**
 * Registro de una palabra recolectada por un jugador
 */
export interface Recoleccion {
  id: number;
  usuario: number;
  palabra: number;
  fecha_recogida: string; // ISO date string
  palabra_data: {
    pal_ampiu: string;
    pal_español: string;
    nivel: number;
  };
}

// ============================================================================
// API RESPONSES - Tipos genéricos para las respuestas
// ============================================================================

/**
 * Error genérico de la API
 */
export interface ApiError {
  error?: string;
  mensaje?: string;
  errores?: Record<string, string[]>;
  detail?: string;
}

/**
 * Estado base para los hooks de request
 */
export interface RequestState<T> {
  data: T | null;
  error: ApiError | null;
  loading: boolean;
}

// ============================================================================
// COMPONENTES - Props Types
// ============================================================================

/**
 * Props para componentes que aceptan children
 */
export interface ChildrenProps {
  children: React.ReactNode;
}

/**
 * Props base para modales
 */
export interface ModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Props para ModalAgregarAdministrador
 */
export interface ModalAgregarAdministradorProps extends ModalBaseProps {
  onAdminCreated?: (admin: CrearAdministradorResponse['data']) => void;
}

/**
 * Props para ModalActualizarAdministrador
 */
export interface ModalActualizarAdministradorProps extends ModalBaseProps {
  admin: Administrador | null;
  onAdminUpdated?: (admin: Administrador) => void;
}

/**
 * Props para ModalActualizarJugador
 */
export interface ModalActualizarJugadorProps extends ModalBaseProps {
  jugador: Jugador | null;
  onSubmit: (data: ActualizarJugadorPayload) => void;
}

/**
 * Datos del formulario para crear administrador
 */
export interface FormDatosAdministrador {
  fecha_nacimiento: string;
  first_name: string;
  last_name: string;
  email: string;
}

/**
 * Datos del formulario para actualizar jugador
 */
export interface FormDatosJugador {
  username: string;
  fecha_nacimiento: string;
}

/**
 * Props para el componente StatsCard
 */
export interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendColor?: string;
}

/**
 * Props para el Sidebar
 */
export interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

/**
 * Props para SidebarLink
 */
export interface SidebarLinkProps {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  isCollapsed: boolean;
}

/**
 * Props para NavPrincipal
 */
export interface NavPrincipalProps {
  navbarOpen: boolean;
}

// ============================================================================
// CHARTS DATA - Tipos para las gráficas
// ============================================================================

export interface BarChartDataPoint {
  day: string;
  sales: number;
  revenue: number;
}

export interface LineChartDataPoint {
  name: string;
  p1: number;
  p2: number;
}

// ============================================================================
// CONTEXT TYPES
// ============================================================================

/**
 * Valor del contexto de autenticación
 */
export interface AuthContextValue {
  usuario: Usuario | null;
  login: (data: LoginResponse) => void;
  logout: () => void;
}

// ============================================================================
// VITE ENV TYPES
// ============================================================================

/**
 * Extendemos las variables de entorno de Vite
 */
declare global {
  interface ImportMetaEnv {
    readonly VITE_URL_API: string;
  }
}
