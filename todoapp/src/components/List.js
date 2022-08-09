import React, { useState } from "react";
import { TodoText } from "./style";
const List = ({ el, data, setData, onChangeCompleted, deleteTodoListData }) => {
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState("");
  const onChangeEditText = (e) => {
    setEditText(e.target.value);
  };
  const onSave = (id) => {
    const newData = data.map((el) => {
      if (id === el.id) {
        el.text = editText;
      }
      return el;
    });
    setData(newData);
  };
  return (
    <TodoText key={el.id} completed={el.completed}>
      <input
        onChange={() => onChangeCompleted(el.id)}
        type="checkbox"
        defaultChecked={false}
      ></input>
      {edit ? (
        <input onChange={onChangeEditText} value={editText} type="text"></input>
      ) : (
        <div>{el.text}</div>
      )}
      {edit ? (
        <button
          onClick={() => {
            setEdit(false);
            onSave(el.id);
          }}
        >
          save
        </button>
      ) : (
        <button onClick={() => setEdit(true)}>edit</button>
      )}
      <button onClick={() => deleteTodoListData(el.id)}>x</button>
    </TodoText>
  );
};

export default List;
