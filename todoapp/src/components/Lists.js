import React from "react";

import styled from "styled-components";
import { TodoText } from "./style";
const Lists = ({ data, onChangeCompleted, deleteTodoListData }) => {
  return (
    <div>
      {data.map((el) => {
        return (
          <TodoText key={el.id} completed={el.completed}>
            <input
              onChange={() => onChangeCompleted(el.id)}
              type="checkbox"
              defaultChecked={false}
            ></input>
            <div>{el.text}</div>
            <button onClick={() => deleteTodoListData(el.id)}>x</button>
          </TodoText>
        );
      })}
    </div>
  );
};

export default Lists;
