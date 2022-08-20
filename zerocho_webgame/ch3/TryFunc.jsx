import React, { memo, useState } from "react";

const Try = memo(({ tryInfo }) => {
  const [result, setResult] = useState(tryInfo.result);
  const onClick = () => {
    setResult("1");
  };
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div onClick={onClick}>{tryInfo.result}</div>
    </li>
  );
});
Try.displayName = "Try"; // react devtools 에서 이름이 이상해지는 것을 수정하는 코드.

export default Try;
