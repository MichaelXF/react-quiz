import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { QuizContext } from "../QuizContext";
import { useNavigate } from "react-router-dom";

function Panel({ heading, children }) {
  return (
    <Box
      boxShadow="rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px"
      p={6}
      borderRadius={4}
      mb={8}
    >
      <Text color="gray.500" mb={2}>
        {heading}
      </Text>

      <Text fontSize="4xl" fontWeight="bold" lineHeight={1}>
        {children}
      </Text>
    </Box>
  );
}

export default function CompletedPage() {
  var { quiz } = useContext(QuizContext);

  var navigate = useNavigate();

  if (!quiz || !quiz.completed) {
    setTimeout(() => {
      navigate("/");
    }, 200);
    return <></>;
  }

  return (
    <Box>
      <Container maxW="2xl" mx="auto" my={20}>
        <Heading as="h1" mb={8}>
          You completed the {quiz.title}.
        </Heading>

        <Panel heading="You scored:">{Math.floor(quiz.score * 100)}%</Panel>
        <Panel heading="Correct answers:">{quiz.correct}</Panel>
        <Panel heading="Time taken:">
          {quiz.durationSeconds > 60
            ? Math.floor(quiz.durationSeconds / 60) + " minutes"
            : quiz.durationSeconds + " seconds"}
        </Panel>
      </Container>
    </Box>
  );
}
