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

export type AuthResponse = { token: string; user?: { id: number; name: string; email: string } }

export const cities = ['دمشق', 'حلب', 'حمص', 'اللاذقية', 'طرطوس', 'حماة']

export const trips: Trip[] = [
  { id: 'SR-204', company: 'السورية للنقل', logo: 'س', time: '06:30', arrival: '11:45', duration: '5س 15د', price: '85,000', seats: 8, color: '#0aa99b' },
  { id: 'SR-318', company: 'الفرات للسياحة', logo: 'ف', time: '08:15', arrival: '13:10', duration: '4س 55د', price: '92,000', seats: 12, color: '#4673b8' },
  { id: 'SR-411', company: 'نجمة الشام', logo: 'ن', time: '10:00', arrival: '15:30', duration: '5س 30د', price: '78,000', seats: 4, color: '#d98245' },
]

export const mockTracking: TrackingResult = {
  code: 'SR-204',
  status: 'الرحلة على الطريق',
  updatedAt: 'آخر تحديث منذ دقيقتين',
  progress: 62,
  location: 'وصلت حماة',
  remaining: 'متبقي 2س 05د',
  arrival: '11:45',
}

export function hashToView(hash: string): View {
  const value = hash.replace('#', '')
  if (value === 'results' || value === 'booking' || value === 'tracking' || value === 'auth' || value === 'admin-login' || value === 'login' || value === 'register') {
    return value === 'login' || value === 'register' ? 'auth' : value
  }
  return 'home'
}
