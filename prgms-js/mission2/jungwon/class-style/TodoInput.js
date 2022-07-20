class TodoInput {
  constructor({ $target, onAdd }) {
    this.$element = document.createElement('form');
    this.$element.classList.add('add-form');
    $target.appendChild(this.$element);

    this.render();

    this.setKeydownListener(onAdd);
  }

  render() {
    this.$element.innerHTML = `
      <form class="add-form">
      <input
        class="add-input"
        type="text"
        placeholder="Enter your todo to add them"
      />
    </form>
    `;
  }

  setKeydownListener(onAdd) {
    this.$element.addEventListener('keydown', (e) => {
      if (e.code !== 'Enter' || e.isComposing) return;
      e.preventDefault();
      const { target: $input } = e;

      if (!$input.value) {
        alert('내용을 입력해주세요.');
        return;
      }
      onAdd($input.value);
      $input.value = '';
    });
  }
}
