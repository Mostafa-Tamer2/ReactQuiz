import React from "react";

export default function NextButton({
  dispatch,
  questionAnswer,
  index,
  numOfQuestions,
}) {
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
