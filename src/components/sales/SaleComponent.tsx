import { Card, CardBody, HStack } from "@chakra-ui/react";
import AmountDetails from "./partials/AmountDetails";

import BasicInfo from "./partials/BasicInfo";

const SaleComponent = () => {
  return (
    <>
      <Card>
        <CardBody>
          <HStack
            spacing={{ base: 2, md: 6, lg: 8 }}
            align="flex-start"
            flexDirection={{ base: "column", md: "row" }}
          >
            <BasicInfo></BasicInfo>
            <AmountDetails></AmountDetails>
          </HStack>
        </CardBody>
      </Card>
    </>
  );
};

export default SaleComponent;
