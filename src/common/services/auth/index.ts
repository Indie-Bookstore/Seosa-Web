import { instance } from "../instances";

export const checkNickname = async (nickname: string) => {
  const response = await instance.get(`/user/checkNickname`, {
    params: { nickname },
  });
  return response.data;
};
