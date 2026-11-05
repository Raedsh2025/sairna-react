import { useCallback, useEffect, useState } from 'react'
import { getCities } from '../api/client'
import type { City } from '../types/data'

export function useCities() {
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setCities(await getCities())
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'تعذر تحميل المدن')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const task = window.setTimeout(() => void load(), 0)
    return () => window.clearTimeout(task)
  }, [load])

  return { cities, loading, error, retry: load }
}
