"use client";

import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "@/common";
import { useCreatePostMutation } from "@/common/services/post";
import NewPostFormTitle from "./NewPostFormTitle";
import NewPostFormContent from "./NewPostFormContent";
import type { NewPostForm } from "../types";
import NewPostFormNarrative from "./NewPostFormNarrative";
import NewPostFormBookstore from "./NewPostFormBookstore";

const NewPostForm = () => {
  const router = useRouter();
  const createPostMutation = useCreatePostMutation();
  const methods = useForm<NewPostForm>({
    mode: "onChange",
    defaultValues: {
      title: "",
      location: "",
      content: [],
      bookstore: {
        postalCode: "",
        address: "",
        detailedAddress: "",
        lat: 0,
        lng: 0,
        kakaoPlaceId: "",
        openDays: "",
        openHours: "",
        phoneNumber: "",
        instagramLink: "",
        image: "",
      },
      products: [
        {
          productName: "",
          price: 0,
          productImg: "",
          description: "",
        },
      ],
    },
  });

  const onSubmit = async (data: NewPostForm) => {
    // 썸네일 URL 추출
    const thumbnailBlock = data.content.find(
      (block) => block.isThumbnail && block.type === "img_url"
    );
    const thumbnailUrl = thumbnailBlock?.content || "";

    // contentReqDtoList 변환
    const contentReqDtoList = data.content.map((block) => ({
      contentType: (block.type === "sentence" ? "sentence" : "img_url") as
        | "sentence"
        | "img_url",
      content: block.content,
      order_index: block.order_index,
    }));

    // productReqDtoList 변환 (빈 항목 제외)
    const productReqDtoList = data.products
      .filter(
        (product) =>
          product.productName.trim() !== "" || product.productImg !== ""
      )
      .map((product) => ({
        productName: product.productName,
        price: product.price,
        productImg: product.productImg,
        description: product.description,
      }));

    // bookstoreReqDto 변환
    const bookstoreReqDto = {
      postalCode: data.bookstore.postalCode,
      address: data.bookstore.address,
      detailedAddress: data.bookstore.detailedAddress,
      lat: data.bookstore.lat,
      lng: data.bookstore.lng,
      kakaoPlaceId: data.bookstore.kakaoPlaceId,
      openDays: data.bookstore.openDays,
      openHours: data.bookstore.openHours,
      phoneNumber: data.bookstore.phoneNumber,
      instagramLink: data.bookstore.instagramLink,
    };

    // 최종 DTO
    const requestDto = {
      title: data.title,
      location: data.location,
      thumbnailUrl: thumbnailUrl,
      bookstoreReqDto: bookstoreReqDto,
      contentReqDtoList: contentReqDtoList,
      productReqDtoList: productReqDtoList,
    };

    try {
      const response = await createPostMutation.mutateAsync(requestDto);
      // 성공 시 상세 페이지로 이동
      if (response.postId) {
        router.push(`/post/${response.postId}`);
      }
    } catch (error) {
      console.error("글 작성 실패:", error);
      alert("글 작성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col w-full h-full gap-5 relative overflow-y-auto"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <NewPostFormTitle />
        <NewPostFormContent />
        <NewPostFormNarrative />
        <NewPostFormBookstore />
        <button
          type="submit"
          disabled={createPostMutation.isPending}
          className="mt-4 mb-8 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {createPostMutation.isPending ? "제출 중..." : "제출하기"}
        </button>
      </form>
    </FormProvider>
  );
};

export default NewPostForm;
