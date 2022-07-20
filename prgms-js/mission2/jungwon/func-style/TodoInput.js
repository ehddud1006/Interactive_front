export default function TodoInput({ $target, onAdd }) {
  this.$element = document.createElement('form');
  this.$element.classList.add('add-form');
  $target.appendChild(this.$element);

  this.render = function () {
    this.$element.innerHTML = `
      <input
        class="add-input"
        type="text"
        placeholder="Enter your todo to add them"
      />
    `;
  };

  this.render();

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
