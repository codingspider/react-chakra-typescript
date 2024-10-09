import { Button, Image } from "@chakra-ui/react";
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
    data: products,
    currentPage,
    lastPage,
    loading,
    goToNextPage,
    goToPreviousPage,
  } = usePagination("/products");

  return (
    <>
      <Card>
        <CardBody>
          <TableContainer mb={3}>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Sl No</Th>
                  <Th>Thumbnail</Th>
                  <Th>SKU</Th>
                  <Th>Product Name</Th>
                  <Th>Stock</Th>
                  <Th>Category</Th>
                  <Th>Price</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.length === 0 && (
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
                    <Td>
                      <Skeleton isLoaded={loading}>Loading...</Skeleton>
                    </Td>
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
                {products.map((product, index) => (
                  <Tr key={product.id}>
                    <Td>{(currentPage - 1) * 10 + (index + 1)}</Td>
                    <Td>
                      <Image src={product.thumbnail} h={50}></Image>
                    </Td>
                    <Td>{product.sku}</Td>
                    <Td>{product.title}</Td>
                    <Td>{product.stock}</Td>
                    <Td>{product.category}</Td>
                    <Td>{product.price}</Td>
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
