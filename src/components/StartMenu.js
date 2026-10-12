import React from "react";
import { useQuiz } from "../context/QuizContext";

export default function StartMenu() {
  const { numOfQuestions, dispatch } = useQuiz();
  return (
    <div className="start">
      <h2>Welcome TO React Quiz</h2>
      <h3>{numOfQuestions} You have to solve</h3>
      <button
        className="btn | btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Lets Start
      </button>
    </div>
  );
}
