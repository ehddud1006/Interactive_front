class TodoInput {
  constructor(placeholder) {
    this.placeholder = placeholder;
  }
  render() {
    return `
        <form class="add-form">
        <input
          class="add-input"
          type="text"
          placeholder="${this.placeholder}"
        />
      </form>
      `;
  }
}
