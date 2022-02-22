import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
  Text,
  useDisclosure,
  Icon,
  PinInput,
  PinInputField,
  useToast,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

const urlCancel = "/crs/API/return-cancel.php";

export default function CancelModal({ information }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [code, setCode] = useState("");
  const [searchInfo, setSearchInfo] = useState();
  const toast = useToast();

  const handleSearch = () => {
    const info = information.filter((data) => data.code == code);
    if (info != "") {
      setSearchInfo(info);
    } else {
      toast({
        title: "ไม่พบข้อมูลการจอง (Reservation information not found.)",
        description:
          "กรุณาตรวจสอบรหัสพนักงานให้ถูกต้อง (Please check your employee ID.)",
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleClose = () => {
    setSearchInfo(undefined);
    setCode(undefined);
    onClose();
  };

  const dateTimeFormat = (info) => {
    var dateSpilt = info.slice(0, 16).split(" ");
    var date = dateSpilt[0].split("-").reverse().join("/");
    return date + " " + dateSpilt[1];
  };

  const handleSubmit = (info) => {
    handleClose();
    Swal.fire({
      title: "ต้องการยกเลิกใช่หรือไม่? (Do you want to cancel?)",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่ (Yes)",
      cancelButtonText: "ไม่ใช่ (No)",
      html: `<p>ผู้จอง (Booking by): <b>${info.name}</b></p>
      <p>ป้ายทะเบียน (Car licanse): <b>${info.cars}</b></p>
      `,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(urlCancel, { ...info, action: "cancel", parking: "-" })
          .then(({ data: { state } }) => {
            if (state) {
              Swal.fire({
                title: "ยกเลิกสำเร็จ (Cancel success.)",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });
            } else {
              Swal.fire({
                title: "ยกเลิกไม่สำเร็จ (Cancel error.)",
                icon: "error",
                timer: 1500,
                showConfirmButton: false,
              });
            }
          });
      }
    });
  };

  return (
    <>
      <Button colorScheme="red" variant="solid" w={180} onClick={onOpen}>
        <Stack direction="row">
          <Text
            className="font-thai"
            fontWeight="bold"
            fontSize="md"
            textAlign="center"
          >
            ยกเลิกจอง
          </Text>
          <Text fontWeight="bold" fontSize="md">
            (Canceling)
          </Text>
        </Stack>
      </Button>

      {/* Modal */}
      <Modal onClose={onClose} isOpen={isOpen} isCentered size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Stack direction="row">
              <Text
                className="font-thai"
                fontWeight="bold"
                fontSize="lg"
                textAlign="center"
              >
                ยกเลิกการจอง
              </Text>
              <Text fontWeight="bold" fontSize="md">
                (Canceling)
              </Text>
            </Stack>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Stack direction="row">
              <Text className="font-thai" fontWeight="bold">
                ค้นหาด้วยรหัสพนักงาน
              </Text>
              <Text fontWeight="bold"> (Search Employee ID)</Text>
            </Stack>
            <Stack direction="row" spacing={4} justifyContent="center" mt={3}>
              <PinInput onComplete={(code) => setCode(code)}>
                {Array(7)
                  .fill(0)
                  .map((_, i) => (
                    <PinInputField key={i} />
                  ))}
              </PinInput>
            </Stack>
            {searchInfo != undefined ? (
              <Box overflow="auto" h="40vh" mt={2}>
                <Table variant="striped" colorScheme="blackAlpha" size="sm">
                  <Thead>
                    <Tr>
                      <Th textAlign="center" fontSize="xs">
                        ยกเลิก <br />
                        (Cancel)
                      </Th>
                      <Th fontSize="xs" isTruncated>
                        เลขทะเบียน <br />
                        (Licanse)
                      </Th>
                      <Th textAlign="center" fontSize="xs">
                        ตั้งแต่เวลา <br />
                        (Start)
                      </Th>
                      <Th textAlign="center" fontSize="xs">
                        จนถึงเวลา <br />
                        (Return)
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {searchInfo.map((info, i) => (
                      <React.Fragment key={i}>
                        <Tr
                          _hover={{
                            backgroundColor: "#EEE",
                          }}
                        >
                          <Td textAlign="center">
                            <Button
                              onClick={() => handleSubmit(info)}
                              colorScheme="red"
                              size="sm"
                              rounded="3xl"
                            >
                              <Icon as={FaTimesCircle} />
                            </Button>
                          </Td>
                          <Td isTruncated>{info.cars}</Td>
                          <Td textAlign="center" isTruncated>
                            {dateTimeFormat(info.datetimeUse)}
                          </Td>
                          <Td textAlign="center" isTruncated>
                            {dateTimeFormat(info.datetimeReturn)}
                          </Td>
                        </Tr>
                      </React.Fragment>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            ) : (
              <Box />
            )}
          </ModalBody>

          {/* Button */}
          <ModalFooter>
            <Button
              colorScheme="green"
              leftIcon={<Icon as={FaCheckCircle} />}
              me={2}
              onClick={handleSearch}
              disabled={setCode == undefined}
              rounded="3xl"
            >
              Confirm
            </Button>
            <Button
              onClick={handleClose}
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
