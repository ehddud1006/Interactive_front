import logo from "./logo.svg";
import "./App.css";

import React, { useState } from "react";
import Lists from "./components/Lists";
import Form from "./components/Form";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  console.log(localStorage.getItem("data"));
  const [data, setData] = useState(
    localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : []
  );

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
    localStorage.setItem("data", JSON.stringify(newData));
    console.log(id);
  };
  const deleteTodoListData = (id) => {
    console.log(id);
    const newData = data.filter((el) => id !== el.id);
    setData(newData);
    localStorage.setItem("data", JSON.stringify(newData));
  };
  const AddTodoListData = (e) => {
    console.log(text);
    e.preventDefault();
    let insertData = {
      id: String(Date.now()),
      text: text,
      completed: false,
    };

    setData([...data, insertData]);
    localStorage.setItem("data", JSON.stringify([...data, insertData]));
    setText("");
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    console.log(result);
    // 목적지가 없는 경우 (단순에러일듯)
    if (!destination) {
      return;
    }

    // 드래그했지만 드롭을 제자리에 한 경우
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const insert = data[source.index];
    data.splice(source.index, 1);
    data.splice(destination.index, 0, insert);
    // newTaskIds.splice(destination.index, 0, draggableId);

    // const newColumn = {
    //   ...column,
    //   taskIds: newTaskIds,
    // };

    // const newState = {
    //   ...state,
    //   columns: {
    //     ...state.columns,
    //     [newColumn.id]: newColumn,
    //   },
    // };

    setData(data);
    localStorage.setItem("data", JSON.stringify(data));
  };

  const deletAllData = () => {
    setData([]);
    localStorage.setItem("data", JSON.stringify([]));
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <div>
          <h1>할 일 목록</h1>
        </div>
        <Lists
          data={data}
          setData={setData}
          onChangeCompleted={onChangeCompleted}
          deleteTodoListData={deleteTodoListData}
        ></Lists>
        <Form
          text={text}
          AddTodoListData={AddTodoListData}
          onChangeText={onChangeText}
        ></Form>
        <button onClick={deletAllData}>전체삭제</button>
      </div>
    </DragDropContext>
  );
}

export default App;
