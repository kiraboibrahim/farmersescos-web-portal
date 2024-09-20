import {
  AspectRatio,
  Avatar,
  Box,
  Card,
  CardContent,
  IconButton,
  Link,
  Typography,
  Grid,
  Tooltip,
} from "@mui/joy";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Link as RouterLink } from "react-router-dom";
import { useGetProductsQuery } from "../../services/product";

function InterestItem({ product }) {
  return (
    <Card size="sm">
      <CardContent orientation="horizontal">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={`${process.env.REACT_APP_MEDIA_BASE_URL}/${product.esco.profilePhoto}`}
            sx={{ marginRight: 1 }}
          >
            {product.esco.name}
          </Avatar>
          <Typography level="body-sm">{product.esco.name}</Typography>
        </Box>
        <Box sx={{ marginLeft: "auto" }}>
          <Tooltip arrow title="Remove from interests" size="sm">
            <IconButton>
              <DeleteOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
      <AspectRatio>
        <img
          src={`${process.env.REACT_APP_MEDIA_BASE_URL}/${product.coverPhoto}`}
          alt={product.name}
        />
      </AspectRatio>
      <Typography
        level="body-md"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          fontWeight: "bold",
        }}
      >
        <Link
          component={RouterLink}
          to={`/products/${product.id}`}
          overlay
          underline="none"
          color="neutral"
          level="title-lg"
        >
          {product.name}
        </Link>
      </Typography>
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
export default function InterestList() {
  const { data: products, error, isLoading } = useGetProductsQuery();
  return !!error ? (
    <Typography>{error}</Typography>
  ) : isLoading ? (
    <Typography>Loading...</Typography>
  ) : !!products ? (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={1}>
        {products.data.map((product) => (
          <Grid
            key={product.id}
            size={{ xs: 12, sm: 6, md: 3 }}
            flexGrow={1}
            flexBasis={250}
          >
            <InterestItem product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  ) : null;
}
