'use client'
import { useSearchParams as useNextSearchParams } from 'next/navigation'
import { Route } from '../Route'

type GetRouteQueryParams<T> = T extends Route<any, infer Q> ? Q : never

/**
 * @description
 * Route 객체를 활용하여 searchParams의 type 추론이 가능한 형태로 만들어 줌.
 *
 * @example
 * const detailPageRoute = new Route<{ id: string }, { hello: string }>('/[id]')
 *
 * export default function Page() {
 *   const searchParams = useSearchParams()
 *   searchParams.get('hello') // hello 타입 추론 및 return string | undefined
 * }
 */
export const useSearchParams = <TypeRoute extends Route<any, any>>() => {
  const searchParams = useNextSearchParams()

  return searchParams as Omit<ReturnType<typeof useNextSearchParams>, 'get'> & {
    /** TODO: 일단 get만 구현 해놓음. 나머지는 사용 시점에서 구현 예정 */
    get: (name: keyof GetRouteQueryParams<TypeRoute>) => undefined | string
  }
}
