import { Box } from "@chakra-ui/layout";
import { Route, Routes } from "react-router";
import Nav from "./components/Nav";
import CompletedPage from "./pages/CompletedPage";
import IndexPage from "./pages/IndexPage";
import QuestionPage from "./pages/QuestionPage";
import SubmitPage from "./pages/SubmitPage";

export default function AppRouter() {
  return (
    <Box>
      <Nav />

      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/question/:number" element={<QuestionPage />} />
        <Route path="/completed" element={<CompletedPage />} />
        <Route path="/submit" element={<SubmitPage />} />
      </Routes>
    </Box>
  );
}
