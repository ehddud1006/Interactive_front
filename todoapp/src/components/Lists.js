import React, { useState } from "react";

import styled from "styled-components";

import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import List from "./List";
const Container = styled.div``;
const TodoList = styled.div``;
const Lists = ({ data, setData, onChangeCompleted, deleteTodoListData }) => {
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
                    <List
                      el={el}
                      data={data}
                      setData={setData}
                      onChangeCompleted={onChangeCompleted}
                      deleteTodoListData={deleteTodoListData}
                    ></List>
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
