'use client'
import { useRouter as useNextRouter } from 'next/navigation'
import { Route } from '../Route'

/**
 * @description 추후 type 오버라이딩이 있을 경우가 있기 떄문에, 재선언 해줌
 *
 * @example
 * "use client"
 * import { useRouter } from 'next/navigation'
 *
 * export default function Page() {
 *  const router = useRouter()
 *  router.push('/dashboard') // Navigate to /dashboard
 * }
 */
// eslint-disable-next-line
export const useRouter = <TypeRoute extends Route<any, any>>() => {
  const router = useNextRouter()
  return router
}
