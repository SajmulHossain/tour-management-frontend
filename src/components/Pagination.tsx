import {
    Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface IProps {
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
  page: number
}

const PaginationComponent = ({ onPageChange, page } : IProps) => {

  const totalPageArray = Array.from({length: page}, (_, index) => index + 1)
  console.log(totalPageArray);

  const handlePreviousPage = () => {
    onPageChange((prev) => prev > 1 ? prev - 1 : 1);
  }
  const handleNextPage = () => {
    onPageChange(prev => prev < page ? prev + 1 : page);
  };

  
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={handlePreviousPage} />
        </PaginationItem>
        <PaginationItem>
          {totalPageArray.map((value) => (
            <PaginationLink onClick={() => onPageChange(value)}>{value}</PaginationLink>
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