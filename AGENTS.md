# AGENTS.md - Semillitas Ampiu Web

Instructions for AI coding agents working on this codebase.

## Project Overview

React 19 + TypeScript + Vite admin panel for "Semillitas Ampiu" - a language-learning game managing sports players. Consumes a Django REST API backend.

## Build, Lint, Test Commands

```bash
npm run dev          # Start Vite dev server (port 5173)
npm run build        # TypeScript compile + Vite production build
npm run lint         # Run ESLint

# Testing (Vitest + Testing Library)
npx vitest run                              # Run all tests once
npx vitest run src/path/to/file.test.tsx    # Run single test file
npx vitest run -t "test name"               # Run tests matching pattern
```

## Project Structure

```
src/
├── components/         # Layout, AdminLayout, Sidebar, modals/, barras/, home/
├── pages/administrador/# Admin pages (Login, Dashboard, ListarJugadores, etc.)
├── hooks/              # useGetRequest, usePostRequest, usePutRequest, useDeleteRequest
├── context/            # authContext.tsx - Authentication state
├── routes/             # appRouter.tsx, PrivateRouter.tsx
├── types/index.ts      # ALL type definitions (centralized)
└── utils/              # apiConfig.ts, CSRFToken.ts
```

## Path Aliases (USE THESE)

```tsx
import { Jugador } from '@/types';
import useGetRequest from '@/hooks/useGetRequest';
import { getApiUrl } from '@/utils/apiConfig';
```

Available: `@/*`, `@components/*`, `@pages/*`, `@hooks/*`, `@context/*`, `@utils/*`, `@types/*`

## Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Components | PascalCase | `ListarJugadores.tsx` |
| Hooks | camelCase + `use` prefix | `useGetRequest.tsx` |
| Types/Interfaces | PascalCase | `Jugador`, `ActualizarJugadorPayload` |
| API payloads | snake_case (Django) | `fecha_nacimiento`, `first_name` |
| Variables | camelCase | `jugadorActual`, `isLoading` |

## Types - Centralized

**ALL types go in `src/types/index.ts`.** Do not create type files elsewhere.

```tsx
import { Jugador, ActualizarJugadorPayload } from '@/types';  // Good
interface Jugador { ... }  // Bad - don't create local types
```

## Component Patterns

```tsx
// Always type the return
const MiComponente = (): ReactElement => { ... };

// With props
interface MiComponenteProps {
  titulo: string;
  onClose: () => void;
}
const MiComponente: FC<MiComponenteProps> = ({ titulo, onClose }): ReactElement => { ... };
```

## Data Fetching Pattern

```tsx
const { getData, data, error, loading } = useGetRequest<Jugador[]>();

useEffect(() => {
  const controller = new AbortController();
  getData('jugadores/', null, '', controller.signal);
  return () => controller.abort();
}, [getData]);
```

Always use:
- Generics: `useGetRequest<Jugador>()`
- `AbortController` for cleanup
- Check `error` state before using data

## Modal Pattern

```tsx
const MiModal: FC<ModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>(initialState);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  if (!isOpen) return null;
  return ( ... );
};
```

## User Feedback - SweetAlert2

```tsx
// Toast
Swal.fire({ icon: 'success', title: 'Guardado', toast: true, position: 'top-end', timer: 3000 });

// Confirmation
const result = await Swal.fire({ title: 'Eliminar?', icon: 'warning', showCancelButton: true });
if (result.isConfirmed) { /* delete */ }
```

## API & Authentication

- **Base URL**: `VITE_URL_API` env variable
- **CSRF Token**: Required for POST/PUT/DELETE
  ```tsx
  import { getCookie } from '@/utils/CSRFToken';
  const csrfToken = getCookie('csrftoken');
  ```
- **Date format**: `'YYYY-MM-DD'` for `fecha_nacimiento`

## Error Handling

```tsx
const { data, error, loading } = useGetRequest<Jugador>();
if (error) {
  Swal.fire({ icon: 'error', title: error.mensaje || 'Error al cargar datos' });
}
```

## Styling

- **Tailwind CSS** with dark theme: `bg-gray-900`, `bg-slate-800`, `text-white`
- Classes directly in JSX, no CSS-in-JS

## TypeScript Configuration

- Strict mode with all flags enabled
- `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`
- Target: ES2022

## Testing

```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

describe('MiComponente', () => {
  it('debe mostrar el titulo', () => {
    render(<MiComponente titulo="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

## Language

**This project is in Spanish**: variable names, UI text, comments.

## Git Workflow

- Pre-commit hook runs code review
- Branch protection on main: requires 1 approving review
- Linear history required

## Key Files

| Purpose | File |
|---------|------|
| All types | `src/types/index.ts` |
| Auth context | `src/context/authContext.tsx` |
| API config | `src/utils/apiConfig.ts` |
| CRUD example | `src/pages/administrador/ListarJugadores.tsx` |
