import { useParams } from "react-router";
import { useGetFarmerRecommendationsQuery } from "../../services/farmer";
import Loading from "../common/utils/Loading";
import { toast } from "react-toastify";
import ProductList from "../ProductList/Product.List";
import parseError from "../common/utils/parse-error";

export function FarmerRecommendationList() {
  const { id: farmerId } = useParams();
  const {
    data: recommendations,
    isFetching,
    error,
  } = useGetFarmerRecommendationsQuery({ farmerId });
  if (isFetching) {
    return <Loading />;
  }
  if (!!error) {
    toast.error(parseError(error));
  }
  if (!!recommendations) {
    return (
      <ProductList
        products={{ data: recommendations.map(({ product }) => product) }}
      />
    );
  }
}
