import React from "react";
import TopNav from "./TopNav";
import Footer from "./Footer";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function ContentWrapper({ content: Content, page }) {
  const pageTransition = {
    ease: "anticipate",
    type: "tween",
  };
  return (
    <>
      <Box h="6vh" bgGradient="linear(to-r, #8E0E00, #1F1C18)">
        <TopNav page={page} />
      </Box>
      <Box h="91vh" bg="#EDF2F7">
        <motion.div
          initial={{ opacity: 0, y: "1%" }}
          animate={{ opacity: 1, y: "0%" }}
          exit={{ opacity: 0, y: "1%" }}
          transition={pageTransition}
        >
          <Content />
        </motion.div>
      </Box>
      <Box h="2vh">
        <Footer />
      </Box>
    </>
  );
}
