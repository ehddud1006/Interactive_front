import React from "react";

const Form = ({ AddTodoListData, text, onChangeText }) => {
  return (
    <div style={{ marginTop: "40px" }}>
      <form onSubmit={AddTodoListData}>
        <input type="text" value={text} onChange={onChangeText}></input>
        <input type="submit" value={"전송하기"}></input>
      </form>
    </div>
  );
};

export default Form;
