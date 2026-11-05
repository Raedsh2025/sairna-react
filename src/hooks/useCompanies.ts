import { useCallback, useEffect, useState } from 'react'
import { getCompanies } from '../api/client'
import type { Company } from '../types/data'

export function useCompanies() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setCompanies(await getCompanies())
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'تعذر تحميل شركات النقل')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const task = window.setTimeout(() => void load(), 0)
    return () => window.clearTimeout(task)
  }, [load])

  return { companies, loading, error, retry: load }
}
