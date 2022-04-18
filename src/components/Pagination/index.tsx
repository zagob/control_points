import React from "react";
import { usePagination, DOTS } from "../../hooks/usePagination";
import { Flex } from "@chakra-ui/react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { ButtonPagination } from "./ButtonPagination";

interface PaginationProps {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}

export const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}: PaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <>
      <Flex color="#fff" gap="8px" justifyContent="flex-end">
        <ButtonPagination onClick={onPrevious} disabled={currentPage === 1}>
          <AiOutlineArrowLeft color="#000" />
        </ButtonPagination>
        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return <li className="pagination-item dots">&#8230;</li>;
          }

          return (
            <ButtonPagination
              color="#000"
              onClick={() => onPageChange(pageNumber)}
              background={
                currentPage === pageNumber ? "yellow.400" : "whiteAlpha.900"
              }
            >
              {" "}
              {pageNumber}
            </ButtonPagination>
          );
        })}
        <ButtonPagination onClick={onNext} disabled={currentPage === lastPage}>
          <AiOutlineArrowRight color="#000" />
        </ButtonPagination>
      </Flex>
    </>
  );
};
