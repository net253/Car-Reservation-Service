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
  Input,
  useToast,
  Tooltip,
} from "@chakra-ui/react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { FaCheckCircle, FaTimesCircle, FaTimes, FaCheck } from "react-icons/fa";
import fdatetime from "../../libs/fdatetime";
import Swal from "sweetalert2";

const urlCars = "/crs/API/cars-status.php";

export default function CarModal({ info }) {
  const [formInput, setFormInput] = useState({
    cars: info.cars,
    blockStart: "",
    blockEnd: "",
    note: "",
    status: "block",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleSubmit = () => {
    const { blockStart, blockEnd } = formInput;

    formInput.blockStart = fdatetime(blockStart).getFDatetime;
    formInput.blockEnd = fdatetime(blockEnd).getFDatetime;
    console.log(formInput);
    axios.post(urlCars, { ...formInput }).then(({ data: { state } }) => {
      if (state) {
        Swal.fire({
          title: "ปิดการใช้งานสำเร็จ (Disable success.)",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => location.reload());
      } else {
        toast({
          title: "ปิดการใช้งานไม่สำเร็จ (Error.)",
          status: "error",
          isClosable: true,
          position: "top-right",
        });
      }
    });
    handleClose();
  };

  const handleClose = () => {
    setFormInput({
      cars: "",
      blockStart: "",
      blockEnd: "",
      note: "",
    });
    onClose();
  };

  const handleEnable = () => {
    Swal.fire({
      title: "ต้องการเปิดการใช้งานใช่หรือไม่? (Do you want to enable car?)",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่ (Yes)",
      cancelButtonText: "ไม่ใช่ (No)",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(urlCars, { ...formInput, status: "normal" })
          .then(({ data: { state } }) => {
            if (state) {
              Swal.fire({
                title: "เปิดการใช้งาน (Enable.)",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });
            } else {
              toast({
                title: "Error",
                status: "error",
                isClosable: true,
                position: "top-right",
              });
            }
          });
      }
    });
  };

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  return (
    <>
      {info.status ? (
        <Tooltip hasArrow label="ปิดการใช้งานรถยนต์">
          <Button
            colorScheme="red"
            onClick={onOpen}
            rounded="3xl"
            leftIcon={<Icon as={FaTimes} />}
            size="sm"
            variant="outline"
          >
            Disable car
          </Button>
        </Tooltip>
      ) : (
        <Tooltip hasArrow label="เปิดการใช้งานรถยนต์">
          <Button
            colorScheme="green"
            onClick={handleEnable}
            rounded="3xl"
            leftIcon={<Icon as={FaCheck} />}
            size="sm"
            variant="outline"
          >
            Enable car
          </Button>
        </Tooltip>
      )}

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
                ปิดการใช้งานรถยนต์
              </Text>
              <Text fontWeight="bold" fontSize="lg">
                (Disable car)
              </Text>
            </Stack>
          </ModalHeader>

          {/* Body */}
          <ModalBody>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem colSpan={2}>
                <Stack direction="row">
                  <Text
                    className="font-thai"
                    fontWeight="bold"
                    textAlign="center"
                  >
                    รถยนต์
                  </Text>
                  <Text fontWeight="bold" fontSize="sm">
                    (Car)
                  </Text>
                </Stack>
                <Input
                  placeholder="Car"
                  size="md"
                  variant="filled"
                  disabled
                  defaultValue={info?.cars}
                />
              </GridItem>

              <GridItem>
                <Stack direction="row">
                  <Text
                    className="font-thai"
                    fontWeight="bold"
                    textAlign="center"
                  >
                    ตั้งแต่เวลา
                  </Text>
                  <Text fontWeight="bold" fontSize="sm">
                    (Start Time)
                  </Text>
                </Stack>
                <DatePicker
                  selected={formInput.blockStart}
                  customInput={<Input variant="flushed" />}
                  onChange={(blockStart) =>
                    setFormInput({
                      ...formInput,
                      blockStart,
                      blockEnd: "",
                    })
                  }
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  timeCaption="Start"
                  dateFormat="dd/MM/yyyy HH:mm"
                  minDate={new Date()}
                  placeholderText="Select a Time"
                  filterTime={filterPassedTime}
                />
              </GridItem>

              <GridItem>
                <Stack direction="row">
                  <Text
                    className="font-thai"
                    fontWeight="bold"
                    textAlign="center"
                  >
                    จนถึงเวลา
                  </Text>
                  <Text fontWeight="bold" fontSize="sm">
                    (End Time)
                  </Text>
                </Stack>
                <DatePicker
                  selected={formInput.blockEnd}
                  customInput={
                    <Input
                      variant="flushed"
                      isInvalid={formInput.blockStart > formInput.blockEnd}
                    />
                  }
                  onChange={(blockEnd) =>
                    setFormInput({ ...formInput, blockEnd })
                  }
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  timeCaption="End"
                  dateFormat="dd/MM/yyyy HH:mm"
                  minDate={formInput.blockStart}
                  placeholderText="Select a Time"
                  disabled={formInput.blockStart == ""}
                />
              </GridItem>

              <GridItem colSpan={2}>
                <Stack direction="row">
                  <Text
                    className="font-thai"
                    fontWeight="bold"
                    textAlign="center"
                  >
                    วัตถุประสงค์
                  </Text>
                  <Text fontWeight="bold" fontSize="sm">
                    (Purpose)
                  </Text>
                </Stack>
                <Input
                  placeholder="Purpose"
                  size="md"
                  variant="flushed"
                  onChange={({ target: { value: note } }) =>
                    setFormInput({ ...formInput, note })
                  }
                />
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
              rounded="3xl"
              disabled={
                formInput.blockStart > formInput.blockEnd ||
                formInput.blockStart == ""
              }
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
