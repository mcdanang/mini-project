import { Navbar } from "../components/navbar";
import {
  Center,
  Heading,
  // Text,
  Stack,
  // Image,
  // HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from "axios";

export function Cart() {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getCart() {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const cartData = await axios.get("http://localhost:2000/cart/", config);
      setCart(cartData.data.data || []);  
    }
    getCart();
  }, [token])

  console.log(cart);
  
  return (
    <>
      <Navbar/>

      <Stack align={"center"} mt={10}>
        <Heading fontSize={"4xl"} textAlign={"center"}>
          My Cart
        </Heading>
      </Stack>

      <Stack spacing={8} mx={"auto"} w={"80%"} py={12} px={6}>
        <Center py={12}>
          <TableContainer>
            <Table variant='striped' colorScheme='blue'>
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Product Name</Th>                  
                  <Th>Price</Th>           
                  <Th>Quantity</Th>
                </Tr>
              </Thead>
              <Tbody>
                {cart.map((product, index) => {
                  return (
                    <Tr key={product.ProductId}>
                      <Td>{index + 1}</Td>
                      <Td>{product.product_name}</Td>
                      <Td>{product.product_price}</Td>
                      <Td>{product.qty}</Td>
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
