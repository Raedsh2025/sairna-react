import { useState } from 'react'
import { authenticate, getCurrentUser } from '../api/client'
import { useAppStore } from '../store/appStore'

export function useAuth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const setAuthenticated = useAppStore((state) => state.setAuthenticated)
  const setUserName = useAppStore((state) => state.setUserName)

  const submit = async (payload: { email: string; password: string; name?: string }) => {
    setLoading(true)
    setError(null)
    try {
      const result = await authenticate(payload)
      const user = result.user ?? await getCurrentUser().catch(() => undefined)
      setAuthenticated(true)
      setUserName(user?.name || payload.name || payload.email.split('@')[0] || 'المستخدم')
      return result
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'تعذر إتمام العملية')
      throw reason
    } finally {
      setLoading(false)
    }
  }

  return { submit, loading, error }
}
