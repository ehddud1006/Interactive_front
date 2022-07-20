class TodoCount {
  constructor({ $target, initialState }) {
    this.state = initialState;

    this.$element = document.createElement('span');
    this.$element.classList.add('todo-count');
    $target.appendChild(this.$element);

    this.render();
  }

  render() {
    const completed = this.state.filter(({ isCompleted }) => isCompleted);
    this.$element.innerHTML = `<small class="todo-count">${completed.length}/${this.state.length}</small>`;
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }
}
