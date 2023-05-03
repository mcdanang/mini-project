import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator, Heading, VStack } from '@chakra-ui/react'
import { Navbar } from "../components/navbar";
import { StoreProfile } from "../components/storeProfile";
import { ProductDrawer } from "../components/productDrawer";

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
            <VStack>
              <Heading>Your Products</Heading>
              <ProductDrawer/>
            </VStack>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
