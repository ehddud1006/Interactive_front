class ListValidator {
  static isFalsy(todoList) {
    if (!todoList) {
      throw new Error("잘못된 데이터 형식입니다.");
    }
  }

  static isNotArray(todoList) {
    if (!Array.isArray(todoList) || !todoList.length) {
      throw new Error("잘못된 데이터 형식입니다.");
    }
  }

  static isNotObject(todoList) {
    if (typeof todoList !== "object") {
      throw new Error("잘못된 데이터 형식입니다.");
    }
  }

  static isNotValidData(todoList) {
    const hasMultipleProperties = (item) =>
      Object.getOwnPropertyNames(item).length > 1;

    const notValidData = todoList.some(
      (item) =>
        !item || !item.hasOwnProperty("text") || hasMultipleProperties(item)
    );

    if (notValidData) {
      throw new Error("잘못된 데이터 형식입니다.");
    }
  }

  static validate(todoList) {
    this.isFalsy(todoList);
    this.isNotArray(todoList);
    this.isNotObject(todoList);
    this.isNotValidData(todoList);

    return todoList;
  }
}

class TodoList {
  constructor(todoList) {
    this.todoList = todoList;
  }

  render() {
    const listWrapper = document.querySelector("div#todo-list");

    const list = this.todoList.map(({ text }) => `<li>${text}</li>`).join("");

    listWrapper.insertAdjacentHTML("afterbegin", `<ul>${list}</ul>`);
  }
}

const list = [
  {
    text: "JS 공부하기",
  },
  {
    text: "JS 복습하기",
  },
];

/* 
  오류상황 예시
  const falsyValue = null;
  const simpleObject = { text: 'fdslfjkoals' };
  const emptyArray = [];
  const string = '234234234';
  const wrongValues = [null, new Date()];
  const wrongValues2 = [
    { text: 'asdf', title: 'asdf' },
    { text: 'asdf', title: 'adsfasdf' },
  ];
  const wrongValues3 = [{ title: 'asdf' }, { title: 'adsfasdf' }]; 
  */

try {
  const validList = ListValidator.validate(list);
  const todoList = new TodoList(validList);
  todoList.render();
} catch (error) {
  alert(error.message);
}
