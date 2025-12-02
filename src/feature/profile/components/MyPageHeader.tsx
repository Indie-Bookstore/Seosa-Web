import MoreVertical from "../../../../public/icon/more-vertical.svg";

const MyPageHeader = () => {
  return (
    <div className="flex w-full justify-between pt-[27px] px-[18px] sticky top-0 bg-primary z-10">
      <span className="font-unbatang text-white text-2xl">나의 공간</span>
      <MoreVertical alt="more" className="size-6 text-white" />
    </div>
  );
};

export default MyPageHeader;
