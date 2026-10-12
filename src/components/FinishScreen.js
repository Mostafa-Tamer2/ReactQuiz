import React from "react";
import { useQuiz } from "../context/QuizContext";

export default function FinishScreen() {
  const { points, totalPoints, highscore, dispatch } = useQuiz();
  const percentage = (points / totalPoints) * 100;
  return (
    <>
      <p className="result">
        You Scored <strong>{points}</strong> Out Of {totalPoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore"> (Highscore: {highscore} Score)</p>

      <button
        className="btn | btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}
