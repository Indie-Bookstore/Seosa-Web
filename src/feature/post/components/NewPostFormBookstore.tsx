"use client";

import { useFormContext } from "react-hook-form";
import type { NewPostForm } from "../types";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import LocationIcon from "../../../../public/icon/location.svg";
import TimeIcon from "../../../../public/icon/time.svg";
import CallIcon from "../../../../public/icon/call.svg";
import WorldIcon from "../../../../public/icon/world.svg";

const NewPostFormBookstore = () => {
  const { register, watch, setValue } = useFormContext<NewPostForm>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bookstore = watch("bookstore");
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: bookstore?.lat || 37.5665,
    lng: bookstore?.lng || 126.978,
  });
  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: bookstore?.lat || 37.5665,
    lng: bookstore?.lng || 126.978,
  });

  // bookstore 좌표가 변경되면 지도 중심과 마커 위치 업데이트
  useEffect(() => {
    if (bookstore?.lat && bookstore?.lng) {
      setMapCenter({ lat: bookstore.lat, lng: bookstore.lng });
      setMarkerPosition({ lat: bookstore.lat, lng: bookstore.lng });
    }
  }, [bookstore?.lat, bookstore?.lng]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setValue("bookstore.image", imageUrl);
    };
    reader.readAsDataURL(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // 지도 클릭 시 마커 위치 업데이트
  const handleMapClick = (_t: any, mouseEvent: kakao.maps.event.MouseEvent) => {
    const lat = mouseEvent.latLng.getLat();
    const lng = mouseEvent.latLng.getLng();

    setMarkerPosition({ lat, lng });
    setValue("bookstore.lat", lat);
    setValue("bookstore.lng", lng);

    // 좌표로 주소 검색 (카카오 주소 검색 API 사용 가능)
    // 여기서는 간단히 좌표만 저장
  };

  // 마커 드래그 종료 시 위치 업데이트
  const handleMarkerDragEnd = (marker: kakao.maps.Marker) => {
    const position = marker.getPosition();
    const lat = position.getLat();
    const lng = position.getLng();

    setMarkerPosition({ lat, lng });
    setValue("bookstore.lat", lat);
    setValue("bookstore.lng", lng);
  };

  return (
    <div className="flex flex-col w-full pt-[10px] pb-10 px-[18px] bg-[#F4F4F4]">
      <div className="text-[#666666] font-medium flex items-center h-12">
        서점 정보
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex justify-center">
          <div
            className="relative cursor-pointer w-full max-w-[324px] h-[174px] bg-gray-200 rounded flex items-center justify-center"
            onClick={handleImageClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleImageClick();
              }
            }}
          >
            {bookstore?.image ? (
              <Image
                src={bookstore.image}
                alt="bookstore"
                width={324}
                height={174}
                className="object-cover rounded"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-[#888888]">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M17 8L12 3M12 3L7 8M12 3V15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm">이미지 업로드</span>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex gap-[7px] items-center">
            <LocationIcon className="size-6" />
            <input
              {...register("bookstore.address")}
              type="text"
              placeholder="주소를 입력하세요"
              className="text-[11px] text-[#666666] font-normal flex-1 bg-transparent border-none outline-none placeholder:text-[#888888]"
            />
          </div>

          <div className="flex gap-[7px] items-center">
            <TimeIcon className="size-6" />
            <div className="flex gap-2 flex-1">
              <input
                {...register("bookstore.openDays")}
                type="text"
                placeholder="운영일 (예: 월,화,수)"
                className="text-[11px] text-[#666666] font-normal flex-1 bg-transparent border-none outline-none placeholder:text-[#888888]"
              />
              <span className="text-[11px] text-[#666666]">/</span>
              <input
                {...register("bookstore.openHours")}
                type="text"
                placeholder="운영시간 (예: 9:00~18:00)"
                className="text-[11px] text-[#666666] font-normal flex-1 bg-transparent border-none outline-none placeholder:text-[#888888]"
              />
            </div>
          </div>

          <div className="flex gap-[7px] items-center">
            <CallIcon className="size-6" />
            <input
              {...register("bookstore.phoneNumber")}
              type="text"
              placeholder="전화번호를 입력하세요"
              className="text-[11px] text-[#666666] font-normal flex-1 bg-transparent border-none outline-none placeholder:text-[#888888]"
            />
          </div>

          <div className="flex gap-[7px] items-center">
            <WorldIcon className="size-6" />
            <input
              {...register("bookstore.instagramLink")}
              type="text"
              placeholder="@instagram_id"
              className="text-[11px] text-[#666666] font-normal flex-1 bg-transparent border-none outline-none placeholder:text-[#888888]"
            />
          </div>
        </div>

        {/* 카카오맵 */}
        <div className="w-full h-[300px] rounded overflow-hidden">
          <Map
            center={mapCenter}
            style={{ width: "100%", height: "100%" }}
            level={4}
            onClick={handleMapClick}
          >
            <MapMarker
              position={markerPosition}
              draggable={true}
              onDragEnd={handleMarkerDragEnd}
            />
          </Map>
        </div>

        {/* 숨겨진 필드들 */}
        <input
          {...register("bookstore.postalCode")}
          type="hidden"
        />
        <input
          {...register("bookstore.detailedAddress")}
          type="hidden"
        />
        <input
          {...register("bookstore.lat", { valueAsNumber: true })}
          type="hidden"
        />
        <input
          {...register("bookstore.lng", { valueAsNumber: true })}
          type="hidden"
        />
        <input
          {...register("bookstore.kakaoPlaceId")}
          type="hidden"
        />
      </div>
    </div>
  );
};

export default NewPostFormBookstore;

