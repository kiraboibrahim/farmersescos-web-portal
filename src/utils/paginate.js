class OutofBoundsPageError extends Error {
  constructor(firstPage, lastPage, currentPage) {
    const message = `The current page, ${currentPage} should be within the bounds: ${firstPage} <= page <= ${lastPage}`;
    super(message);
  }
}
const paginate = ({
  currentPage,
  neighbourPagesCount,
  pageCount,
  withoutEllipsis = false,
}) => {
  if (pageCount === 1 || pageCount === 0) {
    return { pages: [1], prevPage: null, nextPage: null };
  }

  const ELLIPSIS = "...";
  const pages = [];
  const firstPage = 1;
  const lastPage = pageCount;

  if (currentPage < firstPage || currentPage > lastPage) {
    throw new OutofBoundsPageError(firstPage, lastPage, currentPage);
  }
  const prevPage = currentPage === firstPage ? null : currentPage - 1;
  const nextPage = currentPage === lastPage ? null : currentPage + 1;
  const _neighbourPagesCount = withoutEllipsis
    ? pageCount
    : neighbourPagesCount;

  const neighbourPagesLowerBound = Math.max(
    firstPage,
    currentPage - _neighbourPagesCount
  );
  const neighbourPagesUpperBound = Math.min(
    lastPage,
    currentPage + _neighbourPagesCount
  );
  /**
   * currentPage = 5, neighbourPagesCount = 2, pageCount = 5
   * Example: 1, ..., 3, 4, 5
   * For as long as the neighbourPagesLowerBound(3, in this case) is above the first page by more than one unit, there are
   * unrendered pages in between and consequently, we should render the left ellipsis
   *
   * Example 1, 2, 3, ..., 5
   * For as long as the neighbourPagesUpperBound(3, in this case) is below the last page by more than one unit, this implies there
   * are unrendered pages in between, and consequently, we should render the right ellipsis
   */
  const showLeftEllipsis = neighbourPagesLowerBound - firstPage > 1;
  const showRightEllipsis = lastPage - neighbourPagesUpperBound > 1;

  // Add first page
  pages.push(firstPage);

  // Add pages between the first page and last page
  if (showLeftEllipsis) pages.push(ELLIPSIS);
  for (
    let page = neighbourPagesLowerBound;
    page <= neighbourPagesUpperBound;
    page++
  ) {
    /**
     * Don't add the first and last pages coz they will be added before and after the loop respectively.
     * It is possible to iterate over the first and last pages because of the likelihood of neighbourPagesLowerBound
     * being equal to the firstPage and similarly for the neighbourPagesUpperBound. If that's the case, we skip
     * adding first page and last page
     */
    if (page === firstPage || page === lastPage) continue;
    pages.push(page);
  }
  if (showRightEllipsis) pages.push(ELLIPSIS);

  // Add last page
  pages.push(lastPage);

  return { pages, prevPage, nextPage };
};

export default paginate;
