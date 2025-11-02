import axios from 'axios'

/**
 * @description
 * next에서의 node 환경(ssr + api)일때만 동작하는 axios 객체
 */
class NodeJSInstance {
  instance = axios.create({
    baseURL: `${process.env.MAIN_SERVER_URL}`,
    adapter: 'fetch',
  })

  constructor() {
    this.instance.interceptors.request.use(async (config) => {
      try {
        // 동적으로 auth 함수를 import하여 순환 참조 방지
        const { auth } = await import('../../../../auth')
        const session = await auth()
        
        if (session?.accessToken) {
          config.headers.Authorization = `Bearer ${session.accessToken}`
        }
      } catch {
        // 토큰이 없을 수 있으므로 에러는 무시
      }
      
      return config
    })
  }

  getInstance() {
    return this.instance
  }
}

/* need to preserve singleton */
const nodeJSInstance = new NodeJSInstance().getInstance()
export default nodeJSInstance
