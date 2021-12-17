import { Button } from "@chakra-ui/button";
import {
  ArrowForwardIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";
import { Box, Container, Heading, Text } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import Quiz from "./Quiz.json";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Fade, Collapse } from "@chakra-ui/transition";
import { QuizContext } from "../QuizContext";
import shuffle from "../shuffle";
import { encodeId } from "../HashIds";

export default function IndexPage() {
  var navigate = useNavigate();

  var [loading, setLoading] = useState(false);
  var [show, setShow] = useState(false);
  var [showDetails, setShowDetails] = useState(false);
  var { quiz, setQuiz } = useContext(QuizContext);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 100);
  }, []);

  function start() {
    setLoading(true);

    setTimeout(() => {
      setShow(false);

      setTimeout(() => {
        // START THE QUIZ

        var questionOrder = Array.from(Array(Quiz.questions.length).keys());

        // Shuffle question order if enabled
        if (Quiz.shuffleQuestionOrder) {
          shuffle(questionOrder);
        }

        var questions = Quiz.questions;

        // Shuffle multiple choice order if enabled
        if (Quiz.shuffleMultipleChoiceOrder) {
          questions.forEach((question) => {
            if (Array.isArray(question.choices)) {
              shuffle(question.choices);
            }
          });
        }

        setQuiz({
          ...Quiz,
          questionOrder: questionOrder,
          answers: [],
          startTime: Date.now(),
          currentIndex: 0,
          questions: questions,
        });

        // Go to first question
        navigate("/question/" + encodeId(0));
      }, 500);
    }, 300);
  }

  if (quiz) {
    navigate("/question/" + encodeId(0));

    return <></>;
  }

  return (
    <Fade in={show}>
      <Box>
        <Container maxW="2xl" width="100%" mx="auto" my={20}>
          <Heading as="h1">{Quiz.title}</Heading>
          <Text color="gray.500" mt={2}>
            You will have <strong>{Quiz.timeLimitMinutes} minutes</strong> to
            complete this quiz.
          </Text>

          <Box mt={8}>
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="blue"
              size="lg"
              onClick={() => {
                start();
              }}
              isLoading={loading}
            >
              Start
            </Button>
          </Box>

          <Box mt={40} color="gray.500">
            <Text
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
              userSelect="none"
              onClick={() => {
                setShowDetails(!showDetails);
              }}
            >
              {showDetails ? "Hide" : "View"} more details{" "}
              {showDetails ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </Text>

            <Collapse in={showDetails}>
              <Box mt={4}>
                <Text>
                  Duration: {Quiz.timeLimitMinutes} minutes <br />
                  Questions: {Quiz.questions.length} questions <br />
                </Text>
              </Box>
            </Collapse>
          </Box>
        </Container>
      </Box>
    </Fade>
  );
}
