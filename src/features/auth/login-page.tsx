import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'
import { extractZodErrors, type TFieldErrors } from '../../lib/validation'
import { loginUser } from './auth-api'
import { loginSchema } from './auth-schema'
import { setUser } from './auth-slice'
import styles from './login-page.module.css'

type TLoginForm = {
  username: string
}

const LoginPage = () => {
  const [formData, setFormData] = useState<TLoginForm>({ username: '' })
  const [formErrors, setFormErrors] = useState<TFieldErrors<TLoginForm>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const validateForm = (): boolean => {
    try {
      loginSchema.parse(formData)
      setFormErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFormErrors(extractZodErrors<TLoginForm>(error))
      }
      return false
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    try {
      const result = await loginUser(formData.username)
      console.log({ result })
      dispatch(setUser(result?.user))
      toast.success(`Welcome, ${result?.user?.name}!`)
      navigate('/')
    } catch (error) {
      if (error instanceof Error) {
        console.error({ error })
        toast.error(`Login error: ${error.message}`)
      } else {
        toast.error('An unknown error occurred')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleLogin}>
        <h1 className={styles.title}>Login</h1>
        <div className={styles.inputGroup}>
          <input
            name="username"
            className={styles.input}
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            required
            disabled={isSubmitting}
          />
          {formErrors.username && (
            <div className={styles.errorMessage}>{formErrors.username}</div>
          )}
        </div>
        <button
          className={styles.button}
          type="submit"
          disabled={isSubmitting || !formData.username}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default LoginPage
