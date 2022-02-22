import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import { ReturnKey } from "../Modals";
import { FaTimesCircle } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

export default function ReturnTab({ information }) {
  const urlCancel = "/CRS/API/return-cancel.php";

  const dateTimeFormat = (info) => {
    var dateSpilt = info.slice(0, 16).split(" ");
    var date = dateSpilt[0].split("-").reverse().join("/");
    return date + " " + dateSpilt[1];
  };

  const handleSubmit = (info) => {
    Swal.fire({
      title: "ยกเลิกการจอง(Cancel booking?)",
      icon: "info",
      confirmButtonText: "ใช่ (Yes)",
      showCancelButton: true,
      cancelButtonText: "ไม่ใช่ (No)",
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      html: `<p>ชื่อ-นามสกุล (Fullname):<b> ${info.name}</b></p>
        <p>หมายเลขรถ (Car license):<b> ${info.cars}</b></p>
       `,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(urlCancel, { ...info, action: "cancel", parking: "-" })
          .then(({ data: { state } }) => {
            if (state) {
              Swal.fire({
                title: "ยกเลิกสำเร็จ (Cancel completed.)",
                icon: "success",
                timer: "1500",
              });
            } else {
              Swal.fire("ยกเลิกไม่สำเร็จ (Error cancel.)", "", "error");
            }
          });
      }
    });
  };

  return (
    <>
      {/* Table */}
      <Box
        overflow="auto"
        h={{ md: "76vh", base: "79vh" }}
        w={{ md: "95vw", base: "92vw" }}
        mt={3}
      >
        <Table variant="striped" colorScheme="blackAlpha" size="sm">
          <Thead>
            <Tr>
              <Th textAlign="center" fontSize="small">
                ลำดับ <br />
                (No.)
              </Th>
              <Th fontSize="small" isTruncated>
                เลขทะเบียน <br />
                (Licanse)
              </Th>
              <Th fontSize="small">
                ผู้จอง <br />
                (Booking by)
              </Th>
              <Th fontSize="small" isTruncated>
                รหัสพนักงาน <br />
                (Employee ID)
              </Th>
              <Th textAlign="center" fontSize="small">
                ตั้งแต่เวลา <br />
                (Start)
              </Th>
              <Th textAlign="center" fontSize="small">
                จนถึงเวลา <br />
                (Return)
              </Th>
              <Th textAlign="center" fontSize="small">
                Action
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {information.map((info, i) => (
              <React.Fragment key={i}>
                <Tr
                  _hover={{
                    backgroundColor: "#EEE",
                  }}
                >
                  <Td textAlign="center">{i + 1}</Td>
                  <Td isTruncated>{info.cars}</Td>
                  <Td fontWeight="bold" isTruncated>
                    {info.name}
                  </Td>
                  <Td isTruncated>{info.code}</Td>
                  <Td textAlign="center" isTruncated>
                    {dateTimeFormat(info.datetimeUse)}
                  </Td>
                  <Td textAlign="center" isTruncated>
                    {dateTimeFormat(info.datetimeReturn)}
                  </Td>
                  <Td textAlign="center" isTruncated>
                    <ReturnKey info={info} />
                    <Tooltip hasArrow label="Cancel" placement="top">
                      <Button
                        colorScheme="red"
                        size="sm"
                        ms={2}
                        onClick={() => handleSubmit(info)}
                        rounded="3xl"
                      >
                        <Icon as={FaTimesCircle} />
                      </Button>
                    </Tooltip>
                  </Td>
                </Tr>
              </React.Fragment>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
}
