class TodoList {
  constructor({ $target, initialState, onClick, onRemove }) {
    this.state = initialState;
    this.onClick = onClick;
    this.onRemove = onRemove;

    this.$element = document.createElement('ul');
    this.$element.classList.add('todo-list');
    $target.appendChild(this.$element);

    this.render();
    this.setClickListener();
  }

  render() {
    this.$element.innerHTML = this.state
      .map(
        ({ text, isCompleted }, idx) =>
          `
        <li class="todo-item" data-index=${idx}>
        <label class="form-check-group">
          <input class="form-check" type="checkbox" ${
            isCompleted ? 'checked' : ''
          } />
          <span>${text}</span>
        </label>
        <button class="btn delete-button" type="button">delete</button>
      </li>
        `
      )
      .join('');
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  setClickListener() {
    this.$element.addEventListener('click', ({ target: $target }) => {
      if ($target.matches('.form-check')) {
        const targetIndex = $target.closest('.todo-item').dataset.index;
        this.onClick(targetIndex);
      }

      if ($target.matches('.delete-button')) {
        const targetIndex = $target.closest('.todo-item').dataset.index;
        this.onRemove(targetIndex);
      }
    });
  }
}
