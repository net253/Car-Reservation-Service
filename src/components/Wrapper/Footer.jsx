import React from "react";
import { Text, Stack, Icon, Spacer } from "@chakra-ui/react";

import { FaRegCopyright } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        display="flex"
        fontSize="smaller"
        color="gray.500"
        px={2}
      >
        <Text>Copyright</Text>
        <Icon as={FaRegCopyright} />
        <Text>2022</Text>
        <Text fontWeight="bold" color="blue">
          CRS.
        </Text>
        <Text>All rights reserved.</Text>
        <Spacer />
        <Text fontSize="xx-small" color="gray.400" alignItems={"end"}>
          404-NotFound-Dev.
        </Text>
      </Stack>
    </>
  );
}
