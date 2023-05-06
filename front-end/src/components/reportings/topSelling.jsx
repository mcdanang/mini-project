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

export function TopSelling() {
  const [apiUrl, setApiUrl] = useState(
    "http://localhost:2000/reporting/top-selling/"
  );
  const [report, setReport] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getReport() {
      var config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const reportData = await axios.get(apiUrl, config);
      setReport(reportData.data.data);
    }

    async function getCategories() {
      const categoryData = await axios.get("http://localhost:2000/category");
      setCategories(categoryData.data.categories);
    }

    getCategories();
    getReport();
  }, [apiUrl, category]);

  function handleCategoryChange(event) {
    setApiUrl(
      `http://localhost:2000/reporting/top-selling/?c=${event.target.value}`
    );
    setCategory(event.target.value);
  }

  return (
    <>
      <Stack>
        <Center>
          <Select
            placeholder="Select category"
            value={category}
            onChange={handleCategoryChange}
            width="22rem"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </Center>

        <Center py={12}>
          <TableContainer>
            <Table variant="striped" colorScheme="blue">
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Product Name</Th>
                  <Th>Total Sold</Th>
                </Tr>
              </Thead>
              <Tbody>
                {report.map((grossData, index) => {
                  return (
                    <Tr key={index}>
                      <Td textAlign="center">{index + 1}</Td>
                      <Td textAlign="center">{grossData.product_name}</Td>
                      <Td textAlign="center">{grossData.total_qty_sold}</Td>
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
