import {
  Card,
  CardBody,
  HStack,
} from "@chakra-ui/react";
import StatComponent from "../dashboard/StatComponent";

const DashboardComponent = () => {
  return (
    <>
      <Card>
        <CardBody>
          <StatComponent></StatComponent>
        </CardBody>
      </Card>

      <HStack>
        <Card mt={2} width="50%">
          <CardBody>
            <p>stats chart </p>
          </CardBody>
        </Card>

        <Card mt={2} width="50%">
          <CardBody>
            <p>stats chart </p>
          </CardBody>
        </Card>
      </HStack>
    </>
  );
};

export default DashboardComponent;
