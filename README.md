# 윤정원\_프론트엔드\_사람인

- JavaScript, React 18.2, redux-toolkit 1.9

### Runbook

to run this application

- Run `npm start`

```
└── /src
    ├── /api
    ├── /components
    ├── /constants
    ├── /redux
    └── App.jsx
```

```
└── /src
    ├── /components
    |   ├── ProductList.jsx
    |   ├── ProductPagination.jsx
    |   ├── ProductSearchBar.jsx
```

#### 트러블 슈팅

새로고침

- query string에 담고 새로고침 시 query string를 읽어 데이터 유지 => react-router-dom

페이지네이션 구현

- 페이지가 총 10라는 가정한다.
- 1~4인 페이지는 1 2 3 4 5 ... 10 페이지를 보여줍니다. (1 2 3 4 5 ... 10)
- 5~6인 페이지는 1 ... 해당 페이지-1 해당 페이지 해당 페이지+1 ... 10 을 보여줍니다. (1 ... 4 5 6 ... 10)
- 7이상 페이지는 1 ... 7 8 9 10으로 보여줍니다.
- 총 상품이 100개, 총 페이지가 10개라는 조건에서만 가능해서 코드 수정이 필요합니다.

- 한 화면에 최대 10개 페이지까지 보여줄 수 있다는 전제 하에, 총 상품 수를 한 페이지당 보여줄 상품 수(row)로 나누고 올림한 것이 총 페이지 수입니다.
- 총 페이지 수를 10으로 나누고 올림한 것이 페이지 10개씩을 몇번까지 보여줄 수 있는지이다. 즉 이 수가 2이면 1~10, 11~20까지 보여줄 수 있습니다.
- 한 페이지당 보여줄 상품 수(10), 한 화면 보여줄 페이지 수(10), 10개씩 몇번 보여줄 수 있는지 => 3차원 관계를 갖습니다.
- 위를 고려해서 총 10페이지 초과에서도 같은 동작을 하도록 수정해야 합니다.

과제하면서 느낀점

- 디자인 패턴에 대한 이해가 부족하다고 생각되어 과제전형 이후 이와 관련한 공부를 해야겠다고 느꼈습니다.

### Todo List

- List

  - [x] It should be a search result list.

  - [x] After page refresh, the search result should persist.

  - [x] The column is in order of [상품번호, 상품명, 브랜드, 상품내용, 가격, 평점, 재고].

  - [x] Display the total amount of data at the top of the list.

  - [x] The maximum length of [상품내용] is 40 characters. If it exceeds the maximum length, you should display the rest of the content using ellipsis ....

- Search

  - [x] Search conditions are the following : [전체, 상품명, 브랜드, 상품내용].

  - [x] Both search condition and keyword must be persisted after the refresh.

- Pagination

  - [x] Implement rows per page using a select box. The select box should display [10, 20, 50] options.

  - [x] Both rows per page and page number must be persisted after the refresh.
