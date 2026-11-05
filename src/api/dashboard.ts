import { ApiError } from './client'

const BASE_URL = (
  (import.meta.env.VITE_DASHBOARD_API_BASE_URL as string | undefined)
    || 'https://sairna.abdulrahman-hares.com/api/v1/dashboard'
).replace(/\/$/, '')
const TOKEN_KEY = 'sairna-dashboard-token'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  if (!BASE_URL) throw new ApiError('Dashboard API base URL is not configured')
  const token = localStorage.getItem(TOKEN_KEY)
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options?.headers },
  })
  const body = await response.json().catch(() => null)
  if (!response.ok) throw new ApiError(body?.message || `Request failed with status ${response.status}`, response.status)
  return (body?.value ?? body?.data ?? body) as T
}

export async function dashboardLogin(email: string, password: string): Promise<{ token: string }> {
  const result = await request<{ token?: string; accessToken?: string; data?: { token?: string; accessToken?: string } }>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })
  const token = result.token || result.accessToken || result.data?.token || result.data?.accessToken || ''
  if (!token) throw new ApiError('لم يُرجع الخادم رمز دخول صالحًا')
  localStorage.setItem(TOKEN_KEY, token)
  return { token }
}

export const dashboardApi = {
  overview: () => request<unknown>('/overview'),
  cities: () => request<unknown[]>('/cities'),
  companies: () => request<unknown[]>('/companies'),
  trips: () => request<unknown[]>('/trips'),
  bookings: () => request<unknown[]>('/bookings'),
  users: () => request<unknown[]>('/users'),
}
