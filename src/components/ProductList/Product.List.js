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
  Grid,
} from "@mui/joy";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { Link as RouterLink } from "react-router-dom";
import { useGetProductsQuery } from "../../services/product";

function ProductItem({ product }) {
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
          <Typography
            level="body-sm"
            sx={{
              textOverflow: "ellipsis",
              width: 120,
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {product.esco.name}
          </Typography>
        </Box>
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

export default function ProductList() {
  const { data: products, error, isLoading } = useGetProductsQuery();
  return !!error ? (
    <Typography>{error}</Typography>
  ) : isLoading ? (
    <Typography>Loading...</Typography>
  ) : !!products ? (
    <Grid container spacing={1}>
      {products.data.map((product) => (
        <Grid
          key={product.id}
          size={{ xs: 12, sm: 6, md: 3 }}
          flexGrow={1}
          flexBasis={250}
        >
          <ProductItem product={product} />
        </Grid>
      ))}
    </Grid>
  ) : null;
}
