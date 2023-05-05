import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator, Heading, VStack, Center } from '@chakra-ui/react'
import { Navbar } from "../components/navbar";
import { StoreProfile } from "../components/storeProfile";
import { ProductDrawer } from "../components/productDrawer";
import { MyProducts } from "../components/myProducts";
import { ProductForm } from "../components/forms/productForm";
import { Categories } from "../components/categories";
import { CategoryForm } from "../components/forms/categoryForm";

export function Store() {
  return (
    <>
      <Navbar />
      <StoreProfile/>
      <Tabs size="lg" isFitted variant="unstyled">
        <TabList>
          <Tab>Manage Product</Tab>
          <Tab>Manage Category</Tab>
          <Tab>Reporting</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />

        <TabPanels>
          <TabPanel>
            <VStack pt="10">
              <Heading>My Products</Heading>
              <ProductDrawer 
                product={{}} 
                title="Create New Product" 
                component={ProductForm}
                buttonName="Create new product"
              />
              <MyProducts/>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack pt="10">
              <Heading>Category List</Heading>
              <ProductDrawer 
                product={{}} 
                title="Create New Category" 
                component={CategoryForm}
                buttonName="Create new category"
              />
              <Categories/>
            </VStack>
          </TabPanel>
          <TabPanel>
            <Center mt="20" fontSize={40}>Reporting Coming Soon!</Center>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
