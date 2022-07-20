class App {
  #state;
  #root;

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

  /**
   * 📌 $root에 대한 setter입니다.
   *
   * @param {HTMLElement} _root
   */
  set $root(_root) {
    if (!_root) {
      throw new Error('잘못된 selector를 사용하셨습니다.');
    }
    this.#root = _root;
  }

  /**
   * 📌 $root에 대한 getter입니다.
   *
   * @return {HTMLElement} $root
   */
  get $root() {
    return this.#root;
  }

  /**
   * 📌 data에 대한 setter입니다.
   *
   * @param {Object[]} newState - 할당할 data
   * @param {string} newState[].text - 할 일에 대한 내용
   * @param {boolean} newState[].isCompleted - 할 일 완료여부
   */
  set state(newState) {
    // newState 검사
    if (!newState) {
      throw new Error('TodoList를 생성할 때 data는 필수값입니다.');
    }
    if (!Array.isArray(newState)) {
      throw new Error('data는 array 타입이여야 합니다.');
    }

    newState.forEach((todo) => {
      const { text, isCompleted } = todo;

      // newState의 element 검사
      if (typeof todo !== 'object') {
        throw new Error('data의 element는 object타입이어야 합니다.');
      }
      if (Object.keys(todo).length === 0) {
        throw new Error('data의 element로 빈 객체를 할당할 수 없습니다');
      }

      // newState의 element의 프로퍼티 검사
      if (!text) {
        throw new Error('text 프로퍼티가 존재하지 않습니다.');
      } else if (typeof text !== 'string') {
        throw new Error('text 프로퍼티의 type은 string이여야 합니다.');
      }

      if (!('isCompleted' in todo)) {
        throw new Error('isCompleted 프로퍼티가 존재하지 않습니다.');
      } else if (typeof isCompleted !== 'boolean') {
        throw new Error('isCompleted 프로퍼티의 type은 boolean이여야 합니다.');
      }
    });

    this.#state = newState;
  }

  /**
   * 📌 data에 대한 getter입니다.
   *
   * @return {Object[]} data - todo
   */
  get state() {
    return this.#state;
  }

  /**
   * 📌 TodoApp을 init하는 메소드입니다.
   */
  init() {
    this.$root.innerHTML = `
    <article class="todo">
    <header class="todo-header">
      <div class="todo-title">
        <h2 class="todo-name">${this.name}</h2>
      </div>
    </header>

    <div class="todo-body">
      <ul class="todo-list"></ul>
    </div>
    
    <footer class="todo-footer">
      <button class="btn remove-all-button" type="button">
        Remove All
      </button>
    </footer>
  </article>
    `;
  }

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

  /**
   * 📌 removeAll(커스텀 이벤트) 리스너를 세팅하는 메소드 입니다.
   *
   */
  setRemoveAll() {
    const $removeAllBtn = this.$root.querySelector('.remove-all-button');
    $removeAllBtn.addEventListener('click', () => {
      this.$root.dispatchEvent(new CustomEvent('removeAll'));
    });

    this.$root.addEventListener('removeAll', () => {
      this.setState([]);
    });
  }

  /**
   * 📌 새로운 todo를 추가하는 메소드입니다.
   *
   * @param {string} newText - 새로 추가할 todo의 text
   */
  addTodo = (newText) => {
    const newState = [...this.state, { text: newText, isCompleted: false }];
    this.setState(newState);
  };

  /**
   * 📌 isCompleted값을 토글하는 메소드입니다.
   *
   * @param {number} index - 변경할 Todo의 index값
   */
  toggleTodo = (index) => {
    const newState = this.state.map((todo, i) =>
      i === parseInt(index, 10)
        ? { ...todo, isCompleted: !todo.isCompleted }
        : todo
    );
    this.setState(newState);
  };

  /**
   * 📌 todo를 삭제하는 메소드입니다.
   *
   * @param {number} index - 변경할 Todo의 index값
   */
  deleteTodo = (index) => {
    const newState = this.state.filter((todo, i) => i !== parseInt(index, 10));
    this.setState(newState);
  };
}
