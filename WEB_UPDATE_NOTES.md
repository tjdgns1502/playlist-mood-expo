# PlaylistMood 웹 지원 업데이트

이 압축 파일은 기존 레포지토리에 덮어쓰기할 수정 파일만 포함합니다.

## 반영 내용
- Expo 웹 플랫폼 설정 추가 (`app.json`)
- 웹에서 Pretendard 로딩 유지 + 문서 배경색/타이틀 설정 (`app/_layout.tsx`)
- 웹에서는 하단 탭 대신 상단 네비게이션 사용 (`app/(tabs)/_layout.tsx`, `src/components/TopTabs.tsx`)
- 모바일/웹 공용 반응형 폭 제한 추가: 웹 최대 너비 480px 중앙 정렬 (`src/components/WebLayout.tsx`)
- 차트 라이브러리 의존도를 줄이기 위해 `react-native-gifted-charts` 대신 웹/모바일 공용 커스텀 바 차트로 교체 (`src/components/ScoreBoard.tsx`)
- 각 화면을 웹 레이아웃에 맞게 조정 (`app/(tabs)/*.tsx`, `app/pricing.tsx`)

## 적용 방법
기존 레포 루트에 압축을 풀어 덮어쓴 뒤 아래 명령을 실행하세요.

```bash
npm install
npx expo start --web
```

브라우저 확인 주소는 보통 `http://localhost:8081` 입니다.
