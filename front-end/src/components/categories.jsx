import {
  Center,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import axios from "axios";
import { useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { FormDrawer } from './formDrawer';
import { UpdateCategoryForm } from './forms/updateCategoryForm';
import { RefreshButton } from "../buttons/refreshButton";

export function Categories() {

  //states for fetching products & categories data
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const categoryData = await axios.get("http://localhost:2000/category");
      setCategories(categoryData.data.categories);
    }
    getProducts();
  }, [])

  return (
    <>

      <Stack spacing={8} mx={"auto"} w={"80%"} py={12} px={6}>
        <Center>
          <RefreshButton/>
        </Center>
        <Center py={12}>
          <TableContainer>
            <Table variant='striped' colorScheme='blue'>
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Category Name</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {categories.map((category, index) => {
                  // console.log(category);
                  return (
                    <Tr key={category.id}>
                      <Td>{index + 1}</Td>
                      <Td>{category.name}</Td>
                      <Td>
                        <FormDrawer 
                          data={category} 
                          title="Edit Category Data" 
                          component={UpdateCategoryForm}
                          buttonName="Edit"
                          editIcon={true}
                        />
                      </Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Center>
      </Stack>
    </>
  );
}
