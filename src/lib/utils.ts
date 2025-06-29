import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { TUserSchema } from '../features/auth/auth-schema'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getUserFromStorage = (): TUserSchema | null => {
  const data =
    typeof window !== 'undefined' ? localStorage.getItem('user') : null
  return data ? JSON.parse(data) : null
}
