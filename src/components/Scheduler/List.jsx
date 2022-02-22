import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { EditModal } from "../Modals";

export default function List({ information }) {
  const dateTimeFormat = (info) => {
    var dateSpilt = info.slice(0, 16).split(" ");
    var date = dateSpilt[0].split("-").reverse().join("/");
    return date + " " + dateSpilt[1];
  };

  return (
    <>
      {/* Table */}
      <Table variant="striped" colorScheme="blackAlpha">
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
                <Td textAlign="center" isTruncated>
                  {dateTimeFormat(info.datetimeUse)}
                </Td>
                <Td textAlign="center" isTruncated>
                  {dateTimeFormat(info.datetimeReturn)}
                </Td>
                <Td textAlign="center">
                  <EditModal info={info} />
                </Td>
              </Tr>
            </React.Fragment>
          ))}
        </Tbody>
      </Table>
    </>
  );
}
