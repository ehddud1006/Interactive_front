import logo from "./logo.svg";
import React, { useState } from "react";
import "./App.css";
import { initialData } from "./initialData";
import Column from "./Column";
function App() {
  const [state, setState] = useState(initialData);
  return (
    <div>
      {state.columnOrder.map((columnId) => {
        const column = state.columns[columnId];
        const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </div>
  );
}

export default App;
