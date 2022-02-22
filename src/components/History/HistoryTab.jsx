import React from "react";
import { Box, Icon, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { FaCheckCircle, FaTimesCircle, FaMapPin } from "react-icons/fa";

export default function HistoryTab({ historyInfo }) {
  const actionButton = (info) => {
    return info.action === "returned" ? (
      <Icon as={FaCheckCircle} color="green" boxSize={7} />
    ) : info.action == "booking" ? (
      <Icon as={FaMapPin} boxSize={7} />
    ) : (
      <Icon as={FaTimesCircle} color="red" boxSize={7} />
    );
  };

  const dateTimeFormat = (info) => {
    var dateSpilt = info.slice(0, 16).split(" ");
    var date = dateSpilt[0].split("-").reverse().join("/");
    return date + " " + dateSpilt[1];
  };

  return (
    <>
      {/* Table */}
      <Box
        overflow="auto"
        h={{ md: "72vh", base: "74vh" }}
        w={{ md: "95vw", base: "92vw" }}
        mt={2}
      >
        <Table variant="striped" colorScheme="blackAlpha" size="sm">
          <Thead>
            <Tr>
              <Th textAlign="center" w="3%" fontSize="small">
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
              <Th textAlign="center" fontSize="small" isTruncated>
                เวลาล่าสุด <br />
                (Last action)
              </Th>
              <Th textAlign="center" fontSize="small">
                Action
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {historyInfo.map((info, i) => (
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
                  <Td textAlign="center" isTruncated>
                    {dateTimeFormat(info.datetime)}
                  </Td>
                  <Td textAlign="center">{actionButton(info)}</Td>
                </Tr>
              </React.Fragment>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
}
