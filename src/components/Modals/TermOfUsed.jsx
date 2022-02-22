import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
  Text,
  useDisclosure,
  Icon,
  Tooltip,
  HStack,
} from "@chakra-ui/react";

import { FaBookOpen } from "react-icons/fa";

export default function TermOfUsed() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const initPage = setTimeout(() => {
      onOpen();
    }, 100);
    return () => {
      clearTimeout(initPage);
    };
  }, []);
  return (
    <>
      <Tooltip hasArrow label="Term of use">
        <Button bg="none" onClick={onOpen}>
          <Icon as={FaBookOpen} />
        </Button>
      </Tooltip>

      {/* Modal */}
      <Modal onClose={onClose} isOpen={isOpen} isCentered size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="blackAlpha.200">
            <Stack direction="row">
              <Text
                className="font-thai"
                fontWeight="bold"
                fontSize="lg"
                textAlign="center"
              >
                ข้อกำหนดการใช้งาน
              </Text>
              <Text fontWeight="bold" fontSize="md">
                (Term of use)
              </Text>
            </Stack>
          </ModalHeader>
          <ModalCloseButton />

          {/* Body */}
          <ModalBody>
            <Stack>
              {/* <Text className="font-thai" fontWeight="bold" fontSize="md">
                การใช้งาน
              </Text> */}

              <Text className="font-thai" fontSize="sm">
                1. ผู้ใช้งานลงทะเบียนเพื่อ เช็คคิวรถ / จองคิวรถ / ยกเลิกคิวรถ
                ได้ที่เว็บไซต์นี้เท่านั้น{" "}
                {/* <span fontSize="small">
                  (Users can register to check car queue / reserve car / cancel
                  queue at this website only.)
                </span> */}
              </Text>

              <Text className="font-thai" fontSize="sm">
                2. ผู้ใช้งาน สามารถจองคิวรถ
                <b className="font-thai">ล่วงหน้าได้ ไม่เกิน 3 วัน</b>
                {/* <span fontSize="small">
                  {" "}
                  (Users can reserve a car no more than 3 days in advance.)
                </span> */}
              </Text>

              <Text className="font-thai" fontSize="sm">
                3. ผู้ใช้งาน สามารถจองคิวรถได้
                <b className="font-thai">รวมแล้วไม่เกิน 9 ชั่วโมง/วัน</b>
                {/* <span fontSize="small">
                  {" "}
                  (Users can reserve a car for a total of not more than 9
                  hours/day.)
                </span> */}
              </Text>

              <Text className="font-thai" fontSize="sm">
                4. ผู้ใช้งาน ต้อง
                <b className="font-thai">มีใบอนุญาตขับขี่รถยนต์</b>
                ตามที่กฎหมายกำหนด
                {/* <span fontSize="small">
                  {" "}
                  (Users must have a driving license as required by law.)
                </span> */}
              </Text>

              <Text className="font-thai" fontSize="sm">
                5.
                <span className="font-thai font-term"> ก่อนใช้รถยนต์</span>{" "}
                ติดต่อรับกุญแจได้ที่แผนก HR
                {/* <span fontSize="small">
                  {" "}
                  (Before using the car pick up the keys at the HR department.)
                </span> */}
              </Text>

              <Text className="font-thai" fontSize="sm">
                6.
                <span className="font-thai font-term"> หลังใช้รถยนต์</span>{" "}
                จอดรถที่บริเวณลานจอดซอย 13 และคืนกุญแจให้กับ HR
                {/* <span fontSize="small">
                  {" "}
                  (After using the car Park at the Soi 13 parking lot and return
                  the key to HR.)
                </span> */}
              </Text>

              <Text className="font-thai" fontSize="sm">
                7. ผู้ใช้งาน
                <b className="font-thai">
                  {" "}
                  ควรส่งคืนรถภายในกรอบเวลาที่ได้จองไว้
                </b>
                กรณีเกิดเหตุสุดวิสัยต้องแจ้งทาง HR
                ทราบเพื่อประสานงานกับผู้จองคิวในช่วงเวลาถัดไป
                {/* <span fontSize="small">
                  {" "}
                  (Users should return the car within the time reserved. In case
                  of force majeure must contact HR department to announce next
                  the booking queue.)
                </span> */}
              </Text>

              <Text className="font-thai" fontSize="sm">
                8. กรณีที่ผู้ใช้งาน
                <b className="font-thai"> ไม่ติดต่อรับกุญแจภายใน 1 ชั่วโมง</b>
                นับจากเวลาที่จองคิวไว้
                ขอสงวนสิทธิในการยกเลิกคิวจองตามการพิจารณาของ HR
                {/* <span fontSize="small">
                  {" "}
                  (In the case of users Failure to pick up the key within 1 hour
                  from the time of booking reserves the right to cancel the
                  booking queue at the discretion of HR.)
                </span> */}
              </Text>

              <Text className="font-thai" fontSize="sm">
                9.พบปัญหาการใช้งาน หรือมีเหตุฉุกเฉิน ติดต่อ HR เบอร์โทรศัพท์
                <span className="font-thai font-term"> 038-026-750</span>
                {/* <span fontSize="small">
                  {" "}
                  (Encountered a problem in use or if there is an emergency,
                  contact HR phone number 038-026-750)
                </span> */}
              </Text>

              <Text className="font-thai" fontWeight="bold" fontSize="sm">
                การเข้าใช้งานเว็บไซต์
              </Text>
              <Text className="font-thai" fontSize="sm">
                1. กรุณาระบุรหัสพนักงาน 7 หลัก (นับจากด้านหลัง)
              </Text>
              <Text className="font-thai" fontSize="sm">
                2. กรอกข้อมูลและตรวจสอบข้อมูลให้ครบถ้วน
              </Text>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
