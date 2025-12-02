# 서사 (SEO-SA)

> "책과 공간, 인연의 서사"

서사는 독립서점과 관련된 콘텐츠를 공유하는 커뮤니티 플랫폼입니다.

## 📋 프로젝트 개요

이 프로젝트는 Next.js 15를 기반으로 한 모바일 중심의 웹 애플리케이션입니다. 사용자들이 독립서점에 대한 리뷰와 경험을 공유하고, 서점 정보와 관련 상품을 탐색할 수 있는 플랫폼을 제공합니다.

## 🛠 기술 스택

### Core
- **Next.js** 15.5.3 (App Router)
- **React** 19.1.0
- **TypeScript** 5.x
- **Turbopack** (개발/빌드)

### 상태 관리 & 데이터 페칭
- **TanStack React Query** 5.90.2 - 서버 상태 관리
- **React Hook Form** 7.63.0 - 폼 관리

### 인증
- **NextAuth** 5.0.0-beta.29 - 인증 관리

### 스타일링
- **Tailwind CSS** 4.x
- **Radix UI** - 접근성 있는 UI 컴포넌트
  - `@radix-ui/react-dialog`
  - `@radix-ui/react-popover`
  - `@radix-ui/react-tabs`

### HTTP 클라이언트
- **Axios** 1.12.2

### 기타
- **SVGR** - SVG를 React 컴포넌트로 변환
- **Day.js** - 날짜 처리
- **Lucide React** - 아이콘
- **Class Variance Authority** - 컴포넌트 variant 관리

## 📁 프로젝트 구조

```
seo-sa/
├── src/
│   ├── app/                    # Next.js App Router 페이지
│   │   ├── api/                # API 라우트
│   │   │   ├── auth/           # NextAuth 인증 엔드포인트
│   │   │   └── proxy/          # 백엔드 API 프록시
│   │   ├── auth/               # 인증 관련 페이지
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   └── reset-password/
│   │   ├── post/               # 게시글 관련 페이지
│   │   │   └── [id]/           # 게시글 상세 페이지
│   │   ├── my-page/            # 마이페이지
│   │   └── layout.tsx          # 루트 레이아웃
│   │
│   ├── common/                 # 공통 모듈
│   │   ├── fonts/              # 폰트 설정 (NotoSans, UnBatang)
│   │   ├── hooks/              # 커스텀 훅
│   │   ├── router/             # 라우터 유틸리티
│   │   ├── services/           # API 서비스 레이어
│   │   │   ├── auth/           # 인증 API
│   │   │   ├── post/           # 게시글 API
│   │   │   ├── instances/      # Axios 인스턴스 (Client/Edge/NodeJS)
│   │   │   └── react-query/    # React Query 설정
│   │   ├── types/              # 타입 정의
│   │   ├── ui/                 # 공통 UI 컴포넌트
│   │   └── util/               # 유틸리티 함수
│   │
│   ├── feature/                # 기능별 모듈
│   │   ├── auth/               # 인증 기능
│   │   │   ├── components/     # 인증 관련 컴포넌트
│   │   │   ├── provider/       # Context Provider
│   │   │   └── type/           # 타입 정의
│   │   ├── post/               # 게시글 기능
│   │   │   ├── components/     # 게시글 관련 컴포넌트
│   │   │   └── container/      # Server/Client Container
│   │   └── myPage/             # 마이페이지 기능
│   │       ├── components/
│   │       └── container/
│   │
│   └── types/                  # 전역 타입 정의
│
├── public/                     # 정적 파일
│   ├── fonts/                  # 폰트 파일
│   └── icon/                   # SVG 아이콘
│
├── auth.ts                     # NextAuth 설정
├── middleware.ts               # Next.js 미들웨어
└── next.config.ts              # Next.js 설정
```

## ✨ 주요 기능

### 1. 인증 시스템
- ✅ 이메일 회원가입
  - 이메일 중복 확인
  - 닉네임 중복 확인
  - 이메일 인증 코드 발송/확인
  - 비밀번호 유효성 검증
- ✅ 이메일 로그인
- ✅ 비밀번호 재설정
  - 이메일 인증을 통한 비밀번호 재설정
- 🚧 카카오 소셜 로그인 (UI 준비 완료, 기능 미구현)

### 2. 게시글 기능
- ✅ 게시글 목록 조회
  - 페이지네이션 지원
  - 정렬 기능
- ✅ 게시글 상세 조회
  - 서점 정보 표시 (주소, 운영시간, 연락처 등)
  - 게시글 콘텐츠 (텍스트/이미지)
  - 관련 상품 정보
  - 북마크 기능
- ✅ 댓글 기능
  - 댓글 목록 조회
  - 댓글 작성/수정/삭제 (UI 준비)

### 3. 마이페이지
- ✅ 프로필 정보 표시
- ✅ 내가 작성한 게시글 목록

### 4. UI/UX
- 모바일 중심 디자인 (360px 너비)
- 반응형 레이아웃
- 커스텀 폰트 (UnBatang, Noto Sans KR)
- 애니메이션 효과

## 🚀 개발 환경 설정

### 필수 요구사항
- Node.js 20.x 이상
- pnpm 9.15.4 (권장 패키지 매니저)

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start

# 린트 실행
pnpm lint
```

개발 서버는 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

### 환경 변수

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 변수들을 설정해야 합니다:

```env
# 백엔드 서버 URL
MAIN_SERVER_URL=https://your-backend-server.com

# NextAuth 설정
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

## 🔧 주요 설정

### API 프록시
Next.js의 `rewrites` 기능을 사용하여 백엔드 API를 프록시합니다:
- `/api/proxy/seo-sa/*` → `${MAIN_SERVER_URL}/*`

### Axios 인스턴스
환경에 따라 다른 Axios 인스턴스를 사용합니다:
- **Client**: 브라우저 환경
- **Edge**: Edge Runtime (middleware)
- **NodeJS**: Server Components

### SVG 처리
SVG 파일은 `@svgr/webpack`을 통해 React 컴포넌트로 변환됩니다.

## 📝 진행 상황

### 완료된 기능
- [x] 프로젝트 기본 구조 설정
- [x] 인증 시스템 (이메일 회원가입, 로그인, 비밀번호 재설정)
- [x] 게시글 목록/상세 페이지 UI
- [x] 댓글 기능 UI
- [x] 마이페이지 UI
- [x] React Query를 통한 서버 상태 관리
- [x] NextAuth 인증 통합
- [x] 모바일 중심 레이아웃

### 진행 중 / TODO
- [ ] 카카오 소셜 로그인 구현
- [ ] 게시글 작성/수정 기능
- [ ] 댓글 작성/수정/삭제 API 연동
- [ ] 북마크 기능 API 연동
- [ ] 이미지 업로드 기능
- [ ] 실제 백엔드 API 연동 (현재 Mock 데이터 사용 중)
- [ ] 사용자 정보 조회 API 연동
- [ ] 프로필 이미지 업로드

### 알려진 이슈
- 게시글 목록/상세 API가 현재 Mock 데이터를 반환합니다
- 일부 API 엔드포인트가 주석 처리되어 있습니다
- 이미지 도메인 설정이 TODO로 남아있습니다

