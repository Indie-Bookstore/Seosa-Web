import { PostDetail } from "@/common/services/post";
import Image from "next/image";

const PostDetailProduct = ({ post }: { post: PostDetail }) => {
  return (
    <div className="flex flex-col w-full pt-[10px] pb-[20px] px-[18px] bg-[#E2E7E3]">
      <div className="text-[#666666] font-medium flex items-center h-12">
        서사 모아보기
      </div>
      <div className="flex flex-col divide-y divide-[#cccccc]">
        {post.productResDtoList.map((product) => (
          <ProductItem key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
};

const ProductItem = ({
  product,
}: {
  product: PostDetail["productResDtoList"][number];
}) => {
  return (
    <div className="flex gap-[15px] py-5">
      <Image
        src={product.productImg}
        alt={product.productName}
        width={86}
        height={86}
      />

      <div className="flex flex-col h-[86px] py-1 justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-[13px] text-[#111111] font-normal">
            {product.productName}
          </div>
          {/* <div>{product.}</div> */}
        </div>

        <div className="text-[10px] font-normal text-[#888888]">
          &quot;{product.description}&quot;
        </div>
      </div>
    </div>
  );
};

export default PostDetailProduct;
