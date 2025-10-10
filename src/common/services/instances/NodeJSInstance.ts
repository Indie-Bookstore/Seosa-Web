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

  getInstance() {
    return this.instance
  }
}

/* need to preserve singleton */
const nodeJSInstance = new NodeJSInstance().getInstance()
export default nodeJSInstance
