import { PostDetail } from "@/common/services/post";
import Image from "next/image";
import LocationIcon from "../../../../public/icon/location.svg";
import TimeIcon from "../../../../public/icon/time.svg";
import CallIcon from "../../../../public/icon/call.svg";
import WorldIcon from "../../../../public/icon/world.svg";

type IconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

const PostDetailBookStore = ({ post }: { post: PostDetail }) => {
  const infoList: Array<{
    icon: IconComponent;
    alt: string;
    content: string;
  }> = [
    {
      icon: LocationIcon,
      alt: "location",
      content: post.bookstoreResDto.address,
    },
    {
      icon: TimeIcon,
      alt: "time",
      content: `${post.bookstoreResDto.openDays} / ${post.bookstoreResDto.openHours}`,
    },
    {
      icon: CallIcon,
      alt: "call",
      content: post.bookstoreResDto.phoneNumber,
    },
    {
      icon: WorldIcon,
      alt: "world",
      content: post.bookstoreResDto.instagramLink,
    },
  ];

  return (
    <div className="flex flex-col w-full pt-[10px] pb-10 px-[18px] bg-[#F4F4F4]">
      <div className="text-[#666666] font-medium flex items-center h-12">
        서점 정보
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex justify-center">
          <Image
            src={
              "https://cdn.pixabay.com/photo/2016/11/21/12/59/couch-1845270_1280.jpg"
            }
            alt={post.bookstoreResDto.address}
            width={324}
            height={174}
          />
        </div>
        <div className="flex flex-col gap-1">
          {infoList.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="flex gap-[7px] items-center">
                <IconComponent className="size-6" />
                <div className="text-[11px] text-[#666666] font-normal">
                  {item.content}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PostDetailBookStore;
