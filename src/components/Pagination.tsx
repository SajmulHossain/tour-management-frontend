import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

interface IProps {
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
  totalPage: number,
  currentPage: number;
}

const PaginationComponent = ({ onPageChange, totalPage, currentPage } : IProps) => {

  const totalPageArray = Array.from({length: totalPage}, (_, index) => index + 1);

  const handlePreviousPage = () => {
    onPageChange((prev) => prev > 1 ? prev - 1 : 1);
  }
  const handleNextPage = () => {
    onPageChange(prev => prev < totalPage ? prev + 1 : totalPage);
  };

  
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={handlePreviousPage} />
        </PaginationItem>
        <PaginationItem>
          {totalPageArray.map((value) => (
            <PaginationLink isActive={currentPage === value} onClick={() => onPageChange(value)}>{value}</PaginationLink>
          ))}
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={handleNextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;