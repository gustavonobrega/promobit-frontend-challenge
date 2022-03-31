import { useState } from 'react';
import { Container, PaginationItem } from './styles';

export function Pagination({}: PaginationProps) {
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
