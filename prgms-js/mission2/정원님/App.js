class App {
  #data;

  constructor(data, selector) {
    this.data = data;
    this.$root = document.querySelector(selector);
    this.todoInput = new TodoInput("Enter your todo to add them");
    this.todoList = new TodoList();
    this.init();

    this.$addInput = document.querySelector(".add-input");
    this.$todoList = document.querySelector(".todo-list");
    this.setClickListener();
    this.setAddInputKeydownListener();
  }

  /**
   * 📌 data에 대한 setter입니다.
   *
   * @param {Object[]} newData - 할당할 data
   * @param {string} newData[].text - 할 일에 대한 내용
   * @param {boolean} newData[].isCompleted - 할 일 완료여부
   */
  set data(newData) {
    // newData 검사
    if (!newData) {
      throw new Error("TodoList를 생성할 때 data는 필수값입니다.");
    }
    if (!Array.isArray(newData)) {
      throw new Error("data는 array 타입이여야 합니다.");
    }

    newData.forEach((todo) => {
      const { text, isCompleted } = todo;

      // newData의 element 검사
      if (typeof todo !== "object") {
        throw new Error("data의 element는 object타입이어야 합니다.");
      }
      if (Object.keys(todo).length === 0) {
        throw new Error("data의 element로 빈 객체를 할당할 수 없습니다");
      }

      // newData의 element의 프로퍼티 검사
      if (!text) {
        throw new Error("text 프로퍼티가 존재하지 않습니다.");
      } else if (typeof text !== "string") {
        throw new Error("text 프로퍼티의 type은 string이여야 합니다.");
      }

      if (!("isCompleted" in todo)) {
        throw new Error("isCompleted 프로퍼티가 존재하지 않습니다.");
      } else if (typeof isCompleted !== "boolean") {
        throw new Error("isCompleted 프로퍼티의 type은 boolean이여야 합니다.");
      }
    });

    this.#data = newData;
  }

  /**
   * 📌 data에 대한 getter입니다.
   *
   * @return {Object[]} data - todo
   */
  get data() {
    return this.#data;
  }

  /**
   * 📌 TodoApp을 초기화하는 메소드입니다.
   */
  init() {
    this.$root.innerHTML = `
    <article class="todo">
    <header class="todo-header">
      <hgroup>
        <h2 class="todo-name">Todo name</h2>
        <small class="todo-count">2/2</small>
      </hgroup>
        ${this.todoInput.render()}
    </header>
    <div class="todo-body">
      <ul class="todo-list">
        ${this.todoList.render(this.data)}
      </ul>
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
   * 📌 해당되는 class를 가진 조상 Element를 찾는 메소드입니다.
   * 첫 번째 파라미터(elem)를 기준점으로 해서 body까지 검색하여 해당되는 className을 가진 element를 찾아 반환합니다.
   *
   * @param {HTMLElement} elem - 기준점이 될 Element
   * @param {string} className - 찾고 싶은 class
   *
   * @return {HTMLElement} 해당 class를 가진 HTMLElement
   */
  getTarget(elem, className) {
    while (!elem.classList.contains(className)) {
      elem = elem.parentNode;

      if (elem.nodeName == "BODY") {
        elem = null;
        return;
      }
    }

    return elem;
  }

  /**
   * 📌 클릭이벤트 리스너를 세팅하는 메소드입니다.
   *
   */
  setClickListener() {
    this.$root.addEventListener("click", (e) => {
      const target = e.target;

      if (target.classList.contains("form-check")) {
        const todoItem = getTarget(target, "todo-item");
        const targetIndex = todoItem?.dataset.index;
        todoApp.toggleTodo(targetIndex);
      }

      if (target.classList.contains("delete-button")) {
        console.log(target);
        const todoItem = getTarget(target, "todo-item");
        const targetIndex = todoItem.dataset.index;
        todoApp.deleteTodo(targetIndex);
      }
    });
  }

  /**
   * 📌 키보드 이벤트 리스너를 세팅하는 메소드 입니다.
   *
   */
  setAddInputKeydownListener() {
    this.$addInput.addEventListener("keydown", (e) => {
      if (e.code !== "Enter" || e.isComposing) return;
      e.preventDefault();
      const input = e.target;
      this.addTodo(input.value);
      input.value = "";
    });
  }

  /**
   * 📌 TodoApp을 렌더하는 메소드입니다.
   */
  render() {
    this.$todoList.innerHTML = this.todoList.render(this.data);
  }

  /**
   * 📌 새로운 데이터인 nextData를 받아서 다시 렌더링하는 메소드입니다.
   *
   * @param {Object[]} nextData
   * @param {string} nextData[].text - 할 일에 대한 내용
   * @param {boolean} nextData[].isCompleted - 할 일 완료여부
   */
  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  /**
   * 📌 새로운 todo를 추가하는 메소드입니다.
   *
   * @param {string} newText - 새로 추가할 todo의 text
   */
  addTodo(newText) {
    const newData = [...this.data, { text: newText, isCompleted: false }];
    this.setState(newData);
  }

  /**
   * 📌 해당되는 index를 가진 todo의 isCompleted값을 토글하는 메소드입니다.
   *
   * @param {number} index - 변경할 Todo의 index값
   */
  toggleTodo(index) {
    const newData = this.data.map((todo, i) =>
      i === parseInt(index) ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    this.setState(newData);
  }

  /**
   * 📌 해당되는 index의 todo 삭제하는 메소드입니다.
   *1
   *2
   *3
   *4  133131313
   * @param {number} index - 변경할 Todo의 index값
   */

  deleteTodo(index) {
    const newData = this.data.filter((todo, i) => i !== parseInt(index));
    this.setState(newData);
  }
}
