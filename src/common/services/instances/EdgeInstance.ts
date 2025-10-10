import axios from 'axios'

/**
 * @description
 * next에서의 edge 환경(middleware)일때만 동작하는 axios 객체
 */
class EdgeInstance {
  instance = axios.create({
    baseURL: `${process.env.MAIN_SERVER_URL}`,
    adapter: 'fetch',
  })

  getInstance() {
    return this.instance
  }
}

/* need to preserve singleton */
const edgeInstance = new EdgeInstance().getInstance()
export default edgeInstance
