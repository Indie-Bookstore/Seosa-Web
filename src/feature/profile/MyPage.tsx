import React from "react";
import MyPageHeader from "./components/MyPageHeader";
import Profile from "./components/Profile";
import PostListServerContainer from "./container/server/PostListServerContainer";

const MyPage = () => {
  return (
    <div className="flex flex-col">
      <MyPageHeader />
      <Profile />
      <PostListServerContainer />
    </div>
  );
};

export default MyPage;
