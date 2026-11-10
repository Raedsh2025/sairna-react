export type View = 'home' | 'results' | 'booking' | 'companies' | 'tracking' | 'auth' | 'admin-login'

export type Trip = {
  id: string
  backendId?: number
  company: string
  companyId?: number | string
  logo: string
  time: string
  arrival: string
  duration: string
  price: string
  seats: number
  color: string
  originId?: number
  destinationId?: number
  originName?: string
  destinationName?: string
}

export type SearchParams = {
  from: string
  to: string
  date: string
  originId?: number
  destinationId?: number
}

export type TrackingResult = {
  code: string
  status: string
  updatedAt: string
  progress: number
  location: string
  remaining: string
  arrival: string
}

export type BookingRequest = {
  tripId: number
  seats: Array<{ seatNumber: number; passengerName: string; passengerPhone: string }>
}

export type BookingResponse = {
  id: string | number
  status: 'confirmed'
}

export type City = { id: number; name: string; latitude?: number; longitude?: number }
export type Company = {
  id: number | string
  name: string
  logoUrl?: string | null
  isActive?: boolean
  rating?: string | number
  tag?: string
  features?: string[]
  about?: string
}

export type AuthUser = { id: number; name: string; email: string; role?: string }
export type AuthResponse = { token: string; user?: AuthUser }

export function hashToView(hash: string): View {
  const value = hash.replace('#', '')
  if (value === 'results' || value === 'booking' || value === 'tracking' || value === 'auth' || value === 'admin-login' || value === 'login' || value === 'register') {
    return value === 'login' || value === 'register' ? 'auth' : value
  }
  return 'home'
}
