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

## 🚀 배포

Netlify를 통해 사이트를 배포할 수 있습니다:

