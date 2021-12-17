import Icon from "@chakra-ui/icon";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/layout";
import { useContext } from "react";
import { QuizContext } from "../QuizContext";
import Countdown from "./Countdown";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  var { quiz } = useContext(QuizContext);
  var navigate = useNavigate();

  return (
    <Box bg="gray.200" position="relative">
      <Box p={4}>
        <Flex align="center" maxWidth="2xl" mx="auto" minHeight="36px">
          <Heading as="h1" fontSize="lg" fontWeight="bold" m={0} lineHeight="1">
            React Quiz
          </Heading>

          <Box ml="auto">
            {quiz && !quiz.completed ? (
              <>
                Time left:{" "}
                <Countdown
                  endAt={quiz.startTime + quiz.timeLimitMinutes * 60 * 1000}
                  onEnd={() => {
                    navigator("/submit");
                  }}
                />
              </>
            ) : null}
          </Box>
        </Flex>
      </Box>
      <Box position="absolute" bottom="0" height="2px" width="100%">
        {quiz ? (
          <Box
            width={
              Math.floor(
                ((quiz.currentIndex + 1) / quiz.questions.length) * 100
              ) + "%"
            }
            transition="width 0.3s ease"
            bg="blue.400"
            h="2px"
          ></Box>
        ) : null}
      </Box>
    </Box>
  );
}
