import React from "react";

import styled from "styled-components";
import { TodoText } from "./style";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
const Container = styled.div``;
const TodoList = styled.div``;
const Lists = ({ data, onChangeCompleted, deleteTodoListData }) => {
  return (
    <Droppable droppableId={"drop1"}>
      {(provided) => (
        <TodoList {...provided.droppableProps} ref={provided.innerRef}>
          {data.map((el, index) => {
            return (
              <Draggable key={el.id} draggableId={el.id} index={index}>
                {(provided) => (
                  <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <TodoText key={el.id} completed={el.completed}>
                      <input
                        onChange={() => onChangeCompleted(el.id)}
                        type="checkbox"
                        defaultChecked={false}
                      ></input>
                      <div>{el.text}</div>
                      <button onClick={() => deleteTodoListData(el.id)}>
                        x
                      </button>
                    </TodoText>
                  </Container>
                )}
              </Draggable>
            );
          })}
        </TodoList>
      )}
    </Droppable>
  );
};

export default Lists;
