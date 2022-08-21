## 📍 결과물

![](./screen-shot.png)
![https://jiyehyeon.github.io/react-netflix-clone/](https://jiyehyeon.github.io/react-netflix-clone/)

## 📍 개발 과정

<aside>
TheMovieDB API 발급
→ 헤더, 메인배너, 슬라이더, 모달 컴포넌트 생성
→ axios로 API 호출하여 원하는 영화 정보 불러오기
→ 각 컴포넌트에 `props`로 뿌려주기

</aside>

## 📍 어려웠던 점 / 이슈

슬라이더를 그리드에 맞게 칼같이 이동하도록 구현하는 데 시간이 오래 걸렸다.
`State`를 사용하지 않고 CSS로만 구현하려고 하니까 목록이 다 끝났는데 검은 화면이 노출되버리기도 하고 이미지가 시작 부분과 일치하지 않고 어정쩡하게 걸쳐지기도 했다.
결국 `State`를 사용해서 첫번째 위치에 올 영화의 `index`값을 조절해주어 해결할 수 있었다.
CSS `transform`의 `translateX` 를 사용해서 슬라이드 아이템의 `offsetwidth` \* `이동할 index 갯수` 만큼 이동해주었더니 이상 없이 잘 작동했다.

❗ ‘다큐멘터리 영화' 부분이 새로고침 할 때마다 세로사이즈 혹은 정방향사이즈로 나타나는데 CSS나 컴포넌트 호출한 부분은 다른 행과 차이가 없어서 이유가 뭔지 모르겠다..

## 📍 아쉬운 점

기능 구현보단 UI 구현의 비중이 많았던 것 같아서 추가로 라우터, 검색, 프로필 등도 구현해보고 싶다.
