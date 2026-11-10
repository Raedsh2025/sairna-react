import { useCallback, useEffect, useState } from 'react'
import { searchTrips } from '../api/client'
import type { SearchParams, Trip } from '../types/data'

export function useTrips(params: SearchParams) {
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { from, to, date, originId, destinationId } = params

  const load = useCallback(async () => {
    if (typeof originId !== 'number' || !Number.isInteger(originId) || originId < 1 || typeof destinationId !== 'number' || !Number.isInteger(destinationId) || destinationId < 1) {
      setTrips([])
      setError(null)
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      setTrips(await searchTrips({ from, to, date, originId, destinationId }))
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'تعذر تحميل الرحلات')
    } finally {
      setLoading(false)
    }
  }, [from, to, date, originId, destinationId])

  useEffect(() => {
    const task = window.setTimeout(() => void load(), 0)
    return () => window.clearTimeout(task)
  }, [load])

  return { trips, loading, error, retry: load }
}
