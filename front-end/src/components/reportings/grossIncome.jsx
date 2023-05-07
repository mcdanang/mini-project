import {
  Center,
  Text,
  Stack,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  HStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { rupiah } from "../../helper/rupiah";

export function GrossIncome() {
  const [apiUrl, setApiUrl] = useState("http://localhost:2000/reporting/gross");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const [report, setReport] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getReport() {
      setApiUrl(
        "http://localhost:2000/reporting/gross/?" +
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
      setReport(reportData.data.data);
    }
    getReport();
  }, [apiUrl, startDate, endDate, token]);

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
                  <Th>Gross Income</Th>
                </Tr>
              </Thead>
              <Tbody>
                {report.map((grossData, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{index + 1}</Td>
                      <Td>{grossData.date}</Td>
                      <Td>{rupiah(grossData.gross_income)}</Td>
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
