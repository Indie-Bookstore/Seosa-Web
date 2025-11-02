import { queryOptions } from "@tanstack/react-query";
import { instance } from "../instances";

export type PaginatedMainPostListParams = {
  page: number;
  size: number;
  sort: string[];
};

export type Post = {
  postId: number;
  title: string;
  thumbnailUrl: string;
  userId: number;
  userName: string;
  createdAt: string;
  bookmarkCount: number;
  commentCount: number;
};

export type PaginatedMainPostListResponse = {
  posts: Post[];
  cursorId: number;
  hasNext: boolean;
};

export const getMainPostList = async ({
  page,
  size,
  sort,
}: PaginatedMainPostListParams): Promise<PaginatedMainPostListResponse> => {
  // const response = await instance.get(`/post/main`, {
  //     params: { page, size, sort },
  //   });

  //   return response.data;

  const mockData: PaginatedMainPostListResponse = {
    posts: [
      {
        postId: 1,
        title: "테스트 글 제목 1",
        thumbnailUrl:
          "'https://cdn.pixabay.com/photo/2016/11/21/12/59/couch-1845270_1280.jpg'",
        userId: 1,
        userName: "작성자1",
        createdAt: "2024-01-01T00:00:00Z",
        bookmarkCount: 10,
        commentCount: 5,
      },
      {
        postId: 2,
        title: "테스트 글 제목 2",
        thumbnailUrl:
          "'https://cdn.pixabay.com/photo/2016/11/21/12/59/couch-1845270_1280.jpg'",
        userId: 2,
        userName: "작성자2",
        createdAt: "2024-01-02T00:00:00Z",
        bookmarkCount: 20,
        commentCount: 10,
      },
    ],
    cursorId: 2,
    hasNext: false,
  };

  return await instance.mock(`/post/main`, mockData);
};

export const getMainPostListOptions = ({
  page,
  size,
  sort,
}: PaginatedMainPostListParams) => {
  return queryOptions({
    queryKey: ["mainPostList", page, size, sort],
    queryFn: () => getMainPostList({ page, size, sort }),
  });
};
