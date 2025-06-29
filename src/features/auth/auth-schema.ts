import { z } from 'zod'

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  website: z.string().optional(),
})

export const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
})

export type TUserSchema = z.infer<typeof userSchema>
export type TLoginSchema = z.infer<typeof loginSchema>
