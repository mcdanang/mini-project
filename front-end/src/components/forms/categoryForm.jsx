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

export const CategoryForm = () => {
  const token = localStorage.getItem("token");
  
  const CategorySchema = Yup.object().shape({
    name: Yup.string()
      .required("Category name is required"),
  });

  const submitNewCategory = async (values) => {
    try {
        const data = {
          ...values,
        };

        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const result = await axios.post('http://localhost:2000/category/create', data, config);

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
              initialValues={{ name: "" }}
              validationSchema={CategorySchema}
              onSubmit={(values, {resetForm}) => {
                submitNewCategory(values);
                resetForm();
              }}
            >
              {(props) => {
                // console.log(props);
                return (
                  <Form>
                    
                    <Stack spacing={4}>
                      <FormControl id="name" isRequired>
                        <FormLabel>Category Name</FormLabel>
                        <Field type="text" name="name" style={inputStyle}/>
                        <ErrorMessage component="div" name="name" style={errorStyle} />
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
                          Submit New Category
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
