import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina clases de Tailwind de forma inteligente
 * - Resuelve conflictos (ej: "px-2 px-4" → "px-4")
 * - Maneja condicionales (ej: cn("base", isActive && "active"))
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
