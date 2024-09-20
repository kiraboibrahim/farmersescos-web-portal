import {
  AspectRatio,
  Box,
  Stack,
  FormControl,
  FormLabel,
  Typography,
  Textarea,
  Button,
  Chip,
  ChipDelete,
  Card,
  CardContent,
  Avatar,
  IconButton,
  ButtonGroup,
} from "@mui/joy";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import Input from "../common/Input";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../services/product";

export default function ProductDetail() {
  const { id: productId } = useParams();
  const { data: product, error, isLoading } = useGetProductByIdQuery(productId);
  return !!error ? (
    <Typography>{error}</Typography>
  ) : isLoading ? (
    <Typography>Loading...</Typography>
  ) : !!product ? (
    <Box
      sx={{
        padding: 2,
        marginBottom: 3,
        maxWidth: 800,
        marginLeft: "auto",
        marginRight: "auto",
        position: "relative",
      }}
    >
      <Box
        sx={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: 500,
        }}
      >
        <AspectRatio variant="plain">
          <img
            src={`${process.env.REACT_APP_MEDIA_BASE_URL}/${product.coverPhoto}`}
            alt={product.name}
          />
        </AspectRatio>

        <Stack
          spacing={2}
          direction="row"
          sx={{
            marginTop: 2,
            justifyContent: "center",
          }}
        >
          <AspectRatio sx={{ width: 100 }}>
            <img
              src={`${process.env.REACT_APP_MEDIA_BASE_URL}/${product.photo1}`}
              alt={product.name}
            />
          </AspectRatio>
          <AspectRatio sx={{ width: 100 }}>
            <img
              src={`${process.env.REACT_APP_MEDIA_BASE_URL}/${product.photo2}`}
              alt={product.name}
            />
          </AspectRatio>
          <AspectRatio sx={{ width: 100 }}>
            <img
              src={`${process.env.REACT_APP_MEDIA_BASE_URL}/${product.photo3}`}
              alt={product.name}
            />
          </AspectRatio>
          <AspectRatio sx={{ width: 100 }}>
            <img
              src={`${process.env.REACT_APP_MEDIA_BASE_URL}/${product.photo4}`}
              alt={product.name}
            />
          </AspectRatio>
        </Stack>

        <ButtonGroup color="warning" buttonFlex={1} sx={{ marginTop: 3 }}>
          <Button startDecorator={<DeleteOutlinedIcon />}>Delete</Button>

          <Button startDecorator={<StarBorderOutlinedIcon />}>Feature</Button>
        </ButtonGroup>

        <Typography level="h4" sx={{ marginTop: 3 }}>
          {product.name}
        </Typography>
        <Typography sx={{ marginTop: 2 }} level="body-md">
          Sold by
        </Typography>
        <Card>
          <CardContent orientation="horizontal">
            <Avatar
              src={`${process.env.REACT_APP_MEDIA_BASE_URL}/${product.esco.profilePhoto}`}
              alt={product.esco.name}
            />
            <Typography level="body-sm">{product.esco.name}</Typography>
            <IconButton
              sx={{ marginLeft: "auto" }}
              component={RouterLink}
              to={`/escos/${product.esco.id}`}
            >
              <ChevronRightOutlinedIcon />
            </IconButton>
          </CardContent>
        </Card>
      </Box>
      <FormControl sx={{ marginTop: 3 }}>
        <FormLabel>Product name</FormLabel>
        <Input value={product.name} />
      </FormControl>
      <Box sx={{ marginTop: 2 }}>
        <FormLabel sx={{ marginBottom: 1 }}>Categories</FormLabel>
        {product.categories.map((category) => (
          <Chip
            key={category.id}
            color="success"
            sx={{ marginRight: 2 }}
            endDecorator={<ChipDelete />}
          >
            {category.name}
          </Chip>
        ))}
      </Box>
      <FormControl sx={{ marginTop: 2 }}>
        <FormLabel>Description</FormLabel>
        <Textarea
          value={product.description}
          sx={{ fontSize: "sm" }}
        ></Textarea>
      </FormControl>

      <Button
        size="md"
        color="success"
        variant="soft"
        startDecorator={<SaveOutlinedIcon />}
        sx={{
          marginTop: 3,
          width: "100%",
          position: "sticky",
          bottom: 0,
          zIndex: "tooltip",
        }}
      >
        Save
      </Button>
    </Box>
  ) : null;
}
