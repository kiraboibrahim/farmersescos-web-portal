import { ButtonGroup, Button, Box } from "@mui/joy";
import paginate from "../../utils/paginate";

const ELLIPSIS = "...";

export default function Pagination({ onSelectPage, currentPage, pageCount }) {
  const { pages, prevPage, nextPage } = paginate({
    currentPage,
    pageCount,
    neighbourPagesCount: 3,
  });
  return pageCount > 1 ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: 3,
        marginBottom: 3,
        position: "sticky",
        bottom: "0",
        zIndex: "mobileStepper",
      }}
    >
      <ButtonGroup color="success">
        {!!prevPage && (
          <Button variant="soft" onClick={() => onSelectPage(prevPage)}>
            Prev
          </Button>
        )}
        {pages.map((page, index) => (
          <Button
            key={index}
            variant={page === currentPage ? "solid" : "soft"}
            onClick={page !== ELLIPSIS ? () => onSelectPage(page) : () => null}
          >
            {page}
          </Button>
        ))}
        {!!nextPage && (
          <Button variant="soft" onClick={() => onSelectPage(nextPage)}>
            Next
          </Button>
        )}
      </ButtonGroup>
    </Box>
  ) : null;
}
