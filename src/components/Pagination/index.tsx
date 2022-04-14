import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "../../hooks/usePagination";
import { Button, Flex } from "@chakra-ui/react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
// import "./pagination.scss";

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
      <Flex color="#fff">
        <Button onClick={onPrevious} disabled={currentPage === 1}>
          <AiOutlineArrowLeft color="#000" />
        </Button>
        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return <li className="pagination-item dots">&#8230;</li>;
          }

          return (
            <Button color="#000" onClick={() => onPageChange(pageNumber)}>
              {" "}
              {pageNumber}
            </Button>
          );
        })}
        <Button  onClick={onNext} disabled={currentPage === lastPage}>
          <AiOutlineArrowRight color="#000" />
        </Button>
      </Flex>
      <ul
      // className={classnames("pagination-container", { [className]: className })}
      >
        <li
          className={classnames("pagination-item", {
            disabled: currentPage === 1,
          })}
          onClick={onPrevious}
        >
          <div className="arrow left" />
        </li>
        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return <li className="pagination-item dots">&#8230;</li>;
          }

          return (
            <li
              className={classnames("pagination-item", {
                selected: pageNumber === currentPage,
              })}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
        <li
          className={classnames("pagination-item", {
            disabled: currentPage === lastPage,
          })}
          onClick={onNext}
        >
          <div className="arrow right" />
        </li>
      </ul>
    </>
  );
};
