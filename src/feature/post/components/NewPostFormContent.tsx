"use client";

import { useRef, useCallback, useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import type { NewPostForm, ContentBlock } from "../types";

const NewPostFormContent = () => {
  const { setValue, watch } = useFormContext<NewPostForm>();
  const content = useMemo(() => watch("content") || [], [watch]);
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseEditorContent = useCallback(() => {
    if (!editorRef.current) return;

    const editor = editorRef.current;
    const blocks: ContentBlock[] = [];
    let orderIndex = 0;

    // 에디터의 모든 자식 노드를 순회
    const walkNodes = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent?.trim();
        if (text) {
          blocks.push({
            type: "sentence",
            content: text,
            order_index: orderIndex++,
          });
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        if (element.classList.contains("image-wrapper")) {
          const img = element.querySelector("img") as HTMLImageElement;
          const isThumbnail = element.dataset.thumbnail === "true";
          if (img) {
            blocks.push({
              type: "img_url",
              content: img.src,
              order_index: orderIndex++,
              isThumbnail: isThumbnail,
            });
          }
        } else if (
          element.tagName === "IMG" &&
          !element.closest(".image-wrapper")
        ) {
          // 기존 이미지 처리 (마이그레이션용)
          const img = element as HTMLImageElement;
          blocks.push({
            type: "img_url",
            content: img.src,
            order_index: orderIndex++,
          });
        } else {
          // 다른 요소의 자식 노드들도 순회
          Array.from(node.childNodes).forEach(walkNodes);
        }
      }
    };

    Array.from(editor.childNodes).forEach(walkNodes);
    setValue("content", blocks);
  }, [setValue]);

  // 대표 이미지 설정
  const handleSetThumbnail = useCallback(
    (imageId: string) => {
      if (!editorRef.current) return;

      // 모든 이미지의 대표 이미지 상태 해제
      const allWrappers = editorRef.current.querySelectorAll(".image-wrapper");
      allWrappers.forEach((wrapper) => {
        const element = wrapper as HTMLElement;
        element.dataset.thumbnail = "false";
        const btn = element.querySelector(".thumbnail-btn") as HTMLElement;
        if (btn) {
          btn.classList.remove("is-thumbnail");
        }
      });

      // 선택한 이미지를 대표 이미지로 설정
      const targetWrapper = editorRef.current.querySelector(
        `[data-image-id="${imageId}"]`
      ) as HTMLElement;
      if (targetWrapper) {
        targetWrapper.dataset.thumbnail = "true";
        const btn = targetWrapper.querySelector(
          ".thumbnail-btn"
        ) as HTMLElement;
        if (btn) {
          btn.classList.add("is-thumbnail");
        }
      }

      parseEditorContent();
    },
    [parseEditorContent]
  );

  // 이미지 삭제
  const handleDeleteImage = useCallback(
    (imageId: string) => {
      if (!editorRef.current) return;

      const targetWrapper = editorRef.current.querySelector(
        `[data-image-id="${imageId}"]`
      );
      if (targetWrapper) {
        targetWrapper.remove();
        parseEditorContent();
      }
    },
    [parseEditorContent]
  );

  // 이미지 삽입
  const insertImage = useCallback(
    (imageUrl: string) => {
      if (!editorRef.current) return;

      const imageId = `img-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      // 이미지 래퍼 생성
      const wrapper = document.createElement("div");
      wrapper.className = "image-wrapper relative group my-4";
      wrapper.dataset.imageId = imageId;
      wrapper.style.position = "relative";
      wrapper.style.display = "inline-block";
      wrapper.style.width = "100%";
      wrapper.style.maxWidth = "100%";
      wrapper.contentEditable = "false";
      wrapper.onmousedown = (e) => {
        e.preventDefault();
        e.stopPropagation();
      };
      wrapper.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
      };

      // 이미지 생성
      const img = document.createElement("img");
      img.src = imageUrl;
      img.style.maxWidth = "100%";
      img.style.height = "auto";
      img.style.display = "block";
      img.style.width = "100%";
      img.contentEditable = "false";
      img.draggable = false;

      // 컨트롤 버튼 컨테이너
      const controlsContainer = document.createElement("div");
      controlsContainer.className =
        "image-controls absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity";
      controlsContainer.style.zIndex = "10";
      controlsContainer.contentEditable = "false";
      controlsContainer.onmousedown = (e) => {
        e.preventDefault();
        e.stopPropagation();
      };
      controlsContainer.onclick = (e) => {
        e.stopPropagation();
      };

      // 대표 이미지 버튼
      const thumbnailBtn = document.createElement("button");
      thumbnailBtn.type = "button";
      thumbnailBtn.className = "thumbnail-btn";
      thumbnailBtn.contentEditable = "false";
      thumbnailBtn.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>대표 이미지</span>
      `;
      thumbnailBtn.onmousedown = (e) => {
        e.preventDefault();
        e.stopPropagation();
      };
      thumbnailBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSetThumbnail(imageId);
      };

      // 삭제 버튼
      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "delete-btn";
      deleteBtn.contentEditable = "false";
      deleteBtn.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3L9 9M9 3L3 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>삭제</span>
      `;
      deleteBtn.onmousedown = (e) => {
        e.preventDefault();
        e.stopPropagation();
      };
      deleteBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleDeleteImage(imageId);
      };

      controlsContainer.appendChild(thumbnailBtn);
      controlsContainer.appendChild(deleteBtn);
      wrapper.appendChild(img);
      wrapper.appendChild(controlsContainer);

      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(wrapper);
        range.setStartAfter(wrapper);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      } else if (editorRef.current) {
        editorRef.current.appendChild(wrapper);
      }

      // 내용 파싱하여 폼에 저장
      setTimeout(() => {
        parseEditorContent();
      }, 0);
    },
    [parseEditorContent, handleSetThumbnail, handleDeleteImage]
  );

  // 파일 선택 핸들러
  const handleFileSelect = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        insertImage(imageUrl);
      };
      reader.readAsDataURL(file);
    },
    [insertImage]
  );

  // 파일 입력 변경 핸들러
  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFileSelect(file);
      }
      // 같은 파일을 다시 선택할 수 있도록 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [handleFileSelect]
  );

  // 이미지 업로드 버튼 클릭
  const handleImageUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // 에디터 입력 핸들러
  const handleInput = useCallback(() => {
    parseEditorContent();
  }, [parseEditorContent]);

  // 에디터 포커스 핸들러
  const handleFocus = useCallback(() => {
    // 포커스 시 필요한 로직이 있다면 여기에 추가
  }, []);

  // 에디터 클릭 핸들러
  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    // 이미지 래퍼나 컨트롤 영역 클릭 시 에디터 포커스 방지
    if (
      target.closest(".image-wrapper") ||
      target.closest(".image-controls") ||
      target.closest("button")
    ) {
      e.preventDefault();
      return;
    }
  }, []);

  // 초기 렌더링
  useEffect(() => {
    if (content.length === 0 && editorRef.current) {
      editorRef.current.innerHTML = "";
    }
  }, [content.length]);

  return (
    <div className="flex flex-col w-full pt-[30px] pb-[40px]">
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onFocus={handleFocus}
        onClick={handleClick}
        className="editor-content whitespace-pre-wrap break-words outline-none"
        data-placeholder="아티클 내용을 적어주세요."
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={handleImageUploadClick}
        className="absolute bottom-6 right-6 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow z-10"
        aria-label="이미지 업로드"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <path
            d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M17 8L12 3M12 3L7 8M12 3V15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default NewPostFormContent;
