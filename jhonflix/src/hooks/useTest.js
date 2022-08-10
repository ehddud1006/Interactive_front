import { useState, useEffect } from "react";

export const useTest = () => {
  const [state, setStete] = useState("dddd");

  return [state];
};
