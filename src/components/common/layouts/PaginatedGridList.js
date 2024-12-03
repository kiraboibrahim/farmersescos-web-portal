import Pagination from "../../Pagination/Pagination";
import GridList from "./GridList";
import isEmpty from "../../../utils/isEmpty";

export default function PaginatedGridList({
  data,
  renderItem,
  renderEmpty,
  onSelectPage,
}) {
  const { data: items, meta } = data;
  return (
    <>
      <GridList
        items={items}
        renderItem={renderItem}
        renderEmpty={renderEmpty}
      />
      {!isEmpty(meta) && (
        <Pagination
          onSelectPage={onSelectPage}
          currentPage={meta.currentPage}
          pageCount={meta.totalPages}
        />
      )}
    </>
  );
}
