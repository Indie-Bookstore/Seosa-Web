"use client";

import { X } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import type { NewPostForm } from "../types";

const NewPostFormNarrative = () => {
  const { control } = useFormContext<NewPostForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const addNarrativeItem = () => {
    append({
      productName: "",
      price: 0,
      productImg: "",
      description: "",
    });
  };

  return (
    <div className="flex flex-col gap-[10px] pt-[10px] pb-[40px]">
      <div className="flex justify-between items-center w-full h-12">
        <span className="font-medium text-[#666666]">서사 모아보기</span>
        <button
          type="button"
          className="text-primary font-medium px-3 py-2 bg-[#E2E7E3] rounded-[17px]"
          onClick={addNarrativeItem}
        >
          추가
        </button>
      </div>

      <div className="flex flex-col">
        {fields.map((field, index) => (
          <NarrativeItem
            key={field.id}
            index={index}
            removeNarrativeItem={() => remove(index)}
          />
        ))}
      </div>
    </div>
  );
};

const NarrativeItem = ({
  index,
  removeNarrativeItem,
}: {
  index: number;
  removeNarrativeItem: () => void;
}) => {
  const { register, watch, setValue } = useFormContext<NewPostForm>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const productImg = watch(`products.${index}.productImg`);

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
      setValue(`products.${index}.productImg`, imageUrl);
    };
    reader.readAsDataURL(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className="flex gap-[15px] h-full pt-5 pb-5"
      style={{ borderTop: index > 0 ? `1px solid #E1E1E1` : "none" }}
    >
      <div
        className="relative cursor-pointer"
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
        <Image
          src={productImg || "/icon/narrative-default.png"}
          alt="narrative-item"
          width={86}
          height={86}
          className="object-cover rounded"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <div className="flex flex-col flex-1 justify-between pt-1 pb-[17px]">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between h-[17px]">
            <input
              {...register(`products.${index}.productName`)}
              type="text"
              placeholder="상품명"
              className="text-[13px] font-medium text-[#111111] placeholder:text-[#888888] flex-1"
            />

            {index > 0 && (
              <X
                role="button"
                className="text-[#888888] size-4"
                onClick={removeNarrativeItem}
              />
            )}
          </div>
          <div className="flex gap-2 items-center">
            <input
              {...register(`products.${index}.price`, { valueAsNumber: true })}
              type="number"
              placeholder="가격"
              className="text-[10px] font-medium text-[#111111] placeholder:text-[#888888] w-20"
            />
            <span className="text-[10px] text-[#888888]">원</span>
          </div>
        </div>
        <input
          {...register(`products.${index}.description`)}
          type="text"
          placeholder='"한줄 설명"'
          className="text-[10px] font-medium text-[#111111] placeholder:text-[#888888]"
        />
      </div>
    </div>
  );
};

export default NewPostFormNarrative;
