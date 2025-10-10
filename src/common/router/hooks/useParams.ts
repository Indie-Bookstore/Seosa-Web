'use client'
import { useParams as useNextParams } from 'next/navigation'
import { Route } from '../Route'

type GetRouteParams<T> = T extends Route<infer P, any> ? P : never

/**
 * @description
 * Route 객체를 활용하여 type 추론이 가능한 형태로 만들어 줌.
 *
 * @example
 * const detailPageRoute = new Route<{ id: string }, undefined>('/[id]')
 *
 * export default function Page() {
 *   const { id } = useParams<typeof detailPageRoute>() // type 추론 가능
 * }
 */
export const useParams = <TypeRoute extends Route<any, any>>() => {
  const params = useNextParams<GetRouteParams<TypeRoute>>()
  return params
}
