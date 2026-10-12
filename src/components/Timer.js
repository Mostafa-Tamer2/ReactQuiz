import React, { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";

export default function Timer() {
  const { secondsRemaning, dispatch } = useQuiz();
  const mins = Math.floor(secondsRemaning / 60);
  const sec = secondsRemaning % 60;
  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "timer" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch],
  );
  return (
    <div className="timer">
      {mins < 10 ? `0${mins}` : mins} : {sec < 10 ? `0${sec}` : sec}
    </div>
  );
}
