import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartMenu from "./StartMenu";
import Question from "./Question";
import NextButton from "./NextButton";
import PrograssBar from "./PrograssBar";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";

const intialValue = {
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
      return { ...intialValue, status: "ready", questions: state.questions };

    default:
      throw new Error("Unknown action type");
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaning },
    dispatch,
  ] = useReducer(reducer, intialValue);
  const numOfQuestions = questions.length;
  const totalPoints = questions.reduce((acc, curr) => acc + curr.points, 0);

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
    <div className="app">
      <Header />

      {/*===== Main Section =====*/}
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}

        {/*===== Start Menu =====*/}
        {status === "ready" && (
          <StartMenu numOfQuestions={numOfQuestions} dispatch={dispatch} />
        )}

        {/*===== Active Quiz =====*/}
        {status === "active" && (
          <>
            <PrograssBar
              questionNumber={index}
              points={points}
              numOfQuestions={numOfQuestions}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />

            <Timer secondsRemaning={secondsRemaning} dispatch={dispatch} />
            {/*===== Next Question Button =====*/}
            <NextButton
              dispatch={dispatch}
              questionAnswer={answer}
              index={index}
              numOfQuestions={numOfQuestions}
            />
          </>
        )}

        {/*===== Finshed Screen Section =====*/}
        {status === "finished" && (
          <FinishScreen
            totalPoints={totalPoints}
            points={points}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
