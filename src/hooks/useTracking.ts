import { useState } from 'react'
import { trackTrip } from '../api/client'
import type { TrackingResult } from '../types/data'

export function useTracking() {
  const [result, setResult] = useState<TrackingResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = async (code: string) => {
    setLoading(true)
    setError(null)
    try {
      const nextResult = await trackTrip(code)
      setResult(nextResult)
      return nextResult
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'تعذر تتبع الرحلة')
      throw reason
    } finally {
      setLoading(false)
    }
  }

  return { result, search, loading, error }
}
