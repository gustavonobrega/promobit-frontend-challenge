import { Container, PaginationItem, RightArrow } from './styles';

interface PaginationProps {
  lastPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  resetSelectedGenres: (selectedGenres: number[]) => void;
}

const maxPages = 5;
const maxLeftPages = (maxPages - 1) / 2;

export function Pagination({
  lastPage,
  currentPage,
  onPageChange,
  resetSelectedGenres
}: PaginationProps) {
  const maxFirstPage = Math.max(lastPage - (maxPages - 1), 1);
  const firstPage = Math.min(
    Math.max(currentPage - maxLeftPages, 1),
    maxFirstPage
  );

  const pagesArray = Array.from({ length: maxPages }).map(
    (_, index) => index + firstPage
  );

  function handlePageChange(page: number) {
    onPageChange(page);
    resetSelectedGenres([]);
  }

  return (
    <Container>
      {pagesArray.map(page => (
        <li key={page}>
          <PaginationItem
            isCurrent={currentPage === page}
            disabled={currentPage === page}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </PaginationItem>
        </li>
      ))}

      {currentPage < lastPage && (
        <li>
          <PaginationItem onClick={() => handlePageChange(currentPage + 1)}>
            <RightArrow />
          </PaginationItem>
        </li>
      )}

      {currentPage < lastPage && (
        <li>
          <PaginationItem
            isCurrent={currentPage === lastPage}
            disabled={currentPage === lastPage}
            onClick={() => handlePageChange(lastPage)}
          >
            Última
          </PaginationItem>
        </li>
      )}
    </Container>
  );
}
