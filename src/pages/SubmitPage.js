import { useContext, useEffect } from "react";
import { QuizContext } from "../QuizContext";
import { useNavigate } from "react-router-dom";
import { Box, Spinner } from "@chakra-ui/react";

export default function SubmitPage() {
  var { quiz, setQuiz } = useContext(QuizContext);
  var navigate = useNavigate();

  useEffect(() => {
    var correct = 0;
    var incorrectAnswers = [];

    for (var i = 0; i < quiz.answers.length; i++) {
      var correctAnswers = quiz.questions[i].answers || [
        quiz.questions[i].answer,
      ];
      var givenAnswer = quiz.answers[i];

      if (
        correctAnswers
          .map((answer) => (answer + "").toLowerCase())
          .includes((givenAnswer + "").toLowerCase())
      ) {
        // correct
        correct++;
      } else {
        incorrectAnswers.push(i);
      }
    }

    var score = correct / quiz.questions.length;

    setQuiz({
      ...quiz,
      score: score,
      correct: correct,
      incorrectAnswers: incorrectAnswers,
      completed: true,
      endTime: Date.now(),
      durationSeconds: Math.floor((Date.now() - quiz.startTime) / 1000),
      currentIndex: -1,
    });

    setTimeout(() => {
      navigate("/completed");
    }, 1500);
  }, []);

  return (
    <>
      <Box textAlign="center" color="gray.500" mt={20}>
        <Spinner />
      </Box>
    </>
  );
}
