import { useState } from 'react'
import { authenticate } from '../api/client'

export function useAuth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (payload: { email: string; password: string; name?: string }) => {
    setLoading(true)
    setError(null)
    try {
      return await authenticate(payload)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'تعذر إتمام العملية')
      throw reason
    } finally {
      setLoading(false)
    }
  }

  return { submit, loading, error }
}
