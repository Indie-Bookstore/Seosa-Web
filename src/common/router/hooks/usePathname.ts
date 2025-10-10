'use client'
import { usePathname as useNextPathname } from 'next/navigation'
import { Route } from '../Route'

/**
 * @description
 * 추후 type 오버라이딩이 있을 경우가 있기 떄문에, 재선언 해줌
 *
 * @example
 * "use client"
 *
 * export default function Page() {
 *  const pathname = usePathname() // returns "/dashboard" on /dashboard?foo=bar
 * }
 */
export const usePathname = <TypeRoute extends Route<any, any>>() => {
  const pathname = useNextPathname() as TypeRoute['pathname']
  return pathname
}
