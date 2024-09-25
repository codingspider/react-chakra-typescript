import { useEffect, useState } from "react";
import apiClient from "../../services/axios";
import { Card, CardBody, Button, Skeleton } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";


// Define the type for category
interface Category {
  id: number;
  name: string;
}

// Define pagination structure (for example, Laravel's pagination)
interface PaginationLinks {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginatedResponse<T> {
  data: T;
  links: PaginationLinks[];
  current_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

const getCategories = async (
  page: number
): Promise<PaginatedResponse<Category[]>> => {
  try {
    const response = await apiClient.get(`/categories?page=${page}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching categories", error);
    return {
      data: [],
      links: [],
      current_page: 1,
      last_page: 1,
      next_page_url: null,
      prev_page_url: null,
    };
  }
};

const CategoriesComponent = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, current_page, last_page } = await getCategories(
        currentPage
      );
      setCategories(data);
      setCurrentPage(current_page);
      setLastPage(last_page);
      setIsLoaded(true);
    };

    fetchCategories();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < lastPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

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
                      <Skeleton isLoaded={isLoaded}>Loading...</Skeleton>
                    </Td>
                    <Td>
                      <Skeleton isLoaded={isLoaded}>Loading...</Skeleton>
                    </Td>
                    <Td>
                      <Skeleton isLoaded={isLoaded}>Loading...</Skeleton>
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
            onClick={handlePreviousPage}
            isDisabled={currentPage === 1}
            mr={2}
          >
            Previous
          </Button>
          <Button
            colorScheme="teal"
            size="xs"
            onClick={handleNextPage}
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
