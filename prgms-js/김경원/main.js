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
    const notValidData = todoList.some(
      (item) =>
        !item ||
        !item.hasOwnProperty("text") ||
        !item.hasOwnProperty("isCompleted")
    );

    if (notValidData) {
      throw new Error("잘못된 데이터 형식입니다.");
    }
  }

  static validate(todoList) {
    this.isFalsy(todoList);
    this.isNotObject(todoList);
    this.isNotArray(todoList);
    this.isNotValidData(todoList);

    return todoList;
  }
}

class TodoList {
  constructor(todoList, container) {
    this.todoList = todoList;
    this.container = container;
  }

  render() {
    const createListItem = (text) => `<li>${text}</li>`;

    const list = this.todoList
      .map(({ text, isCompleted }) =>
        isCompleted ? createListItem(`<s>${text}</s>`) : createListItem(text)
      )
      .join("");

    this.container.insertAdjacentHTML("afterbegin", `<ul>${list}</ul>`);
  }

  unmountList() {
    this.container.removeChild(this.container.childNodes[0]);
  }

  setState(todoList) {
    this.todoList = todoList;
    this.unmountList();
    this.render();
  }
}

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

const list = [
  {
    text: "JS 공부하기",
    isCompleted: true,
  },
  {
    text: "JS 복습하기",
    isCompleted: false,
  },
];

const list1 = [
  {
    text: "이직하기",
    isCompleted: true,
  },
  {
    text: "좋은데로 이직하기",
    isCompleted: false,
  },
];

const list2 = [
  {
    text: "기본이 탄탄한 개발자 되기",
    isCompleted: true,
  },
  {
    text: "기본기 실력쌓기",
    isCompleted: false,
  },
];

const list3 = [
  {
    text: "데드리프트",
    isCompleted: true,
  },
  {
    text: "스쿼트",
    isCompleted: false,
  },
];

const listWrapper = document.querySelector("div#todo-list");
const listWrapper1 = document.querySelector("div#todo-list-1");
const listWrapper2 = document.querySelector("div#todo-list-2");

try {
  const validList = ListValidator.validate(list);
  new TodoList(validList, listWrapper).render();

  const validList1 = ListValidator.validate(list1);
  new TodoList(validList1, listWrapper1).render();

  const validList2 = ListValidator.validate(list2);
  const todoList = new TodoList(validList2, listWrapper2);

  todoList.render();

  setTimeout(() => {
    todoList.setState(ListValidator.validate(list3));
  }, 3000);
} catch (error) {
  alert(error.message);
}
