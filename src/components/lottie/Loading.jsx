import React from "react";
import * as Loading from "./Loading.json";
import Lottie from "react-lottie";
import { Box, Center } from "@chakra-ui/react";

const loadingOptions = {
  loop: true,
  autoplay: true,
  animationData: Loading.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function LoadingPage() {
  return (
    <>
      <Lottie options={loadingOptions} height={310} width={380} />
    </>
  );
}
