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
  Select,
  useToast,
  Tooltip,
} from "@chakra-ui/react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { GoKey } from "react-icons/go";

import axios from "axios";
import Swal from "sweetalert2";

const urlReturn = "/crs/API/return-cancel.php";

export default function ReturnKey({ info }) {
  const [park, setPark] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleSubmit = () => {
    onClose();
    axios
      .post(urlReturn, { ...info, action: "returned", parking: park })
      .then(({ data: { state } }) => {
        if (state) {
          Swal.fire({
            title: "คืนกุญแจเรียบร้อย (Return key success.)",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        } else {
          toast({
            title: "Error conection",
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "top-right",
          });
        }
      });
  };

  return (
    <>
      <Tooltip hasArrow label="Return key" placement="top">
        <Button
          colorScheme="blackAlpha"
          size="sm"
          onClick={onOpen}
          rounded="3xl"
          disabled={new Date() < new Date(info.datetimeUse)}
        >
          <Icon as={GoKey} />
        </Button>
      </Tooltip>

      {/* Modal */}
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
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
                คืนกุญแจรถยนต์
              </Text>
              <Text fontWeight="bold" fontSize="md">
                (Key Return)
              </Text>
            </Stack>
          </ModalHeader>
          <ModalCloseButton />

          {/* Body */}
          <ModalBody>
            <Stack spacing={3}>
              <Stack direction="row">
                <Text className="font-thai">ชื่อผู้จอง</Text>
                <Text> (Booking by) :</Text>
                <Text fontWeight="bold" ps={5}>
                  {info.name}
                </Text>
              </Stack>
              <Stack direction="row">
                <Text className="font-thai">เบอร์</Text>
                <Text> (Phone number) :</Text>
                <Text fontWeight="bold" ps={4}>
                  {info.tel}
                </Text>
              </Stack>
              <Stack direction="row">
                <Text className="font-thai">เลขทะเบียน</Text>
                <Text> (Car licanse) :</Text>
                <Text fontWeight="bold">{info.cars}</Text>
              </Stack>
              <Stack direction="row">
                <Text className="font-thai">ตั้งแต่วันที่</Text>
                <Text> (Start Date) :</Text>
                <Text fontWeight="bold" ps={4}>
                  {info.datetimeUse.slice(0, 16)}
                </Text>
              </Stack>
              <Stack direction="row">
                <Text className="font-thai">จนถึงวันที่</Text>
                <Text> (End Date) :</Text>
                <Text fontWeight="bold" ps={6}>
                  {info.datetimeReturn.slice(0, 16)}
                </Text>
              </Stack>

              <Stack direction="row" pt={4}>
                <Text className="font-thai">สถานที่จอดรถ</Text>
                <Text pe={8}> (Parking at) :</Text>
              </Stack>
              <Select
                placeholder="Parking at"
                variant="flushed"
                onChange={({ target: { value: park } }) => setPark(park)}
                isInvalid={park == undefined}
              >
                <option value="ลานจอด ซอย 13">ลานจอด ซอย 13</option>
                {/* <option value="option2">Option 2</option>
                <option value="option3">Option 3</option> */}
              </Select>
            </Stack>
          </ModalBody>

          {/* Button */}
          <ModalFooter>
            <Button
              colorScheme="green"
              leftIcon={<Icon as={FaCheckCircle} />}
              me={2}
              onClick={handleSubmit}
              disabled={park == undefined}
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
