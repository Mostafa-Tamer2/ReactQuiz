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
import { useQuiz } from "../context/QuizContext";

export default function App() {
  const { status } = useQuiz();
  return (
    <div className="app">
      <Header />

      {/*===== Main Section =====*/}
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}

        {/*===== Start Menu =====*/}
        {status === "ready" && <StartMenu />}

        {/*===== Active Quiz =====*/}
        {status === "active" && (
          <>
            <PrograssBar />
            <Question />

            <Timer />
            {/*===== Next Question Button =====*/}
            <NextButton />
          </>
        )}

        {/*===== Finshed Screen Section =====*/}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}
