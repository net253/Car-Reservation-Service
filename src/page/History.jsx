import React, { useState, useEffect } from "react";
import {
  Stack,
  Text,
  Box,
  Center,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Icon,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import Loading from "../components/lottie/Loading";
import { HistoryTab, ReturnTab, CarTab } from "../components/History";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const urlPath = "/crs/API/history.php";
const urlChk = "/crs/API/check-book.php";
const urlAuthen = "/crs/API/authen.php";
const urlCars = "/crs/API/cars-status.php";

export default function History() {
  const navigate = useNavigate();
  const [historyInfo, setHistoryInfo] = useState();
  const [information, setInformation] = useState();
  const [carInfo, setCarInfo] = useState();
  const [search, setSearch] = useState("");

  const getHistory = () => {
    // console.log(search);
    axios.post(urlPath, { search: search }).then(({ data }) => {
      setHistoryInfo(data);
    });
  };
  const getInformation = () => {
    axios.post(urlChk, { code: "" }).then(({ data }) => {
      setInformation(data);
    });
    axios.get(urlCars).then(({ data }) => {
      setCarInfo(data);
    });
    axios.get(urlAuthen).then(({ data: { state } }) => {
      if (!state) {
        navigate("/Login");
      }
    });
  };

  useEffect(() => {
    const initPage = setTimeout(() => {
      getHistory();
      getInformation();
    }, 100);
    const timer5s = setInterval(() => {
      getInformation();
    }, 5000);
    return () => {
      clearTimeout(initPage);
      clearInterval(timer5s);
    };
  }, []);

  if (
    historyInfo == undefined ||
    information == undefined ||
    carInfo == undefined
  ) {
    return <Loading />;
  }

  return (
    <>
      <Stack p={2}>
        <Center>
          <Box bg="white" rounded="md" h="89vh" w="98vw" boxShadow="sm" p={2}>
            <Tabs variant="enclosed">
              <TabList overflowX="auto" overflowY="hidden">
                {/* Tab head */}
                <Tab>
                  <Stack direction="row">
                    <Text
                      className="font-thai"
                      fontWeight="bold"
                      fontSize="md"
                      textAlign="center"
                      isTruncated
                    >
                      คืนกุญแจ
                    </Text>
                    <Text fontWeight="bold">(ReturnKey)</Text>
                  </Stack>
                </Tab>

                <Tab>
                  <Stack direction="row">
                    <Text
                      className="font-thai"
                      fontWeight="bold"
                      fontSize="md"
                      textAlign="center"
                      isTruncated
                    >
                      จัดการรถ
                    </Text>
                    <Text fontWeight="bold" isTruncated>
                      (Car Setup)
                    </Text>
                  </Stack>
                </Tab>

                <Tab>
                  <Stack direction="row">
                    <Text
                      className="font-thai"
                      fontWeight="bold"
                      fontSize="md"
                      textAlign="center"
                    >
                      ประวัติ
                    </Text>
                    <Text fontWeight="bold">(History)</Text>
                  </Stack>
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <ReturnTab information={information} />
                </TabPanel>

                <TabPanel>
                  <CarTab carInfo={carInfo} />
                </TabPanel>

                <TabPanel>
                  {/* Search */}
                  <Stack direction="row">
                    <InputGroup w={{ md: "30%", base: "100%" }}>
                      <InputLeftElement
                        pointerEvents={"none"}
                        children={<Icon as={FaSearch} color={"gray.500"} />}
                      />
                      <Input
                        id="Search"
                        placeholder="Search..."
                        onChange={({ target: { value: search } }) =>
                          setSearch(search)
                        }
                      />
                    </InputGroup>
                    <Button onClick={getHistory}>Search</Button>
                  </Stack>
                  <HistoryTab historyInfo={historyInfo} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Center>
      </Stack>
    </>
  );
}
