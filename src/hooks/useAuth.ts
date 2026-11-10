import { useState } from 'react'
import { authenticate } from '../api/client'
import { useAppStore } from '../store/appStore'

export function useAuth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const setAuthenticated = useAppStore((state) => state.setAuthenticated)

  const submit = async (payload: { email: string; password: string; name?: string }) => {
    setLoading(true)
    setError(null)
    try {
      const result = await authenticate(payload)
      setAuthenticated(true)
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
