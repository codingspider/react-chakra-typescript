import { Button } from "@chakra-ui/react";
import usePagination from "../../hooks/usePagination";
import { Card, CardBody, Skeleton } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

const CategoriesComponent = () => {
  const {
    data: categories,
    currentPage,
    lastPage,
    loading,
    goToNextPage,
    goToPreviousPage,
  } = usePagination("/categories");

  return (
    <>
      <Card>
        <CardBody>
          <TableContainer mb={3}>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Sl No</Th>
                  <Th>Category Name</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {categories.length === 0 && (
                  <Tr>
                    <Td>
                      <Skeleton isLoaded={loading}>Loading...</Skeleton>
                    </Td>
                    <Td>
                      <Skeleton isLoaded={loading}>Loading...</Skeleton>
                    </Td>
                    <Td>
                      <Skeleton isLoaded={loading}>Loading...</Skeleton>
                    </Td>
                  </Tr>
                )}
                {categories.map((category, index) => (
                  <Tr key={category.id}>
                    <Td>{(currentPage - 1) * 5 + (index + 1)}</Td>
                    <Td>{category.name}</Td>
                    <Td></Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Button
            colorScheme="teal"
            size="xs"
            onClick={goToPreviousPage}
            isDisabled={currentPage === 1}
            mr={2}
          >
            Previous
          </Button>
          <Button
            colorScheme="teal"
            size="xs"
            onClick={goToNextPage}
            isDisabled={currentPage === lastPage}
          >
            Next
          </Button>
        </CardBody>
      </Card>
    </>
  );
};

export default CategoriesComponent;
