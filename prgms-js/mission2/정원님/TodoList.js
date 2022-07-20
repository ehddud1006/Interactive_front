class TodoList {
  /**
   * 📌 todoList를 렌더하는 메소드입니다.
   */
  render(data) {
    return data
      .map(
        ({ text, isCompleted }, idx) =>
          `
        <li class="todo-item" data-index=${idx}>
        <label class="form-check-group">
          <input class="form-check" type="checkbox" ${
            isCompleted ? "checked" : ""
          } />
          <span>${text}</span>
        </label>
        <button class="btn delete-button" type="button">delete</button>
      </li>
        `
      )
      .join("");
  }
}
