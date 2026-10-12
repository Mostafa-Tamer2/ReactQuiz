import React from "react";
import { useQuiz } from "../context/QuizContext";

export default function NextButton() {
  const { dispatch, questionAnswer, index, numOfQuestions } = useQuiz();
  if (questionAnswer === null) return null;

  if (index < numOfQuestions - 1) {
    return (
      <button
        className="btn | btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  }
  if (index === numOfQuestions - 1) {
    return (
      <button
        className="btn | btn-ui"
        onClick={() => dispatch({ type: "finished" })}
      >
        Finish
      </button>
    );
  }
}
