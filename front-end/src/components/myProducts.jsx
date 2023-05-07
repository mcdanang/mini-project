import {
  Center,
  Text,
  Stack,
  Image,
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
} from '@chakra-ui/react';
import axios from "axios";
import { useState, useEffect } from 'react';
import { MdCircle } from "react-icons/md";
import { Pagination } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { useParams } from 'react-router-dom';
import { rupiah } from '../helper/rupiah';
import { FormDrawer } from "./formDrawer";
import { UpdateProductForm } from "./forms/updateProductForm";
import { RefreshButton } from "../buttons/refreshButton";

export function MyProducts() {
  const params = useParams();

  //states for fetching products & categories data
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [totalPage, setTotalPage] = useState(1);
  const [apiUrl, setApiUrl] = useState('http://localhost:2000/product');

  //states for query string
  const [activePage, setActivePage] = useState(1);
  const [sortType, setSortType] = useState('');
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState('');
  // const [store, setStore] = useState('');

  useEffect(() => {
    async function getProducts() {
      const storeData = await axios.get("http://localhost:2000/store/" + params.storename);
      // console.log(storeData);

      setApiUrl(
        'http://localhost:2000/product?' + 
        'p=' + activePage +
        '&s=' + sortType +
        '&c=' + category +
        '&q=' + query +
        '&store=' + storeData.data.data.id
      );
      // console.log(apiUrl);

      const categoryData = await axios.get("http://localhost:2000/category");
      setCategories(categoryData.data.categories);

      const productData = await axios.get(apiUrl);
      setProducts(productData.data.products);
      setTotalPage(Math.ceil(productData.data.count / 9));
    }
    getProducts();
  }, [apiUrl, activePage, sortType, category, query, params])

  return (
    <>
      <Center>
        <Stack spacing={5} mt="10">
          <HStack>
            <Stack w={200}>
              <Text fontWeight={600} fontSize={'lg'}>
                Sort:
              </Text>
            </Stack>
            <Select placeholder='Select option' value={sortType} onChange={e => setSortType(e.target.value)} >
              <option value='lh'>Lowest Price</option>
              <option value='hl'>Highest Price</option>
              <option value='az'>Name (A to Z)</option>
              <option value='za'>Name (Z to A)</option>
            </Select>
          </HStack>
          <HStack>
            <Stack w={200}>
              <Text fontWeight={600} fontSize={'lg'}>
                Category:
              </Text>
            </Stack>
            <Select placeholder='Select option' value={category} onChange={e => setCategory(e.target.value)} >
              {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
            </Select>
          </HStack>
          <HStack>
            <Stack  w={200}>
              <Text fontWeight={600} fontSize={'lg'}>
                Filter by name:
              </Text>
            </Stack>
            <Input placeholder='Ex: Adidas' value={query} onChange={e => setQuery(e.target.value)}/>
          </HStack>
        </Stack>
      </Center>

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
                  <Th>Product Name</Th>
                  <Th>Description</Th>
                  <Th>Price</Th>
                  <Th>Image</Th>
                  <Th>Category</Th>
                  <Th>Status</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.map((product, index) => {
                  return (
                    <Tr key={product.id}>
                      <Td>{(activePage - 1) * 9 + index + 1}</Td>
                      <Td>{product.name}</Td>
                      <Td>
                        <Stack w="150px">
                          <Text noOfLines={1}>
                            {product.description}
                          </Text>
                        </Stack>
                      </Td>
                      <Td>{rupiah(product.price)}</Td>
                      <Td>
                        <Image
                          rounded={'lg'}
                          height={20}
                          width={20}
                          objectFit={'cover'}
                          src={product.image_url}
                          />
                      </Td>
                      <Td>{product.Category.name}</Td>
                      <Td>
                        {
                          product.is_active? 
                          <HStack>
                            <MdCircle color="green"/>
                            <Text>Active</Text>
                          </HStack>:
                          <HStack>
                            <MdCircle color="red"/>
                            <Text>Not active</Text>
                          </HStack>
                        }
                      </Td>
                      <Td>
                        <FormDrawer 
                          data={product} 
                          title="Edit Product Data" 
                          component={UpdateProductForm}
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
        <Center>
          <Pagination
            activePage={activePage}
            totalPages={totalPage}
            onPageChange={(e, pageInfo) => setActivePage(pageInfo.activePage)}
          />
        </Center>
      </Stack>
    </>
  );
}
