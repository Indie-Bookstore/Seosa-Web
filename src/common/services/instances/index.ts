import { AxiosInstance } from 'axios'
import clientInstance from './ClientInstance'
import edgeInstance from './EdgeInstance'
import nodeJSInstance from './NodeJSInstance'

type UtilAxiosInstance = AxiosInstance & {
  mock: (url: string, dataMock: any) => Promise<any>
}

/**
 * @description
 * Axios 객체에 util 함수 삽입/확장 하기 위해 만들 util
 */
const extendAxios = (instance: AxiosInstance): UtilAxiosInstance => {
  const newInstance = Object.assign(instance, {
    mock: (url: string, dataMock?: any) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(dataMock)
        }, 500)
      })
    },
  })
  return newInstance
}

/**
 * @description
 * Next.js의 환경에 따라 다른 인스턴스를 반환합니다.
 * 각 환경에 따라 다른 instance를 바라보는게 아닌,
 * 한 객체로 관리하기 위해 wrapping이 되어져 있습니다.
 *
 * @example
 * NEXT_RUNTIME은 edge, nodejs, undefined 중 하나입니다.
 * edge 환경(middleware)에서는 EdgeInstance를 사용하고,
 * 서버 환경(node)에서는 NodeJSInstance를 사용하고,
 * 클라이언트 환경에서는 ClientInstance를 사용합니다.
 */
const setInstance = (): UtilAxiosInstance | never => {
  if (typeof window !== 'undefined')
    return extendAxios(clientInstance) /* guard for client side */

  switch (process.env.NEXT_RUNTIME) {
    case 'edge':
      return extendAxios(edgeInstance)
    case 'nodejs':
      return extendAxios(nodeJSInstance)
    default:
      throw new Error(
        `unknown NEXT_RUNTIME detected: ${process.env.NEXT_RUNTIME}`,
      )
  }
}

export const instance = setInstance()
