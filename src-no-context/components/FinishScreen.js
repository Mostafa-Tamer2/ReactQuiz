import React from "react";

export default function FinishScreen({
  points,
  totalPoints,
  highscore,
  dispatch,
}) {
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
