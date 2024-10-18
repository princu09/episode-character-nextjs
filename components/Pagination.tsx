"use client";
import { Pagination } from "@nextui-org/pagination";
import { useRouter } from "next/navigation";
import React from "react";

interface IPaginationProps {
  total: number;
}

const CustomPagination: React.FC<IPaginationProps> = ({ total }) => {
  const router = useRouter();

  const changePage = (page: number) => {
    router.push(`/?page=${page}`);
  };

  return (
    <Pagination
      color="danger"
      initialPage={1}
      total={total}
      variant="bordered"
      onChange={(page) => changePage(page)}
    />
  );
};

export default CustomPagination;
