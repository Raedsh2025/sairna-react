import type { View } from './types/data'

export const viewPaths: Record<View, string> = {
  home: '/',
  results: '/results',
  booking: '/booking',
  tracking: '/tracking',
  auth: '/auth',
  'admin-login': '/admin-login',
}

export function pathToView(pathname: string): View {
  const entry = Object.entries(viewPaths).find(([, path]) => path === pathname)
  return (entry?.[0] as View | undefined) ?? 'home'
}
