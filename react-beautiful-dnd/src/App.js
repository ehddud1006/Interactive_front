import logo from "./logo.svg";
import React, { useState } from "react";
import "./App.css";
import { initialData } from "./initialData";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
`;
function App() {
  const [state, setState] = useState(initialData);

  const onDragStart = () => {
    document.body.style.color = "orange";
    document.body.style.transition = "background-color 0.2 ease";
  };

  const onDragUpdate = (update) => {
    const { destination } = update;
    const opacity = destination
      ? destination.index / Object.keys(state.tasks).length
      : 0;

    document.body.style.backgroundColor = `rgba(153,141,217,${opacity})`;
  };
  const onDragEnd = (result) => {
    document.body.style.color = "inherit";
    document.body.style.backgroundColor = "inherit";
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

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];
    if (start === finish) {
      const newTaskIds = [...start.taskIds];

      //[3 4 1 2] 의 task Id를 가질때 '2'라는 taskId를 index 가 1인 위치에 옮긴다고 가정하자.
      // 현재 taskId = 2 인 리스트의 index는 4 이다.
      // 즉 splice 한 배열의 결과값은 [3 4 1] 이 된다.
      newTaskIds.splice(source.index, 1);

      // 이 리스트를 index = 1 의 자리로 옮기기 때문에,
      // splice 한 값은 [3 2 4 1] 이 된다.
      newTaskIds.splice(destination.index, 0, draggableId);

      // 기존의 taskIds을  새롭게 얻은 값인 newTaskIds으로 업데이트 한다.
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
      return;
    }

    const startTaskIds = [...start.taskIds];
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setState(newState);
  };
  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Container>
        {state.columnOrder.map((columnId) => {
          const column = state.columns[columnId];
          const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </Container>
    </DragDropContext>
  );
}

export default App;
