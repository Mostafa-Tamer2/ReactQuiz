import React from "react";
import { useQuiz } from "../context/QuizContext";

export default function Options({ question }) {
  const { dispatch, answer } = useQuiz();

  console.log(question);

  console.log(question);
  const hasAnswered = answer != null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${hasAnswered ? (index === question.correctOption ? "correct" : "wrong") : ""}`}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={hasAnswered}
          key={option}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
