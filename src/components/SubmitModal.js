import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

export default function SubmitModal({ isOpen, onClose, onSubmit }) {
  var [submitting, setSubmitting] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm</ModalHeader>
        <ModalBody>Are you sure you want to submit your quiz?</ModalBody>
        <ModalFooter>
          <Button
            mr={2}
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => {
              setSubmitting(true);
              setTimeout(() => {
                onSubmit();
                setTimeout(() => {
                  setSubmitting(false);
                }, 1000);
              }, 300);
            }}
            isLoading={submitting}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
