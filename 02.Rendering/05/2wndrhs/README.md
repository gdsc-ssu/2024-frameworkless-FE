# 02. 렌더링

2장 렌더링의 섹션 03 ~ 05 부분을 구현하는 가이드입니다.

구현에 앞서, 이전 회차에 작성했던 `view/counter.js`, `view/filters.js`, `view/todos.js` (혹은 추가로 작성한 코드들)을 가져와서 진행해주세요.

## 테스트

```
npm test 02.\ 렌더링/05
```

또는

```
npm test
```

## 구현 가이드

- [ ] `index.js` 에 일정 시간마다 상태를 무작위로 변경하고, 다시 렌더링을 하는 로직을 작성해보세요.

  - 무작위로 변경된 상태의 값은 자유롭되, 타입은

    ```ts
    {
      todos: Array<{ text: string; completed: boolean }>;
      currentFilter: string;
    }
    ```

    을 지켜주세요.

  - 기존의 `appView()` 함수 대신, `registry.js` 에 작성된 코드를 활용해서 렌더링을 진행해보세요.

- [x] `registry.js` 코드를 작성하고, 테스트를 통과해보세요.

  - 캡슐화를 위하여 `registry` 변수는 export 하지 말아주세요.

  - `index.html` 안에 렌더링 될 구성요소를 특정할 수 있도록 `data-component` 속성을 할당해보세요.

- [ ] `isNodeChange.js` 코드를 작성하고, 테스트를 통과해보세요.

- [ ] `applyDiff.js` 코드를 작성하고, 테스트를 통과해보세요.

  - `isNodeChange.js` 에 작성한 모듈을 활용해보세요.

- [ ] 프로그램 내부에서 가상 DOM을 렌더링해보세요.

  - `registry.js` 의 `add` 함수를 호출하여 렌더링할 컴포넌트들을 미리 할당해주세요.

  - `registry.js` 의 `renderRoot` 함수를 호출하여 컴포넌트들을 가상 DOM에 렌더링하세요.

  - `applyDiff.js` 에 작성한 코드를 호출하여 가상 DOM을 렌더링하세요.

## 덧붙임

- 로컬 환경에서 의도한대로 작동하는지 확인해보세요.
- 코드 맥락만 맞다면 자유롭게 import / export 하셔도 됩니다.
- 테스트 코드에 케이스는 추가 가능하나, 기존 테스트 코드를 변경하지는 말아주세요.
