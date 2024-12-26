import { useParams } from "react-router-dom";
import { useGetFarmerFavoriteProductsQuery } from "../../services/farmer";
import { useState } from "react";
import Loading from "../common/utils/Loading";
import Empty from "../common/utils/Empty";
import Error from "../common/utils/Error";
import { ProductItem } from "../ProductList/Product.List";
import PaginatedGridList from "../common/layouts/PaginatedGridList";

function InterestItem({ interest: { product } }) {
  return <ProductItem product={product} />;
}

export default function InterestList() {
  const { id: farmerId } = useParams();
  const [page, setPage] = useState(1);
  const {
    data: interests,
    error,
    isFetching,
  } = useGetFarmerFavoriteProductsQuery({ farmerId, page });
  if (isFetching) {
    return <Loading />;
  }
  if (!!error) {
    return <Error error={error} />;
  }
  return (
    <>
      <PaginatedGridList
        data={interests}
        renderItem={(item) => <InterestItem interest={item} />}
        renderEmpty={() => <Empty>No interests found</Empty>}
        onSelectPage={setPage}
      />
    </>
  );
}
