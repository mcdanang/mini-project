import { Navbar } from "../components/navbar";
import {
  Center,
  Heading,
  Stack,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Link,
  HStack,
  Text,
  VStack,
  Box,
  Flex,
  Button,
  useColorModeValue
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdAddCircle, MdRemoveCircle, MdShoppingCartCheckout } from "react-icons/md";
import { rupiah } from '../helper/rupiah';
import { useRef } from "react";
import Swal from "sweetalert2";

export function Cart() {
  const navigate = useNavigate();
  const btnRef = useRef()

  const [cart, setCart] = useState([]);
  const [isChanged, setIsChanged] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getCart() {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const cartData = await axios.get("http://localhost:2000/cart/", config);
      setCart(cartData.data.data || []);  
      setIsChanged(false);
    }
    getCart();
  }, [token, isChanged])

  // console.log(cart);

  async function addToCart(product) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await axios.post("http://localhost:2000/cart/add", product, config);
    setIsChanged(true);
    console.log("Success add one to cart");
  }

  async function removeFromCart(product) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await axios.delete("http://localhost:2000/cart/delete/" + product.ProductId, config);
    setIsChanged(true);
    console.log("Success remove one from cart");
  }

  async function checkout() {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const data = {
        cart
      }
      const result = await axios.post("http://localhost:2000/transaction/create/", data, config);
      await axios.delete("http://localhost:2000/cart/clear", config);
  
      setIsChanged(true);
      Swal.fire({
        icon: "success",
        title: result.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: err.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  const totalPrice = cart.reduce((total, product) => total + product.product_price * product.qty, 0)
  
  return (
    <>
      <Navbar/>

      <Stack align={"center"} my={10}>
        <Heading fontSize={"4xl"} textAlign={"center"}>
          My Cart
        </Heading>
      </Stack>

      <Stack>
        <Center>
          <Link onClick={() => navigate("/")} color={"blue.400"}>
            Add another product to cart
          </Link>
        </Center>
      </Stack>

      <Stack spacing={8} mx={"auto"} w={"80%"} py={2} px={6}>
        <Center py={12}>
          <TableContainer>
          <Stack
            borderWidth="1px"
            borderRadius="lg"
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            mb={20}
            py={10}>
              <Center>
                <VStack>
                  <Heading textAlign={'center'} fontSize="1.5rem" color="blue.300">Summary</Heading>
                  {cart.map((product => {
                    return (
                      <Flex w="400px">
                        <Box w={'75%'} pb={1} color={'#aaaaaa'} fontWeight={'bold'}>
                          Total Harga {product.product_name} ({product.qty} barang)
                        </Box>
                        <Box ml="auto" pb={1} color={'#aaaaaa'} fontWeight={'bold'}>
                          {rupiah(product.product_price * product.qty)}
                        </Box>
                      </Flex>
                    )
                  }))}
                  <Box h={1} bgColor={'#eeeeee'}></Box>
                  <Flex py={2} w="400px">
                    <Box w={'75%'} pb={1} fontWeight={'bold'}>
                      Total Harga
                    </Box>
                    <Box pb={1} fontWeight={'bold'}>
                      {rupiah(totalPrice)}
                    </Box>
                  </Flex>
                  <Button leftIcon={<MdShoppingCartCheckout/>} ref={btnRef} colorScheme='blue' onClick={() => checkout()} >
                    Checkout
                  </Button>
                </VStack>
              </Center>
            </Stack>
            <Table variant='striped' colorScheme='blue'>
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Product Name</Th>                  
                  <Th>Image</Th>                  
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
                      <Td>
                        <Image
                          rounded={'lg'}
                          height={20}
                          width={20}
                          objectFit={'cover'}
                          src={product.product_image_url}
                        />
                      </Td>
                      <Td>{rupiah(product.product_price)}</Td>
                      <Td>
                        <Center>
                          <HStack>
                            <Link>
                              <MdRemoveCircle size={20} color="red" onClick={() => removeFromCart(product)}/>
                            </Link>
                            <Stack width="30px">
                              <Center>
                                <Text>{product.qty}</Text>
                              </Center>
                            </Stack>
                            <Link>
                              <MdAddCircle size={20} color="green" onClick={() => addToCart(product)}/>
                            </Link>
                          </HStack>
                        </Center>
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
