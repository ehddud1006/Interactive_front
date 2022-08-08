import styled from "styled-components";

export const TodoText = styled.div`
  display: flex;

  & > div {
    text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  }
`;
