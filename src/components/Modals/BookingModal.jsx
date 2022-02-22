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
  Select,
  PinInput,
  PinInputField,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import DatePicker from "react-datepicker";
import addDays from "date-fns/addDays";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import fdatetime from "../../libs/fdatetime";
import Swal from "sweetalert2";
import getTime from "date-fns/getTime";

const urlPath = "/crs/API/add-book.php";

export default function BookingModal({ carInfo }) {
  const [formInput, setFormInput] = useState({
    name: "",
    code: "",
    agent: "",
    tel: "",
    cars: "",
    datetimeUse: "",
    datetimeReturn: "",
    purpose: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleSubmit = () => {
    const { datetimeUse, datetimeReturn } = formInput;

    formInput.datetimeUse = fdatetime(datetimeUse).getFDatetime;
    formInput.datetimeReturn = fdatetime(datetimeReturn).getFDatetime;

    axios
      .post(urlPath, { ...formInput })
      .then(({ data: { message, state } }) => {
        console.log(formInput);
        console.log(message, state);
        if (state) {
          Swal.fire({
            title: "จองสำเร็จ (Booking success.)",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          }).then(() => location.reload());
        } else {
          toast({
            title: "จองไม่สำเร็จ (Booking error.)",
            description: `${
              message != "Error"
                ? "จองได้วันละไม่เกิน 9 ชม.เท่านั้น (Only 9 hours per day can be reserved.)"
                : "กรุณาตรวจสอบช่วงเวลาว่างของรถ (Please check the availability of the car.)"
            }`,
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
      name: "",
      code: "",
      agent: "",
      tel: "",
      cars: "",
      datetime: "",
      datetimeUse: "",
      datetimeReturn: "",
      purpose: "",
    });
    onClose();
  };

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  const diffTime = (start, end) => {
    if ((start, end)) {
      var diff = (getTime(end) - getTime(start)) / 1000;
      diff /= 3600;
      return diff.toFixed(1);
    }
  };

  // console.log(carInfo);
  if (carInfo == undefined) {
    return <div />;
  }

  return (
    <>
      <Button colorScheme="green" variant="solid" w={180} onClick={onOpen}>
        <Stack direction="row">
          <Text
            className="font-thai"
            fontWeight="bold"
            fontSize="md"
            textAlign="center"
          >
            จอง
          </Text>
          <Text fontWeight="bold" fontSize="md">
            (Booking)
          </Text>
        </Stack>
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
                จองรถยนต์
              </Text>
              <Text fontWeight="bold" fontSize="lg">
                (Booking)
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
                    ชื่อผู้จอง
                  </Text>
                  <Text fontWeight="bold" fontSize="sm">
                    (Booking by)
                  </Text>
                </Stack>
                <Input
                  placeholder="Fullname"
                  size="md"
                  variant="flushed"
                  onChange={({ target: { value: name } }) =>
                    setFormInput({ ...formInput, name })
                  }
                />
              </GridItem>

              <GridItem colSpan={2}>
                <Stack direction="row">
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
                  <PinInput
                    onComplete={(code) => setFormInput({ ...formInput, code })}
                  >
                    {Array(7)
                      .fill(0)
                      .map((_, i) => (
                        <PinInputField key={i} />
                      ))}
                  </PinInput>
                </Stack>
              </GridItem>

              <GridItem>
                <Stack direction="row">
                  <Text
                    className="font-thai"
                    fontWeight="bold"
                    textAlign="center"
                  >
                    แผนก
                  </Text>
                  <Text fontWeight="bold" fontSize="sm">
                    (Organization)
                  </Text>
                </Stack>
                <Select
                  placeholder="Select organization"
                  size="md"
                  variant="flushed"
                  onChange={({ target: { value: agent } }) =>
                    setFormInput({ ...formInput, agent })
                  }
                >
                  <option value="SPEC">SPEC</option>
                  <option value="SCAN">SCAN</option>
                  <option value="IPC">IPC</option>
                  <option value="Other">Other</option>
                </Select>
              </GridItem>

              <GridItem>
                <Stack direction="row">
                  <Text
                    className="font-thai"
                    fontWeight="bold"
                    textAlign="center"
                  >
                    เบอร์
                  </Text>
                  <Text fontWeight="bold" fontSize="sm">
                    (Phone number)
                  </Text>
                </Stack>
                <Input
                  type="number"
                  placeholder="Phone number"
                  size="md"
                  variant="flushed"
                  onChange={({ target: { value: tel } }) =>
                    setFormInput({ ...formInput, tel })
                  }
                  isInvalid={formInput.tel.length != 10}
                />
              </GridItem>

              <GridItem colSpan={2}>
                <Stack direction="row">
                  <Text
                    className="font-thai"
                    fontWeight="bold"
                    textAlign="center"
                  >
                    เลือกรถ
                  </Text>
                  <Text fontWeight="bold" fontSize="sm">
                    (Select Car)
                  </Text>
                </Stack>
                <Select
                  placeholder="Select Car"
                  size="md"
                  variant="flushed"
                  onChange={({ target: { value: cars } }) =>
                    setFormInput({
                      ...formInput,
                      cars,
                      datetimeReturn: "",
                      datetimeUse: "",
                    })
                  }
                >
                  {carInfo.map((info, i) => (
                    <option value={info.cars} disabled={!info.status} key={i}>
                      {info.cars}
                    </option>
                  ))}
                </Select>
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
                  selected={formInput.datetimeUse}
                  customInput={<Input variant="flushed" />}
                  onChange={(datetimeUse) =>
                    setFormInput({
                      ...formInput,
                      datetimeUse,
                      datetimeReturn: "",
                    })
                  }
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  timeCaption="Start"
                  dateFormat="dd/MM/yyyy HH:mm"
                  minDate={new Date()}
                  maxDate={addDays(new Date(), 3)}
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
                  selected={formInput.datetimeReturn}
                  customInput={<Input variant="flushed" />}
                  onChange={(datetimeReturn) =>
                    setFormInput({ ...formInput, datetimeReturn })
                  }
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  timeCaption="Return"
                  dateFormat="dd/MM/yyyy HH:mm"
                  minDate={formInput.datetimeUse}
                  maxDate={addDays(new Date(), 3)}
                  placeholderText="Select a Time"
                  disabled={formInput.datetimeUse == ""}
                />
              </GridItem>

              <GridItem>
                <Stack direction="row">
                  <Text
                    className="font-thai"
                    fontWeight="bold"
                    textAlign="center"
                  >
                    ระยะเวลาทั้งหมด
                  </Text>
                  <Text fontWeight="bold" fontSize="sm">
                    (Total duration):
                  </Text>
                </Stack>
              </GridItem>

              <GridItem>
                <Stack direction="row">
                  <Text fontWeight="bold" fontSize="md">
                    {diffTime(formInput.datetimeUse, formInput.datetimeReturn)}
                  </Text>
                  <Text fontWeight="bold" fontSize="md" ps={2} textAlign="end">
                    Hr.
                  </Text>
                </Stack>
              </GridItem>

              {diffTime(formInput.datetimeUse, formInput.datetimeReturn) > 9 ? (
                <GridItem>
                  <Stack direction="row">
                    <Text fontWeight="bold" fontSize="sm" textColor="red">
                      ***จองได้ไม่เกิน 9 ชั่วโมง/คน/วันเท่านั้น
                    </Text>
                  </Stack>
                </GridItem>
              ) : diffTime(formInput.datetimeUse, formInput.datetimeReturn) <
                0 ? (
                <GridItem>
                  <Stack direction="row">
                    <Text fontWeight="bold" fontSize="sm" textColor="red">
                      ***กรุณาตรวจสอบเวลาให้ถูกต้อง
                    </Text>
                  </Stack>
                </GridItem>
              ) : (
                ""
              )}

              <GridItem colSpan={2}>
                <Stack direction="row">
                  <Text
                    className="font-thai"
                    fontWeight="bold"
                    textAlign="center"
                  >
                    วัตถุประสงค์การใช้รถ
                  </Text>
                  <Text fontWeight="bold" fontSize="sm">
                    (Purpose of reservation)
                  </Text>
                </Stack>
                <Input
                  placeholder="Purpose of reservation"
                  size="md"
                  variant="flushed"
                  onChange={({ target: { value: purpose } }) =>
                    setFormInput({ ...formInput, purpose })
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
              isDisabled={
                diffTime(formInput.datetimeUse, formInput.datetimeReturn) > 9 ||
                diffTime(formInput.datetimeUse, formInput.datetimeReturn) < 0 ||
                formInput.name == "" ||
                formInput.code.length != 7 ||
                formInput.agent == "" ||
                formInput.tel.length != 10 ||
                formInput.cars == "" ||
                formInput.datetimeUse == "" ||
                formInput.datetimeReturn == "" ||
                formInput.purpose == ""
              }
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
