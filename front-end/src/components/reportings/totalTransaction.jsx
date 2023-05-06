import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Image,
  SimpleGrid,
  HStack,
  Select,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";

export function TotalTransaction() {
  const [apiUrl, setApiUrl] = useState(
    "http://localhost:2000/reporting/total-transaction/"
  );
  const [transaction, setTransaction] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getReport() {
      setApiUrl(
        "http://localhost:2000/reporting/total-transaction/?" +
          "from=" +
          startDate +
          "&to=" +
          endDate
      );
      // console.log(apiUrl);

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const reportData = await axios.get(apiUrl, config);
      setTransaction(reportData.data.data);
    }
    getReport();
  }, [apiUrl, startDate, endDate]);

  return (
    <>
      <Stack spacing={8} mx={"auto"} w={"80%"} py={12} px={6}>
        <Center>
          <HStack>
            <Stack>
              <Text fontWeight="600" mb="0" mr="2rem">
                Start Date:
              </Text>
              <Input
                width="10rem"
                placeholder="yyyy-mm-dd"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Stack>
            <Stack>
              <Text fontWeight="600" mb="0" mr="2rem">
                End Date:
              </Text>
              <Input
                width="10rem"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Stack>
          </HStack>
        </Center>

        <Center py={12}>
          <TableContainer>
            <Table variant="striped" colorScheme="blue">
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Date</Th>
                  <Th>Total Transaction</Th>
                </Tr>
              </Thead>
              <Tbody>
                {transaction.map((grossData, index) => {
                  return (
                    <Tr key={index}>
                      <Td textAlign="center">{index + 1}</Td>
                      <Td textAlign="center">{grossData.date}</Td>
                      <Td textAlign="center">{grossData.products_sold}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Center>
      </Stack>
    </>
  );
}
