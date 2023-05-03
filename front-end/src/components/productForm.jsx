import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Stack,
  Button,
  useColorModeValue,
  Center
} from "@chakra-ui/react";
import axios from "axios";
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ProductForm = () => {
  const token = localStorage.getItem("token");
  const [store, setStore] = useState({});
  const params = useParams();

  useEffect(() => {
    async function getUser() {
      const storeData = await axios.get("http://localhost:2000/store/" + params.storename);
      setStore(storeData.data.data);
    }
    getUser();
  }, [params])

  const ProductSchema = Yup.object().shape({
    name: Yup.string()
      .required("Product name is required"),
    description: Yup.string()
      .required("Description is required"),
    category_id: Yup.number()
      .required("Category is required"),
    price: Yup.number()
      .min(0, "Minimum price is 0")
      .required("Price is required"),
    image_url: Yup.string()
      .required("Image URL is required"),
  });

  const submitNewProduct = async (values) => {
    try {
        const data = {
          ...values,
          store_id: store.id
        };

        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const result = await axios.post('http://localhost:2000/product/create', data, config);

        Swal.fire({
          icon: 'success',
          title: result.data.message,
          showConfirmButton: false,
          timer: 1500
        })

    } catch (err) {
        console.log(err.response.data);
        if (err.response.data) {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: err.response.data.errors[0].message,
            showConfirmButton: false,
            timer: 1500
          })
        }
    }
  }

  const inputStyle = {
    border: '1px solid #E2E8F0',
    borderRadius: '0.375rem',
    padding: '7px 16px',
    width: '100%'
  }

  const errorStyle = { color: "red", fontSize: "12px", marginTop: "0px" };

  return (
    <Flex
      // minH={"100%"}
      align={"center"}
      justify={"center"}
      // bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"sm"} py={12} px={6}>
        <Center>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
            width={500}
          >

            <Formik
              initialValues={{ name: "", description: "", category_id: 1, price: 0, image_url: "https://picsum.photos/300" }}
              validationSchema={ProductSchema}
              onSubmit={(values, {resetForm}) => {
                submitNewProduct(values);
                resetForm();
              }}
            >
              {(props) => {
                // console.log(props);
                return (
                  <Form>
                    
                    <Stack spacing={4}>
                      <FormControl id="name" isRequired>
                        <FormLabel>Product Name</FormLabel>
                        <Field type="text" name="name" style={inputStyle}/>
                        <ErrorMessage component="div" name="name" style={errorStyle} />
                      </FormControl>

                      <FormControl id="description" isRequired>
                        <FormLabel>Description</FormLabel>
                        <Field type="text" as="textarea" name="description" style={inputStyle}/>
                        <ErrorMessage component="div" name="description" style={errorStyle} />
                      </FormControl>

                      <FormControl id="category_id" isRequired>
                        <FormLabel>Category</FormLabel>
                        <Field type="number" as="select" name="category_id" style={inputStyle} control="select">
                          <option key="1" value="1">1</option>
                          <option key="2" value="2">2</option>
                        </Field>
                        <ErrorMessage component="div" name="category_id" style={errorStyle} />
                      </FormControl>

                      <FormControl id="price" isRequired>
                        <FormLabel>Price</FormLabel>
                        <Field type="number" name="price" style={inputStyle}/>
                        <ErrorMessage component="div" name="price" style={errorStyle} />
                      </FormControl>

                      <FormControl id="image_url" isRequired>
                        <FormLabel>Product Image URL</FormLabel>
                        <Field type="text" name="image_url" style={inputStyle}/>
                        <ErrorMessage component="div" name="image_url" style={errorStyle} />
                      </FormControl>

                      <Stack spacing={10} pt={2}>
                        <Button
                          loadingText="Submitting"
                          size="lg"
                          bg={"blue.400"}
                          color={"white"}
                          _hover={{
                            bg: "blue.500",
                          }}
                          // onClick={submitNewEvent}
                          type="submit"
                        >
                          Submit New Product
                        </Button>
                      </Stack>
                    </Stack>
                  </Form>
                )
              }}
            </Formik>

          </Box>

        </Center>
      </Stack>
    </Flex>
  );
};
