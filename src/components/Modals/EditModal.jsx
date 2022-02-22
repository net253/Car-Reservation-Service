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
  Tooltip,
  Select,
} from "@chakra-ui/react";

import { FaTimesCircle } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import ConfirmModal from "./ConfirmModal";

export default function EditModal({ info }) {
  const [formInput, setFormInput] = useState({
    id: info.id,
    name: info.name,
    code: info.code,
    agent: info.agent,
    tel: info.tel,
    purpose: info.purpose,
    cars: info.cars,
    datetimeUse: info.datetimeUse,
    datetimeReturn: info.datetimeReturn,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Tooltip hasArrow label="Edit" placement="top">
        <Button onClick={onOpen} colorScheme="yellow" size="sm" rounded="3xl">
          <Icon as={FaUserEdit} />
        </Button>
      </Tooltip>

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
                แก้ไขการจอง
              </Text>
              <Text fontWeight="bold" fontSize="lg">
                (Edit reservation)
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
                  defaultValue={formInput?.name}
                  onChange={({ target: { value: name } }) =>
                    setFormInput({ ...formInput, name })
                  }
                />
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
                  defaultValue={formInput?.agent}
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
                  placeholder="Phone number"
                  size="md"
                  defaultValue={formInput?.tel}
                  onChange={({ target: { value: tel } }) =>
                    setFormInput({ ...formInput, tel })
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
                    เลือกรถ
                  </Text>
                  <Text fontWeight="bold" fontSize="sm">
                    (Select Car)
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
                <Input
                  size="md"
                  variant="filled"
                  disabled
                  defaultValue={info?.datetimeUse.slice(0, 16)}
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
                <Input
                  placeholder="Time"
                  size="md"
                  variant="filled"
                  disabled
                  defaultValue={info?.datetimeReturn.slice(0, 16)}
                />
              </GridItem>

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
                  defaultValue={formInput?.purpose}
                  onChange={({ target: { value: purpose } }) =>
                    setFormInput({ ...formInput, purpose })
                  }
                />
              </GridItem>
            </Grid>
          </ModalBody>

          {/* Button */}
          <ModalFooter>
            <ConfirmModal formInput={formInput} />
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
