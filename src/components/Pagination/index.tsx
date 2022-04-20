import { useState } from 'react';
import { Container, PaginationItem } from './styles';

interface PaginationProps {
  lastPage?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  lastPage,
  currentPage,
  onPageChange
}: PaginationProps) {
  const [isCurrent, setIsCurrent] = useState(true);

  return (
    <Container>
      <PaginationItem isCurrent={isCurrent}>1</PaginationItem>
      <PaginationItem>2</PaginationItem>
      <PaginationItem>3</PaginationItem>
      <PaginationItem>4</PaginationItem>
      <PaginationItem>5</PaginationItem>
    </Container>
  );
}
