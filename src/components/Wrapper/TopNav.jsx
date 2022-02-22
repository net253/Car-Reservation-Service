import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Text,
  Stack,
  Spacer,
  Icon,
  Box,
  Button,
  Tooltip,
  Link,
  Image,
} from "@chakra-ui/react";

import { FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { TermOfUsed } from "../Modals";
import SNC from "./logo.png";

const urlPath = "/crs/API/logout.php";

export default function TopNav({ page }) {
  const navigate = useNavigate();

  const handleSignOut = (e) => {
    e.preventDefault();
    axios.post(urlPath).then(({ data: { state } }) => {
      if (state) {
        navigate("/Login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Log out ERROR",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <>
      <Flex color="white" alignItems="center">
        <Link onClick={() => navigate("/")}>
          <Image
            srcSet={SNC}
            w={{ md: "5vw", base: "15vw" }}
            fallbackSrc="/crs/assets/logo.63ae820a.png"
          />
        </Link>
        <Spacer />
        <Text fontSize="lg">Car Reservation Service</Text>
        <Spacer />
        <Box pe="2">
          <Stack direction="row">
            {/* Button */}
            {page ? <TermOfUsed /> : ""}

            <Tooltip hasArrow label={page ? "Log in" : "Log out"}>
              <Button bg="none" onClick={handleSignOut}>
                <Icon as={FaSignOutAlt} />
              </Button>
            </Tooltip>
          </Stack>
        </Box>
      </Flex>
    </>
  );
}
