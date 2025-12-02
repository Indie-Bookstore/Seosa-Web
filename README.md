# 서사 (SEO-SA)

> 책과 공간, 인연의 서사

## 프로젝트 개요

서사는 독립서점과 관련된 콘텐츠를 공유하는 플랫폼입니다. 사용자는 독립서점에 대한 이야기(서사)를 작성하고, 서점 정보와 상품을 공유할 수 있습니다.

## 기술 스택

### 핵심 기술

- **Next.js 15.5.3** (App Router, Turbopack)
- **React 19.1.0**
- **TypeScript 5**
- **NextAuth 5.0.0-beta.29** (인증)
- **TanStack React Query 5.90.2** (서버 상태 관리)
- **React Hook Form 7.63.0** (폼 관리)
- **Axios 1.12.2** (HTTP 클라이언트)

### 스타일링

- **Tailwind CSS 4**
- **Radix UI** (Dialog, Popover 컴포넌트)
- **Lucide React** (아이콘)
- **class-variance-authority** (스타일 유틸리티)

### 폰트

- **Noto Sans KR** (기본 폰트)
- **UnBatang** (서체 폰트)

### 개발 도구

- **ESLint 9**
- **SVGR** (SVG를 React 컴포넌트로 변환)

## 프로젝트 구조

```
seo-sa/
├── src/
│   ├── app/                    # Next.js App Router 페이지
│   │   ├── api/               # API 라우트
│   │   │   ├── auth/          # NextAuth 인증 엔드포인트
│   │   │   └── proxy/         # 백엔드 API 프록시
│   │   ├── auth/              # 인증 관련 페이지
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   └── reset-password/
│   │   ├── post/              # 게시글 관련 페이지
│   │   │   └── new/           # 새 게시글 작성
│   │   └── page.tsx           # 홈 페이지
│   │
│   ├── feature/               # 기능별 모듈 (Feature-based 구조)
│   │   ├── auth/              # 인증 기능
│   │   │   ├── components/    # 인증 관련 컴포넌트
│   │   │   ├── provider/      # Context Provider
│   │   │   ├── type/          # 타입 정의
│   │   │   └── util/          # 유틸리티 함수
│   │   ├── post/              # 게시글 기능
│   │   │   ├── components/    # 게시글 작성 폼 컴포넌트
│   │   │   └── types/         # 게시글 타입 정의
│   │   └── profile/           # 프로필/마이페이지 기능
│   │       ├── components/    # 프로필 컴포넌트
│   │       └── container/     # 서버/클라이언트 컨테이너
│   │
│   └── common/                # 공통 모듈
│       ├── fonts/             # 폰트 설정
│       ├── hooks/             # 커스텀 훅
│       ├── router/            # 커스텀 라우터 시스템
│       │   └── hooks/         # 라우터 훅 (useRouter, useParams 등)
│       ├── services/          # API 서비스
│       │   ├── auth/          # 인증 API
│       │   ├── instances/     # Axios 인스턴스 (Client/Edge/NodeJS)
│       │   └── react-query/   # React Query 설정
│       ├── ui/                # 공통 UI 컴포넌트
│       └── util/              # 유틸리티 함수
│
├── public/                    # 정적 파일
│   ├── icon/                  # 아이콘 이미지
│   └── fonts/                 # 폰트 파일
│
├── auth.ts                    # NextAuth 설정
├── middleware.ts              # Next.js 미들웨어
└── next.config.ts             # Next.js 설정
```

## 주요 기능

### 1. 인증 시스템

- **이메일 로그인/회원가입**

  - 이메일 중복 확인
  - 닉네임 중복 확인
  - 이메일 인증 코드 발송/확인
  - 비밀번호 유효성 검증
  - 비밀번호 재설정

- **NextAuth 사용**
- **카카오 로그인** (UI 구현 완료, 백엔드 연동 대기)

### 2. 게시글 작성

- **게시글 작성 폼** (`/post/new`)
  - 제목 입력
  - 위치 정보
  - 콘텐츠 블록 (문장/이미지)
  - 썸네일 이미지 설정
  - 서점 정보 입력
    - 주소 (카카오 주소 검색)
    - 좌표 (위도/경도)
    - 카카오 플레이스 ID
    - 운영 시간/요일
    - 전화번호, 인스타그램 링크
    - 서점 이미지
  - 상품 정보 입력
    - 상품명, 가격
    - 상품 이미지
    - 상품 설명

### 3. 프로필/마이페이지

- 사용자 프로필 표시
- 게시글 목록 조회
- 탭 기반 UI (서버/클라이언트 컴포넌트 분리)

## 아키텍처 특징

### 1. Feature-based 구조

기능별로 모듈을 분리하였습니다.

### 2. 환경별 Axios 인스턴스 분리

- **ClientInstance**: 브라우저 환경
- **EdgeInstance**: Edge Runtime (Middleware)
- **NodeJSInstance**: Node.js Runtime (Server Components)

각 환경에 맞는 적절한 인스턴스를 자동으로 선택하여 사용합니다.

### 3. 커스텀 라우터 시스템

타입 안전한 라우팅을 위한 `Route` 클래스 구현:

- 경로 파라미터 타입 추론
- 쿼리 파라미터 타입 추론
- `useRouter`, `useParams`, `usePathname`, `useSearchParams` 훅 제공

### 4. API 프록시 설정

백엔드 API를 프록시하여 CORS 문제를 해결하고, 환경 변수로 백엔드 URL을 관리합니다.

```typescript
// next.config.ts
async rewrites() {
  return [
    {
      source: "/api/proxy/seo-sa/:path*",
      destination: `${process.env.MAIN_SERVER_URL}/:path*`,
    },
  ];
}
```

## 환경 변수

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 변수를 설정하세요:

```env
# 백엔드 서버 URL
MAIN_SERVER_URL=https://your-backend-server.com

# NextAuth 설정
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

## 설치 및 실행

### 패키지 매니저

이 프로젝트는 `pnpm`을 사용합니다.

### 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
pnpm dev
```

개발 서버는 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

### 빌드

```bash
pnpm build
```

### 프로덕션 실행

```bash
pnpm start
```

## 진행 상황

### 완료된 기능

- ✅ 인증 시스템 (이메일 로그인/회원가입, NextAuth 통합)
- ✅ 홈페이지 UI
- ✅ 게시글 목록 UI
- ✅ 게시글 상세 UI
- ✅ 프로필/마이페이지 UI
- ✅ 공통 UI 컴포넌트 (Button, Input, Dialog, Popover)

## 주요 파일 설명

### 인증 관련

- `auth.ts`: NextAuth 설정 및 Credentials Provider
- `src/feature/auth/`: 인증 관련 컴포넌트 및 로직
- `src/common/services/auth/`: 인증 API 서비스

### 게시글 관련

- `src/feature/post/`: 게시글 작성 관련 컴포넌트
- `src/feature/post/types/post.ts`: 게시글 타입 정의

### 공통 모듈

- `src/common/router/`: 라우터 시스템
- `src/common/services/instances/`: 환경별 Axios 인스턴스
- `src/common/ui/`: 재사용 가능한 UI 컴포넌트
