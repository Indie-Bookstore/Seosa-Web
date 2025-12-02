"use client";

import React, { useState } from "react";
import Bookmark from "../../../../public/icon/bookmark.svg";
import Edit from "../../../../public/icon/edit.svg";
import Comment from "../../../../public/icon/comment-sub.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/ui/Tab";
import cn from "@/common/util/style";
import PostList from "./PostList";

const Tab = () => {
  const [value, setValue] = useState<"bookmark" | "comment" | "edit">(
    "bookmark"
  );
  const tabList = [
    {
      value: "edit",
      icon: <Edit className="size-5 flex-1" />,
    },
    {
      value: "bookmark",
      icon: <Bookmark className="size-6 flex-1" />,
    },
    {
      value: "comment",
      icon: <Comment className="size-5 flex-1" />,
    },
  ];

  return (
    <Tabs className="flex gap-0">
      <TabsList className="flex w-full pt-4 h-16 bg-primary">
        {tabList.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            className={cn(
              "flex flex-1 items-center justify-center h-full",
              value === item.value &&
                "text-[#FFEEAA] border-b-[2px] border-[#FFEEAA]",
              value !== item.value &&
                "text-white border-b-[2px] border-transparent"
            )}
            onClick={() =>
              setValue(item.value as "bookmark" | "comment" | "edit")
            }
          >
            {item.icon}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={value}>
        <PostList value={value} />
      </TabsContent>
    </Tabs>
  );
};

export default Tab;
