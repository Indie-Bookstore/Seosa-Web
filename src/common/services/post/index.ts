import { queryOptions } from "@tanstack/react-query";
import { instance } from "../instances";

export type PaginatedMainPostListParams = {
  page: number;
  size: number;
  sort: string[];
};

export type PostListItem = {
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
  posts: PostListItem[];
  cursorId: number;
  hasNext: boolean;
};

export const getPostList = async ({
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
          "https://cdn.pixabay.com/photo/2016/11/21/12/59/couch-1845270_1280.jpg",
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
          "https://cdn.pixabay.com/photo/2016/11/21/12/59/couch-1845270_1280.jpg",
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

export const getPostListOptions = ({
  page,
  size,
  sort,
}: PaginatedMainPostListParams) => {
  return queryOptions({
    queryKey: ["mainPostList", page, size, sort],
    queryFn: () => getPostList({ page, size, sort }),
  });
};

export type PostDetail = {
  postId: number;
  title: string;
  location: string;
  thumbnailUrl: string | null;
  createdAt: string;
  bookstoreResDto: {
    bookstoreId: number;
    postalCode: string;
    address: string;
    detailedAddress: string;
    lat: number;
    lng: number;
    kakaoPlaceId: string;
    openDays: string;
    openHours: string;
    phoneNumber: string;
    instagramLink: string;
  };
  contentResDtoList: {
    contentId: number;
    contentType: "sentence" | "img_url";
    // 글 or img url
    content: string;
    order_index: number;
  }[];
  productResDtoList: {
    productId: number;
    productName: string;
    price: number;
    productImg: string;
    description: string;
  }[];
  userId: number;
  nickname: string;
  userRole: string;
  profileUrl: string;
  isBookmarked: boolean;
};

type PostDetailResponse = PostDetail;

export const getPostDetail = async ({
  postId,
}: {
  postId: number;
}): Promise<PostDetailResponse> => {
  // const response = await instance.get(`/post/${postId}`);
  // return response.data;

  const mockData: PostDetailResponse = {
    postId: 7,
    title: "성수동 감성 책공방",
    location: "서울 성동구",
    thumbnailUrl: null,
    createdAt: "2025-03-18 18:29",
    bookstoreResDto: {
      bookstoreId: 7,
      postalCode: "04790",
      address: "서울 성동구 연무장길",
      detailedAddress: "성수동 카페거리 안쪽",
      lat: 37.515628,
      lng: 127.056871,
      kakaoPlaceId: "1234567890",
      openDays: "수~일",
      openHours: "10:00~19:00",
      phoneNumber: "02-8888-2222",
      instagramLink: "https://instagram.com/seongsu.booklab",
    },
    contentResDtoList: [
      {
        contentId: 20,
        contentType: "sentence",
        content: "책도 만들고 책도 파는, 공방 같은 서점입니다.",
        order_index: 0,
      },
      {
        contentId: 21,
        contentType: "img_url",
        content:
          "https://cdn.pixabay.com/photo/2016/11/21/12/59/couch-1845270_1280.jpg",
        order_index: 1,
      },
      {
        contentId: 22,
        contentType: "sentence",
        content: "직접 제본한 독립출판물도 만나볼 수 있어요.",
        order_index: 2,
      },
    ],
    productResDtoList: [
      {
        productId: 14,
        productName: "성수 제본 키트",
        price: 14000,
        productImg:
          "https://cdn.pixabay.com/photo/2016/11/21/12/59/couch-1845270_1280.jpg",
        description: "책을 직접 만들어볼 수 있는 키트",
      },
      {
        productId: 15,
        productName: "소책자 모음집",
        price: 12000,
        productImg:
          "https://cdn.pixabay.com/photo/2016/11/21/12/59/couch-1845270_1280.jpg",
        description: "독립 작가들의 소형 책자 세트",
      },
    ],
    userId: 2,
    nickname: "서사테스트01",
    userRole: "EDITOR",
    profileUrl:
      "https://cdn.pixabay.com/photo/2016/11/21/12/59/couch-1845270_1280.jpg",
    isBookmarked: true,
  };

  return await instance.mock(`/post/${postId}`, mockData);
};

export const getPostDetailOptions = ({ postId }: { postId: number }) => {
  return queryOptions({
    queryKey: ["postDetail", postId],
    queryFn: () => getPostDetail({ postId }),
  });
};

export type Comment = {
  userId: number;
  isMyComment: boolean;
  name: string;
  profileImgUrl: string;
  commentId: number;
  text: string;
  createdAt: string;
  updatedAt: string;
  postId: number;
};

type CommentListResponse = Comment[];

export const getCommentList = async ({
  postId,
}: {
  postId: number;
}): Promise<CommentListResponse> => {
  // const response = await instance.get(`/comment/post/${postId}`);
  // return response.data;

  const mockData: CommentListResponse = [
    {
      userId: 1,
      isMyComment: true,
      name: "작성자1",
      profileImgUrl:
        "https://cdn.pixabay.com/photo/2016/11/21/12/59/couch-1845270_1280.jpg",
      commentId: 1,
      text: "댓글 테스트 1",
      createdAt: "2025-03-18 18:29",
      updatedAt: "2025-03-18 18:29",
      postId: postId,
    },
    {
      userId: 0,
      isMyComment: true,
      name: "작성자2",
      profileImgUrl:
        "https://cdn.pixabay.com/photo/2016/11/21/12/59/couch-1845270_1280.jpg",
      commentId: 2,
      text: "댓글 테스트 2",
      createdAt: "2025-11-02T13:27:05.888Z",
      updatedAt: "2025-11-02T13:27:05.888Z",
      postId: postId,
    },
  ];

  return await instance.mock(`/comment/post/${postId}`, mockData);
};

export const getCommentListOptions = ({ postId }: { postId: number }) => {
  return queryOptions({
    queryKey: ["commentList", postId],
    queryFn: () => getCommentList({ postId }),
  });
};
