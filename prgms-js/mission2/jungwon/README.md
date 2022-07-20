# TodoApp

처음에는 class style로 TodoApp을 구현했고,
라이브코딩을 보고 나서 로토님의 코드를 참고하여 function style로도 구현했습니다. 👍

## [미션2] TodoApp 업그레이드하기 #75

<center><img src="https://user-images.githubusercontent.com/66169832/170679301-8206142b-0496-4d55-9622-bae04685182d.gif" width="300" height="540"/></center>

- 요구사항

  - [x] **input으로 데이터 추가**

  ```js
  // 📌 이벤트 리스너
  this.$addInput.addEventListener('keydown', (e) => {
    if (e.code !== 'Enter' || e.isComposing) return;
     e.preventDefault();
     const input = e.target;

     this.addTodo(input.value);
     input.value = ''; // UX를 위해 input을 초기화해줬습니다.
   });

  // 📌 addTodo 함수
  addTodo(newText) {
    const newData = [...this.data, { text: newText, isCompleted: false }];
    this.setState(newData);
  }
  ```

  - [x] **button으로 데이터 삭제**

  ```html
  <!--li요소에 data-index 속성을 추가했습니다. -->
  <li class="todo-item" data-index="${idx}">
    <label class="form-check-group">
      <input class="form-check" type="checkbox" ${ isCompleted ? 'checked' : ''
      } />
      <span>${text}</span>
    </label>
    <button class="btn delete-button" type="button">delete</button>
  </li>
  ```

  ```js

  // 📌 이벤트리스너 내부 : $todoItem의 data-index값을 가져와서 활용
  const targetIndex = $todoItem.dataset.index;
  this.deleteTodo(targetIndex);

  // 📌 deleteTodo 함수 : index 값을 사용해 값 삭제
  deleteTodo(index) {
    const newData = this.data.filter((todo, i) => i !== parseInt(index));
    this.setState(newData);
  }
  ```

  - [x] **isCompleted 값 토글**
    - `true`/`false` 구분은 체크박스와 CSS로 처리했습니다. 💄

  ```js
  // 📌 toggleTodo 함수: deleteTodo와 같은 방식으로 토글해줬습니다
    toggleTodo(index) {
    const newData = this.data.map((todo, i) =>
      i === parseInt(index) ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    this.setState(newData);
  }
  ```

<br/>

## [미션2] 보너스 구현사항 - input 컴포넌트화 하기 #76

## [미션2] 보너스 구현 사항 - TodoCount 컴포넌트 #77

```js
class App {
  // ...
  constructor(selector, name = 'Todo name') {
    this.name = name;
    this.state = this.getState();
    this.$root = document.querySelector(selector);

    this.init();
    this.setRemoveAll();

    this.todoCount = new TodoCount({
      $target: this.$root.querySelector('.todo-title'),
      initialState: this.state,
    });

    this.todoInput = new TodoInput({
      $target: this.$root.querySelector('.todo-header'),
      onAdd: this.addTodo,
    });

    this.todoList = new TodoList({
      $target: this.$root.querySelector('.todo-body'),
      initialState: this.state,
      onClick: this.toggleTodo,
      onRemove: this.deleteTodo,
    });
  }

  // ...
}
```

<s>
- `TodoCount` `TodoInput` `TodoList` 컴포넌트들은 별 다른 기능 없이 `render`만 할 수 있는 컴포넌트로 구현했습니다.
- 따라서 다른 모든 과정은 `App`에서 처리하게 되었는데, 그로 인해 `constructor`도 방대해졌어요 ^^;
  - 사실 위의 과정들을 함수화시키는 것도 생각해봤지만, 개인적으로 함수를 타고 계속 들어가는걸 조금 피곤해하기도 하고,
  - 무엇보다 함수화 시키게 되면 어디서 어느 멤버변수들을 선언했는지 나중에는 헷갈리게 될 것 같아서 그냥 `constructor`에서 다 볼 수 있도록 구현하게 되었는데, 혹시 피드백 있으시면 감사히 듣겠습니다!🙇
</s>
<br>
<br>

👉 피드백을 반영하여 각 컴포넌트들이 책임을 나눠가지도록 리펙토링했습니다.

## [미션2] 보너스 구현사항 - Event delegate #81

```js
this.$element.addEventListener('click', ({ target: $target }) => {
  // 클릭된 게 체크박스(와 그 라벨)라면 toggleTodo()를 실행
  if ($target.matches('.form-check')) {
    const targetIndex = $target.closest('.todo-item').dataset.index;
    this.onClick(targetIndex);
  }

  // 클릭된 게 삭제버튼이면 deleteTodo()를 실행
  if ($target.matches('.form-check')) {
    const targetIndex = $target.closest('.todo-item').dataset.index;
    this.onRemove(targetIndex);
  }
});

// ... 이하 #75에서 설명한 내용이므로 생략 ...
```

<s>
- `getTarget` 메소드는 서로 다른 위치에 있는 요소로부터 `.todo-item`을 간편하게 찾을 수 있도록 추가한 메소드입니다.
</s>
<br>
<br>

👉 피드백을 반영하여 `getTarget`대신에 `closest` 함수를 사용했습니다.

## [미션2] 보너스 구현 사항 - 커스텀 이벤트 #90

<center><img src="https://user-images.githubusercontent.com/66169832/170688706-7e121815-c845-4973-b5d3-16d1e74e9274.gif" width="300" height="540"/></center>

```js
  setRemoveAll() {
    const $removeAllBtn = this.$root.querySelector('.remove-all-button');
    $removeAllBtn.addEventListener('click', () => {
      this.$root.dispatchEvent(new CustomEvent('removeAll'));
    });

    this.$root.addEventListener('removeAll', () => {
      this.setState([]);
    });
  }
```

- 커스텀 이벤트.. 처음에 이해하는게 정말 어려웠어요😂.. 익숙치않아서 종이에다가 몇 줄 안되는 요구사항 하나하나 분석하고, 손코딩해가면서 작성했는데 다 하고나니 되게 뿌듯하네요.
- 덕분에 이벤트에 대해서 공부하다가 [matches](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches) 라는 함수도 알게되고, 캡쳐링과 버블링에 대해서도 더 공부해봐야겠다는 생각도 들었습니다.
  - 저는 #81 에서 처럼 지금까지 `$.classList.contains('class')`로 확인했었는데 `$.matches('.class')`를 활용하면 가독성이 더 좋을 것 같아요! 새로운 함수를 알게 되어 기분이 좋습니다🥳

## [미션2] 보너스 구현사항 - localStorage #91

<center><img src=https://user-images.githubusercontent.com/66169832/170702124-42a9932d-91b9-47a5-868f-8bbf9ba78619.gif width="300" height="540"/></center>

```js
  /**
   * 📌 새로운 데이터인 nextState를 받아서 다시 렌더링하는 메소드입니다.
   *
   * @param {Object[]} nextState
   * @param {string} nextState[].text - 할 일에 대한 내용
   * @param {boolean} nextState[].isCompleted - 할 일 완료여부
   */
  setState(nextState) {
    this.state = nextState;

    try {
      localStorage.setItem(this.name, JSON.stringify(nextState));
    } catch (e) {
      console.error(e);
    }

    this.todoCount.setState(this.state);
    this.todoList.setState(this.state);
  }

  /**
   * 📌 data를 localStorage에서 가져오는 메소드힙니다.
   *
   * @return {Object[]} data - todo
   */
  getState() {
    try {
      const storedState = JSON.parse(localStorage.getItem(this.name));
      return storedState ? storedState : null;
    } catch (e) {
      console.error(e);
    }
  }
```

<s>
- 먼저 `fetchData`함수를 소개하자면, `localStorage`에서 데이터를 갖고와서

- 데이터가 있으면 `그 데이터`를 return하고
- 데이터가 없으면 `빈 배열`을 return하는 함수입니다.

- 새로운 인스턴스가 생성될 때 `constructor`에서 처음 `fetchData`가 실행되고
- `setState`에서 `localStorage`에 새로운 값을 저장한 뒤에, 새로운 값을 가져올 때 다시 한 번 실행됩니다.
  - 사실 `this.data`에 `nextData`를 바로 할당해도 되지만, 뭔가 멀티스레드.. 이런거 주워들은 기억이 있어서 이렇게 구현해봤어요!
    </s>

👉 피드백을 반영하여 메소드명을 변경했는데요, 이번엔 `this.state`의 getter, setter와 헷갈릴 것 같아서 걱정이 되네요. ( 이름 짓는 게 정말정말 어려운 것 같아요.🥲 )

- function style에서 했던 것 처럼 `Storage`를 따로 모듈화하면 문제가 해결되겠지만, 다음에 비슷한 상황이 생길 것 같아서 다른 분들의 의견을 들어보고자 임시로 이대로 두겠습니다.
