import axios from "axios";
import { getSession } from "next-auth/react";

/**
 * @description
 * next에서의 client 환경일때만 동작하는 axios 객체
 */
class ClientInstance {
  instance = axios.create({
    baseURL: "/api/proxy/seo-sa",
    adapter: "fetch",
  });

  constructor() {
    this.instance.interceptors.request.use(async (config) => {
      try {
        // 클라이언트 사이드에서 세션에서 토큰 가져오기
        const session = await getSession();

        if (session?.accessToken) {
          config.headers.Authorization = `Bearer ${session.accessToken}`;
        }
      } catch {
        // 토큰이 없을 수 있으므로 에러는 무시
      }

      return config;
    });
  }

  getInstance() {
    return this.instance;
  }
}

/* need to preserve singleton */
const clientInstance = new ClientInstance().getInstance();
export default clientInstance;
