# HONGTUBE | YouTube API 사이트 만들기

React 프레임워크와 유튜브 API를 이용해 유튜브 사이트를 만들었습니다. 유튜브 API를 활용하여 외부 데이터를 가져오고 응답을 처리하는 방법을 사용했습니다.

## 🚀 주요 기능

- **메인 페이지**: 카테고리별 동영상 목록 표시
- **비디오 상세 페이지**: 동영상 재생 및 상세 정보
- **검색 기능**: 키워드로 동영상 검색
- **채널 페이지**: 채널 정보 표시
- **반응형 디자인**: 모바일 및 데스크톱 지원

## 🛠 사용스택

- **Frontend**: React 18.3.1
- **Routing**: React Router DOM 6.27.0
- **Styling**: SCSS
- **Icons**: React Icons 5.3.0
- **Video Player**: React Player 2.16.0
- **HTTP Client**: Axios 1.7.7
- **API**: YouTube Data API v3

## 📦 설치 및 실행

### 1. 프로젝트 클론
```bash
git clone [repository-url]
cd HONGTUBE-YouTubeAPI
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
프로젝트 루트에 `.env` 파일을 생성하고 YouTube API 키를 설정하세요:

```env
REACT_APP_YOUTUBE_API_KEY=your_youtube_api_key_here
```

### 4. 개발 서버 실행
```bash
npm start
```

브라우저에서 `http://localhost:3000`으로 접속하세요.

## 🔑 YouTube API 키 발급 방법

1. [Google Cloud Console](https://console.cloud.google.com/)에 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. YouTube Data API v3 활성화
4. 사용자 인증 정보에서 API 키 생성
5. 생성된 API 키를 `.env` 파일에 설정

## 📁 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── HeaderCont.jsx   # 헤더 컴포넌트
│   ├── MainConts.jsx    # 메인 페이지
│   ├── VideoConts.jsx   # 비디오 상세 페이지
│   ├── SearchConts.jsx  # 검색 결과 페이지
│   └── ...
├── assets/              # 스타일 및 리소스
│   └── scss/           # SCSS 스타일 파일
└── utils/              # 유틸리티 함수
```

## 🚀 배포

Netlify를 통해 사이트를 배포할 수 있습니다:

1. GitHub에 코드 푸시
2. Netlify에서 GitHub 저장소 연결
3. 환경 변수 설정 (YouTube API 키)
4. 배포 완료

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
