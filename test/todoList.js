"use strict";

import data, { isValidData } from "./data.js";

function TodoList(data) {
  // new keyword 동반하여 호출했는지 체크
  if (!(this instanceof TodoList)) {
    console.log(TodoList);
    console.log(this instanceof TodoList);
    throw new Error("new 키워드를 사용해 호출해 주세요");
  }

  // 데이터 유효성 체크
  if (!isValidData(data)) {
    throw new Error("유효한 인자인지 확인해주세요");
  }

  this.data = data;
  this.render = function () {
    const mountElement = document.querySelector("#todo-list");
    const liTagsString = this.data
      .map((item) => `<li>${item.text}</li>`)
      .join("");
    mountElement.innerHTML = `<ul>${liTagsString}</ul>`;
  };
}

const todoList = TodoList(data);
todoList.render();
