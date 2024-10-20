import {
  AspectRatio,
  Avatar,
  Box,
  Card,
  CardContent,
  Dropdown,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  Typography,
} from "@mui/joy";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import {
  Link as RouterLink,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useGetProductsQuery } from "../../services/product";
import Pagination from "../Pagination/Pagination";
import { useState } from "react";
import Loading from "../common/utils/Loading";
import GridList from "../common/layouts/GridList";
import { useGetEscoProductsQuery } from "../../services/esco";
import Empty from "../common/utils/Empty";
import Error from "../common/utils/Error";
import resolvePhotoSrc from "../../utils/resolve-photo-src";

export function ProductItem({ product }) {
  return (
    <Card size="sm">
      <CardContent orientation="horizontal">
        <Avatar
          src={`${process.env.REACT_APP_MEDIA_BASE_URL}/${product.esco.profilePhoto}`}
          sx={{ marginRight: 1 }}
        >
          {product.esco.name}
        </Avatar>
        <Typography
          level="body-sm"
          sx={{
            alignSelf: "center",
            flexGrow: 2,
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {product.esco.name}
        </Typography>
        <Box sx={{ marginLeft: "auto" }}>
          <Dropdown>
            <MenuButton slots={{ root: IconButton }}>
              <MoreVertIcon />
            </MenuButton>
            <Menu>
              <MenuItem>
                <Typography
                  level="body-sm"
                  startDecorator={<ModeEditOutlinedIcon />}
                >
                  Edit
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography
                  level="body-sm"
                  startDecorator={<DeleteOutlinedIcon />}
                >
                  Delete
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography
                  level="body-sm"
                  startDecorator={<StarBorderOutlinedIcon />}
                >
                  Feature
                </Typography>
              </MenuItem>
            </Menu>
          </Dropdown>
        </Box>
      </CardContent>
      <AspectRatio>
        <img src={resolvePhotoSrc(product.coverPhoto)} alt={product.name} />
      </AspectRatio>
      <Link
        sx={{
          display: "block",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
        component={RouterLink}
        to={`/products/${product.id}`}
        overlay
        underline="none"
      >
        <Typography level="title-md">{product.name}</Typography>
      </Link>
      <Typography
        level="body-xs"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {product.description}
      </Typography>
    </Card>
  );
}

export function AllProductList() {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const {
    data: products,
    error,
    isFetching,
  } = useGetProductsQuery({ page, search: searchParams.get("search") });
  if (isFetching) {
    return <Loading />;
  }
  if (error) {
    return <Error error={error} />;
  }
  return <ProductList products={products} setPage={setPage} />;
}

export function EscoProductList() {
  const { id: escoId } = useParams();
  const [page, setPage] = useState(1);
  const {
    data: products,
    error,
    isFetching,
  } = useGetEscoProductsQuery({ escoId, page });
  if (isFetching) {
    return <Loading />;
  }
  if (!!error) {
    return <Error error={error} />;
  }
  return <ProductList products={products} onSelectPage={setPage} />;
}

export default function ProductList({
  products,
  onSelectPage = (page) => page,
}) {
  if (products?.data) {
    return (
      <>
        <GridList
          items={products.data}
          renderItem={(item) => <ProductItem product={item} />}
          renderEmpty={() => <Empty>No products found</Empty>}
        />
        {!!products.meta && (
          <Pagination
            pageCount={products.meta.totalPages}
            currentPage={products.meta.currentPage}
            onSelectPage={onSelectPage}
          ></Pagination>
        )}
      </>
    );
  }
}
