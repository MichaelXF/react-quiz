import { ChakraProvider } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import { QuizContext } from "./QuizContext";

function App() {
  var [quiz, setQuiz] = useState();

  var quizValue = useMemo(() => {
    return { quiz, setQuiz };
  }, [quiz]);

  return (
    <QuizContext.Provider value={quizValue}>
      <ChakraProvider>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <AppRouter />
        </BrowserRouter>
      </ChakraProvider>
    </QuizContext.Provider>
  );
}

export default App;
