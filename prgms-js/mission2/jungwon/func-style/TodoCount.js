export default function TodoCount({ $target, initialState }) {
  this.state = initialState;

  this.$element = document.createElement('span');
  this.$element.classList.add('todo-count');
  $target.appendChild(this.$element);

  this.render = function () {
    const completed = this.state.filter(({ isCompleted }) => isCompleted);
    this.$element.innerText = `${completed.length}/${this.state.length}`;
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render();
}
