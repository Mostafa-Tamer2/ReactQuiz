import React from "react";
import Options from "./Options";
import { useQuiz } from "../context/QuizContext";

export default function Question() {
  const { questions, index } = useQuiz();
  const questionIndex = questions.at(index);
  return (
    <div>
      <h4>{questions.question}</h4>
      <Options question={questionIndex} />
    </div>
  );
}
