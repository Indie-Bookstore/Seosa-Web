import Logo from "../../public/icon/logo.svg";
import KakaoIcon from "../../public/icon/kakao.svg";
import ArrowBack from "../../public/icon/arrow-back.svg";

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="font-bold text-4xl mb-4">서사 (Bold)</h1>
      <p className="text-lg mb-4">서사</p>
      <p className="font-bold text-lg">서사</p>

      {/* SVGR 사용 예시 */}
      <div className="mt-8 space-y-4">
        <h2 className="text-2xl font-bold">SVGR 아이콘 예시</h2>

        {/* 로고 아이콘 */}
        <div className="flex items-center gap-4">
          <Logo width={50} height={50} />
          <span>로고 아이콘 (50x50)</span>
        </div>

        {/* 카카오 아이콘 */}
        <div className="flex items-center gap-4">
          <KakaoIcon className="w-8 h-8" />
          <span>카카오 아이콘 (Tailwind 클래스)</span>
        </div>

        {/* 뒤로가기 아이콘 */}
        <div className="flex items-center gap-4">
          <ArrowBack
            width={24}
            height={24}
            fill="currentColor"
            className="text-blue-500"
          />
          <span>뒤로가기 아이콘 (색상 변경)</span>
        </div>
      </div>
    </div>
  );
}
