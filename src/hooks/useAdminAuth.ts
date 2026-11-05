import { useState } from 'react'
import { dashboardLogin } from '../api/dashboard'

export function useAdminAuth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      return await dashboardLogin(email, password)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'تعذر تسجيل دخول الإدارة')
      throw reason
    } finally {
      setLoading(false)
    }
  }

  return { submit, loading, error }
}
