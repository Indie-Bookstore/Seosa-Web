import axios from "axios";

/**
 * @description
 * next에서의 client 환경일때만 동작하는 axios 객체
 */
class ClientInstance {
  instance = axios.create({
    baseURL: "/api/proxy/seo-sa",
    adapter: "fetch",
  });

  getInstance() {
    return this.instance;
  }
}

/* need to preserve singleton */
const clientInstance = new ClientInstance().getInstance();
export default clientInstance;
