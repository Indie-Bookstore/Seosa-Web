"use client";

import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className="p-8">
      <h1 className="font-bold text-4xl mb-4 font-unbatang">서사 (Bold)</h1>

      <div className="mb-6 p-4 border rounded-lg">
        <h2 className="text-xl font-bold mb-2">로그인 상태</h2>
        <p className="text-sm">
          Status:{" "}
          <span
            className={`font-bold ${
              status === "authenticated" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status}
          </span>
        </p>
        {session && (
          <div className="mt-2">
            <p className="text-sm">이메일: {session.user?.email}</p>
            <p className="text-sm">사용자 역할: {session.userRole || "없음"}</p>
            <p className="text-sm">사용자 ID: {session.userId || "없음"}</p>
            <p className="text-sm">
              Access Token: {session.accessToken ? "있음" : "없음"}
            </p>
            <button
              onClick={() => signOut()}
              className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
