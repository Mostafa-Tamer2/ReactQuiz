import React from "react";

export default function PrograssBar({
  questionNumber,
  points,
  numOfQuestions,
  totalPoints,
  answer,
}) {
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
