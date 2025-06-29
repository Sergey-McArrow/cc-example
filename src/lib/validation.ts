import { z } from 'zod'

export type TFieldErrors<T> = {
  [K in keyof T]?: string
}

export const extractZodErrors = <T>(
  error: z.ZodError,
  fields: Record<string, boolean> = {}
): TFieldErrors<T> => {
  const errors: TFieldErrors<T> = {}
  
  error.errors.forEach((err) => {
    const key = err.path[0]
    if (key && (fields[key as string] !== false)) {
      errors[key as keyof T] = err.message
    }
  })
  
  return errors
}
