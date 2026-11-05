import { useState } from 'react'
import { createBooking } from '../api/client'
import type { BookingRequest, BookingResponse } from '../types/data'

export function useBooking() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (payload: BookingRequest): Promise<BookingResponse> => {
    setLoading(true)
    setError(null)
    try {
      return await createBooking(payload)
    } catch (reason) {
      const message = reason instanceof Error ? reason.message : 'تعذر تأكيد الحجز'
      setError(message)
      throw reason
    } finally {
      setLoading(false)
    }
  }

  return { submit, loading, error }
}
