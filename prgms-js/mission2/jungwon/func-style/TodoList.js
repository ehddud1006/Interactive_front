export default function TodoList({ $target, initialState, onClick, onRemove }) {
  this.state = initialState;

  this.$element = document.createElement('ul');
  this.$element.classList.add('todo-list');
  $target.appendChild(this.$element);

  this.render = function () {
    this.$element.innerHTML = this.state
      .map(
        ({ text, isCompleted }, idx) => `
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
  };

  this.setState = function (nextState) {
    this.state = nextState;
    this.render();
  };

  this.render();

  this.$element.addEventListener('click', ({ target: $target }) => {
    if ($target.matches('.form-check')) {
      const targetIndex = $target.closest('.todo-item').dataset.index;
      onClick(targetIndex);
    }

    if ($target.matches('.delete-button')) {
      const targetIndex = $target.closest('.todo-item').dataset.index;
      onRemove(targetIndex);
    }
  });
}
