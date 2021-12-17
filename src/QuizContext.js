import { createContext } from "react";

export const QuizContext = createContext({
  quiz: {
    completed: false,
    score: 0,
    correct: 0,
    incorrectAnswers: [],
    questionOrder: [],
    answers: [],
    startTime: 0,
    endTime: 0,
    durationSeconds: 0,
    timeLimitMinutes: 0,
    currentIndex: -1,
    title: "",
    questions: [
      {
        type: "",
        choices: [],
        answer: "",
        answers: [],
      },
    ],
  },
  setQuiz: (quiz) => {},
});
