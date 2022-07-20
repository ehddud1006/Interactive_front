import TodoCount from './TodoCount.js';
import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import Storage from './Storage.js';

export default function App({ selector, name = 'Todo Name' }) {
  const storage = new Storage(name, []);

  this.$root = document.querySelector(selector);
  this.name = name;
  this.state = storage.getItem();

  /**
   * 📌 TodoApp을 init하는 메소드입니다.
   */
  this.init = () => {
    this.$root.innerHTML = `
    <article class="todo">
    <header class="todo-header">
      <div class="todo-title">
        <h2 class="todo-name">${this.name}</h2>
      </div>
    </header>
    <div class="todo-body"></div>
    
    <footer class="todo-footer">
      <button class="btn remove-all-button" type="button">
        Remove All
      </button>
    </footer>
  </article>
    `;
  };

  this.init();

  /**
   * 📌 새로운 데이터인 nextState를 받아서 다시 렌더링하는 메소드입니다.
   *
   * @param {Object[]} nextState
   * @param {string} nextState[].text - 할 일에 대한 내용
   * @param {boolean} nextState[].isCompleted - 할 일 완료여부
   */
  this.setState = function (nextState) {
    this.state = nextState;
    storage.setItem(nextState);
    todoList.setState(this.state);
    todoCount.setState(this.state);
  };

  /**
   * 📌 removeAll(커스텀 이벤트) 리스너를 세팅하는 메소드 입니다.
   *
   */
  this.setRemoveAll = function () {
    const $removeAllBtn = this.$root.querySelector('.remove-all-button');
    $removeAllBtn.addEventListener('click', () => {
      this.$root.dispatchEvent(new CustomEvent('removeAll'));
    });

    this.$root.addEventListener('removeAll', () => {
      this.setState([]);
    });
  };
  this.setRemoveAll();

  const todoCount = new TodoCount({
    $target: this.$root.querySelector('.todo-title'),
    initialState: this.state,
  });

  const todoInput = new TodoInput({
    $target: this.$root.querySelector('.todo-header'),

    onAdd: (text) => {
      const nextState = [...this.state, { text, isCompleted: false }];
      this.setState(nextState);
    },
  });

  const todoList = new TodoList({
    $target: this.$root.querySelector('.todo-body'),
    initialState: this.state,

    onClick: (index) => {
      const nextState = this.state.map((todo, i) =>
        i === parseInt(index, 10)
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      );
      this.setState(nextState);
    },

    onRemove: (index) => {
      const nextState = this.state.filter(
        (todo, i) => i !== parseInt(index, 10)
      );
      this.setState(nextState);
    },
  });
}
