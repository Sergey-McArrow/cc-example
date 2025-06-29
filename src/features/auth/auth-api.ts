import { API_URL } from '../../lib/const'
import type { TUserSchema } from './auth-schema'
import { userSchema } from './auth-schema'

export async function loginUser(
  username: string
): Promise<{ user: TUserSchema | null }> {
  try {
    const response = await fetch(`${API_URL}/users?username=${username}`)

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`)
    }

    const data = await response.json()
    console.log({ data })
    const result = userSchema.array().safeParse(data)
    if (!result.success) {
      throw new Error(result.error.message)
    }
    return { user: result.data?.[0] || null }
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}
