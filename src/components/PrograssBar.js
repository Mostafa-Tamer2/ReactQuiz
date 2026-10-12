import React from "react";
import { useQuiz } from "../context/QuizContext";

export default function PrograssBar() {
  const { index:questionNumber, points, numOfQuestions, totalPoints, answer } =
    useQuiz();
  return (
    <header className="progress">
      <progress
        className="progress-bar"
        value={questionNumber + Number(answer !== null)}
        max={numOfQuestions}
      ></progress>
      <p>
        Question <strong>{questionNumber + 1}</strong> / {numOfQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{totalPoints} points
      </p>
    </header>
  );
}
