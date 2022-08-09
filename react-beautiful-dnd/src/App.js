import logo from "./logo.svg";
import React, { useState } from "react";
import "./App.css";
import { initialData } from "./initialData";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
function App() {
  const [state, setState] = useState(initialData);
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

    const column = state.columns[source.droppableId];
    console.log(column);
    const newTaskIds = [...column.taskIds];
    console.log(newTaskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
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
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {state.columnOrder.map((columnId) => {
        const column = state.columns[columnId];
        const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
}

export default App;
