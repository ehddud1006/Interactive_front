import logo from "./logo.svg";
import "./App.css";

import React, { useState } from "react";
import { getByTitle } from "@testing-library/react";
import Lists from "./components/Lists";
import Form from "./components/Form";
function App() {
  const [data, setData] = useState([
    {
      id: "1",
      text: "공부하기",
      completed: false,
    },
    {
      id: "2",
      text: "화이팅하기",
      completed: false,
    },
  ]);

  const [text, setText] = useState("");
  const onChangeText = (e) => {
    console.log(e.target.value);
    setText(e.target.value);
  };

  const onChangeCompleted = (id) => {
    let newData = data.map((el) => {
      if (el.id === id) {
        el.completed = !el.completed;
      }
      return el;
    });
    setData(newData);
    console.log(id);
  };
  const deleteTodoListData = (id) => {
    console.log(id);
    const newData = data.filter((el) => id !== el.id);
    setData(newData);
  };
  const AddTodoListData = (e) => {
    console.log(text);
    e.preventDefault();
    let insertData = {
      id: Date.now(),
      text: text,
      completed: false,
    };

    setData([...data, insertData]);
    setText("");
  };
  return (
    <div>
      <div>
        <div>
          <h1>할 일 목록</h1>
        </div>
        <Lists
          data={data}
          onChangeCompleted={onChangeCompleted}
          deleteTodoListData={deleteTodoListData}
        ></Lists>
        <Form
          text={text}
          AddTodoListData={AddTodoListData}
          onChangeText={onChangeText}
        ></Form>
      </div>
    </div>
  );
}

export default App;
