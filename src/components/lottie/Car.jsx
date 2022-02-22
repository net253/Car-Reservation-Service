import React from "react";
import * as Car from "./Car.json";
import Lottie from "react-lottie";

const options = {
  loop: true,
  autoplay: true,
  animationData: Car.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function LoadingPage() {
  return (
    <>
      <Lottie options={options} width={200} />
    </>
  );
}
