import logo from "./logo.svg";
import React, { useState } from "react";
import "./App.css";
import { initialData } from "./initialData";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
function App() {
  const [state, setState] = useState(initialData);
  const onDragEnd = (result) => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {state.columnOrder.map((columnId) => {
        const column = state.columns[columnId];
        const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
        console.log(tasks);
        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
}

export default App;
