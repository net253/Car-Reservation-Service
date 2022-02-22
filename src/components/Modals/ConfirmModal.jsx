import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Stack,
  Text,
  useDisclosure,
  Icon,
  Grid,
  GridItem,
  PinInput,
  PinInputField,
  useToast,
} from "@chakra-ui/react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import axios from "axios";

const urlPath = "/crs/API/edit-book.php";

export default function BookingModal({ formInput }) {
  const [ID, setID] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleSubmit = () => {
    // console.log(formInput);

    if (ID == formInput.code) {
      axios
        .post(urlPath, { ...formInput })
        .then(({ data: { state } }) => {
          // console.log(data);
          if (state) {
            toast({
              title: "แก้ไขสำเร็จ (Edit success.)",
              status: "success",
              duration: 2000,
              isClosable: true,
              position: "top-right",
            });
          } else {
            toast({
              title: "แก้ไขไม่สำเร็จ (Edit error.)",
              status: "error",
              duration: 2000,
              isClosable: true,
              position: "top-right",
            });
          }
        })
        .then(() => onClose());
    } else {
      toast({
        title: "รหัสพนักงานไม่ถูกต้อง (Employee ID incorrect.)",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <>
      <Button
        colorScheme="green"
        leftIcon={<Icon as={FaCheckCircle} />}
        me={2}
        onClick={onOpen}
        rounded="3xl"
      >
        Confirm
      </Button>

      {/* Modal */}
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        size="xl"
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Stack direction="row">
              <Text
                className="font-thai"
                fontWeight="bold"
                fontSize="xl"
                textAlign="center"
              >
                ยืนยันการแก้ไข
              </Text>
              <Text fontWeight="bold" fontSize="lg">
                (Edit confirm)
              </Text>
            </Stack>
          </ModalHeader>

          {/* Body */}
          <ModalBody>
            <Grid templateColumns="repeat(2, 1fr)">
              <GridItem colSpan={2}>
                <Stack direction="row" mb={3}>
                  <Text
                    className="font-thai"
                    fontWeight="bold"
                    textAlign="center"
                  >
                    รหัสพนักงาน
                  </Text>
                  <Text fontWeight="bold" fontSize="sm">
                    (Employee ID)
                  </Text>
                </Stack>
                <Stack direction="row" justifyContent="center" spacing={4}>
                  <PinInput onComplete={(ID) => setID(ID)}>
                    {Array(7)
                      .fill(0)
                      .map((_, i) => (
                        <PinInputField key={i} />
                      ))}
                  </PinInput>
                </Stack>
              </GridItem>
            </Grid>
          </ModalBody>

          {/* Button */}
          <ModalFooter>
            <Button
              colorScheme="green"
              leftIcon={<Icon as={FaCheckCircle} />}
              me={2}
              onClick={handleSubmit}
              disabled={ID == ""}
              rounded="3xl"
            >
              Confirm
            </Button>
            <Button
              onClick={onClose}
              colorScheme="red"
              leftIcon={<Icon as={FaTimesCircle} />}
              rounded="3xl"
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
