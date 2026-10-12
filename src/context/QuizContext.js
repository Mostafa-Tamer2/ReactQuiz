import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const intialState = {
  questions: [],

  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaning: null,
};
const SECS_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFaild":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaning: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "timer":
      return {
        ...state,
        secondsRemaning: state.secondsRemaning - 1,
        status: state.secondsRemaning === 0 ? "finished" : state.status,
      };
    case "restart":
      return { ...intialState, status: "ready", questions: state.questions };

    default:
      throw new Error("Unknown action type");
  }
}

//Context Provider
export default function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaning },
    dispatch,
  ] = useReducer(reducer, intialState);

  const numOfQuestions = questions.length;
  const totalPoints = questions.reduce((acc, curr) => acc + curr.points, 0);

  //Fetch All Questions
  useEffect(function () {
    async function getQuestions() {
      try {
        const response = await fetch("http://localhost:8000/questions");

        const data = await response.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        dispatch({ type: "dataFaild" });
      }
    }
    getQuestions();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaning,
        numOfQuestions,
        totalPoints,

        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

//Use Context
function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) throw new Error("Wrong Context Scope");
  return context;
}

export { QuizProvider, useQuiz };
