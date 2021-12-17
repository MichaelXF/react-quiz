import { Button } from "@chakra-ui/button";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/layout";
import { useParams } from "react-router-dom";
import { Checkbox } from "@chakra-ui/checkbox";
import { Fade, Input } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { QuizContext } from "../QuizContext";
import { useNavigate } from "react-router-dom";
import { decodeId, encodeId } from "../HashIds";
import SubmitModal from "../components/SubmitModal";

export default function QuestionPage() {
  var navigate = useNavigate();

  var { number } = useParams();
  var { quiz, setQuiz } = useContext(QuizContext);
  var [show, setShow] = useState(false);

  var [showSubmit, setShowSubmit] = useState(false);

  useEffect(() => {
    setShow(false);
    if ("activeElement" in document) document.activeElement.blur();

    setTimeout(() => {
      setShow(true);
      if (quiz) {
        setQuiz({ ...quiz, currentIndex: decodedNumber });
      }
    }, 100);
  }, [number]);

  if (!quiz) {
    setTimeout(() => {
      navigate("/");
    });
    return <></>;
  }

  if (quiz.completed) {
    setTimeout(() => {
      navigate("/completed");
    }, 100);
    return <></>;
  }

  var decodedNumber = decodeId(number);

  var index = quiz.questionOrder[decodedNumber];

  var question = quiz.questions[index];

  var answer = quiz.answers[index];

  function setAnswer(newAnswer) {
    var newAnswers = [...quiz.answers];
    newAnswers[index] = newAnswer;

    setQuiz({
      ...quiz,
      answers: newAnswers,
    });
  }

  if (!question) {
    navigate("/");

    return <p>{JSON.stringify(quiz)}</p>;
  }

  return (
    <Box>
      <SubmitModal
        isOpen={showSubmit}
        onClose={() => {
          setShowSubmit(false);
        }}
        onSubmit={() => {
          setTimeout(() => {
            navigate("/submit");
          }, 300);
        }}
      />

      <Fade in={show}>
        <Container maxW="2xl" mx="auto" my={20}>
          <Text color="gray.500" mb={1}>
            Question {decodedNumber + 1}
          </Text>
          <Heading as="h1" mb={4}>
            {question.title}
          </Heading>

          {question.type === "multipleChoice" ? (
            <Box>
              {question.choices.map((choice, i) => {
                return (
                  <Box key={i} mb={2}>
                    <Button
                      width="100%"
                      justifyContent="flex-start"
                      onClick={() => {
                        setAnswer(choice);
                      }}
                    >
                      <Checkbox
                        userSelect="none"
                        isChecked={choice == answer}
                      />
                      <Text ml={2} lineHeight="1" mt="3px">
                        {choice}
                      </Text>
                    </Button>
                  </Box>
                );
              })}
            </Box>
          ) : (
            <Box>
              <Input
                onInput={(e) => {
                  setAnswer(e.target.value);
                }}
                value={answer || ""}
                placeholder="Type your answer here..."
              ></Input>
            </Box>
          )}

          <Box mt={8}>
            <Flex>
              <Fade in={decodedNumber !== 0}>
                <Button
                  mr={1}
                  leftIcon={<ArrowBackIcon />}
                  onClick={() => {
                    setShow(false);

                    setTimeout(() => {
                      navigate("/question/" + encodeId(decodedNumber - 1));
                    }, 500);
                  }}
                >
                  Back
                </Button>
              </Fade>

              <Box ml="auto">
                {decodedNumber === quiz.questions.length - 1 ? (
                  <Button
                    ml="auto"
                    colorScheme="blue"
                    onClick={() => {
                      setShowSubmit(true);
                    }}
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    ml="auto"
                    rightIcon={<ArrowForwardIcon />}
                    colorScheme="blue"
                    onClick={() => {
                      setShow(false);
                      setTimeout(() => {
                        navigate("/question/" + encodeId(decodedNumber + 1));
                      }, 500);
                    }}
                  >
                    Next Question
                  </Button>
                )}
              </Box>
            </Flex>
          </Box>
        </Container>
      </Fade>
    </Box>
  );
}
