import type { AuthResponse, BookingRequest, BookingResponse, City, Company, SearchParams, TrackingResult, Trip } from '../types/data'
import { mockTracking, trips as mockTrips } from '../types/data'

const API_BASE_URL = (import.meta.env.VITE_WEBSITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') ||
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '')
const TOKEN_KEY = 'sairna-website-token'

export class ApiError extends Error {
  readonly status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.status = status
    this.name = 'ApiError'
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  if (!API_BASE_URL) throw new ApiError('API base URL is not configured')
  const token = localStorage.getItem(TOKEN_KEY)
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options?.headers },
  })
  const body = await response.json().catch(() => null)
  if (!response.ok) throw new ApiError(body?.message || `Request failed with status ${response.status}`, response.status)
  return (body?.value ?? body?.data ?? body) as T
}

function mockDelay<T>(value: T): Promise<T> {
  return new Promise((resolve) => window.setTimeout(() => resolve(value), 220))
}

export async function searchTrips(params: SearchParams): Promise<Trip[]> {
  if (!API_BASE_URL) return mockDelay(mockTrips)
  const query = new URLSearchParams({
    originId: String(params.originId ?? params.from),
    destinationId: String(params.destinationId ?? params.to),
    date: params.date,
  }).toString()
  const trips = await request<LiveTrip[]>(`/trips?${query}`)
  return trips.map(normalizeTrip)
}

export async function createBooking(payload: BookingRequest): Promise<BookingResponse> {
  if (!API_BASE_URL) return mockDelay({ id: payload.tripId, status: 'confirmed' })
  return request<BookingResponse>('/bookings', { method: 'POST', body: JSON.stringify(payload) })
}

export async function trackTrip(code: string): Promise<TrackingResult> {
  if (!API_BASE_URL) return mockDelay({ ...mockTracking, code })
  const trip = await request<LiveTrip>(`/trips/${encodeURIComponent(code)}`)
  const departure = new Date(trip.departureAt)
  const arrival = new Date(trip.arrivalAt)
  return {
    code: trip.code || code,
    status: 'الرحلة مجدولة',
    updatedAt: 'آخر تحديث من النظام',
    progress: departure.getTime() <= Date.now() ? 50 : 0,
    location: trip.origin?.name || 'نقطة الانطلاق',
    remaining: 'تفاصيل الرحلة متاحة',
    arrival: arrival.toLocaleTimeString('ar-SY', { hour: '2-digit', minute: '2-digit' }),
  }
}

export async function healthCheck(): Promise<unknown> {
  const healthUrl = (import.meta.env.VITE_HEALTH_API_URL as string | undefined) || 'https://sairna.abdulrahman-hares.com/api/v1/health'
  const response = await fetch(healthUrl)
  if (!response.ok) throw new ApiError(`Health check failed with status ${response.status}`, response.status)
  return response.json()
}

export async function authenticate(payload: { email: string; password: string; name?: string }): Promise<{ token: string }> {
  if (!API_BASE_URL) return mockDelay({ token: 'mock-token' })
  const path = payload.name ? '/auth/register' : '/auth/login'
  const result = await request<AuthResponse>(path, { method: 'POST', body: JSON.stringify(payload) })
  const token = result.token || (result as AuthResponse & { accessToken?: string }).accessToken || ''
  if (token) localStorage.setItem(TOKEN_KEY, token)
  return { token }
}

export async function getCities(): Promise<City[]> {
  if (!API_BASE_URL) return mockDelay(['دمشق', 'حلب', 'حمص', 'اللاذقية', 'طرطوس', 'حماة'].map((name, id) => ({ id: id + 1, name })))
  return request<City[]>('/cities')
}

export async function getCompanies(): Promise<Company[]> {
  if (!API_BASE_URL) return mockDelay([])
  return request<Company[]>('/companies')
}

export async function getMyBookings(): Promise<unknown[]> {
  if (!API_BASE_URL) return mockDelay([])
  return request<unknown[]>('/bookings/me')
}

type LiveTrip = {
  id: number
  code: string
  companyId: number
  originId: number
  destinationId: number
  departureAt: string
  arrivalAt: string
  price: number
  availableSeats?: number
  company?: { name: string; logoUrl?: string }
  origin?: { name: string }
  destination?: { name: string }
}

function normalizeTrip(trip: LiveTrip): Trip {
  const departure = new Date(trip.departureAt)
  const arrival = new Date(trip.arrivalAt)
  const minutes = Math.max(0, Math.round((arrival.getTime() - departure.getTime()) / 60000))
  return {
    id: trip.code || String(trip.id),
    backendId: trip.id,
    company: trip.company?.name || 'شركة النقل',
    logo: trip.company?.name?.slice(0, 1) || 'س',
    time: departure.toLocaleTimeString('ar-SY', { hour: '2-digit', minute: '2-digit' }),
    arrival: arrival.toLocaleTimeString('ar-SY', { hour: '2-digit', minute: '2-digit' }),
    duration: `${Math.floor(minutes / 60)}س ${minutes % 60}د`,
    price: new Intl.NumberFormat('ar-SY').format(trip.price),
    seats: trip.availableSeats ?? 0,
    color: '#0aa99b',
    originId: trip.originId,
    destinationId: trip.destinationId,
    originName: trip.origin?.name,
    destinationName: trip.destination?.name,
  }
}
