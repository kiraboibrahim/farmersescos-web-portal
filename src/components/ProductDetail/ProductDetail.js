import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/joy";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import TextInput from "../common/forms/TextInput";
import { Link as RouterLink, useParams } from "react-router-dom";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "../../services/product";
import Loading from "../common/utils/Loading";
import { Form } from "formik";
import Textarea from "../common/forms/Textarea";
import { toast } from "react-toastify";
import Select from "../common/forms/Select";
import { useState } from "react";
import ProductSchema from "../../validation-schemas/product/Product.schema";
import difference from "../../utils/difference";
import isEmpty from "../../utils/isEmpty";
import { useLazyGetProductsCategoriesQuery } from "../../services/product-categories";
import parseError from "../common/utils/parse-error";
import DirtyFormik from "../common/forms/DirtyFormik";
import resolvePhotoSrc from "../../utils/resolve-photo-src";

export default function ProductDetail() {
  const [isDirty, setIsDirty] = useState(false);
  const [fetchProductCategories] = useLazyGetProductsCategoriesQuery();
  const { id: productId } = useParams();
  const [currentPhoto, setCurrentPhoto] = useState(null);

  const {
    data: product,
    error: productFetchError,
    isFetching: isProductFetchPending,
  } = useGetProductQuery(productId);
  const [
    updateProduct,
    {
      isError: isProductUpdateFailed,
      error: productUpdateError,
      isLoading: isProductUpdatePending,
      isSucess: isProductUpdateSuccess,
    },
  ] = useUpdateProductMutation();

  if (isProductFetchPending) {
    return <Loading />;
  }
  if (!!productFetchError) {
    toast.error(productFetchError?.message || `${productFetchError}`);
  }

  if (isProductUpdateFailed) {
    toast.error(parseError(productUpdateError));
  }
  if (isProductUpdateSuccess) {
    toast.success("Product updated");
  }
  if (!!product) {
    return (
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
              src={currentPhoto || resolvePhotoSrc(product.coverPhoto)}
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
            {[
              product.coverPhoto,
              product.photo1,
              product.photo2,
              product.photo3,
              product.photo4,
            ].map((photo, index) => (
              <AspectRatio key={index} sx={{ width: 100, cursor: "pointer" }}>
                <img
                  src={resolvePhotoSrc(photo)}
                  alt={product.name}
                  onClick={() => setCurrentPhoto(resolvePhotoSrc(photo))}
                />
              </AspectRatio>
            ))}
          </Stack>

          <ButtonGroup
            variant="soft"
            color="warning"
            buttonFlex={1}
            sx={{ marginTop: 3 }}
          >
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
        <DirtyFormik
          initialValues={{
            ...product,
          }}
          validationSchema={ProductSchema}
          onSubmit={async (values) => {
            const updatedValues = difference(product, values);
            if (!isEmpty(updatedValues)) {
              await updateProduct({ productId, ...updatedValues });
            }
          }}
          onDirty={(isDirty) => setIsDirty(isDirty)}
        >
          <Form>
            <TextInput
              containerSx={{ marginTop: 3 }}
              name="name"
              label="Product name"
            />
            <Select
              containerSx={{ marginTop: 2 }}
              isMulti={true}
              name="categories"
              label="Categories"
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              getOptions={(inputValue, callback) => {
                fetchProductCategories()
                  .unwrap()
                  .then(({ data: productCategories }) => {
                    callback(
                      productCategories.filter(({ name }) =>
                        name.toLowerCase().includes(inputValue.toLowerCase())
                      )
                    );
                  })
                  .catch((err) => toast.error(err?.message));
              }}
            />
            <Textarea
              containerSx={{ marginTop: 2 }}
              name="description"
              label="Description"
            ></Textarea>

            <Stack
              direction="row"
              sx={{ marginTop: 2, position: "sticky", bottom: 0 }}
            >
              <Button
                sx={{ flexGrow: 1 }}
                type="reset"
                size="md"
                variant="soft"
                color="success"
                disabled={!isDirty || isProductUpdatePending}
              >
                Undo Changes
              </Button>
              <Button
                size="md"
                color="success"
                variant="solid"
                startDecorator={<SaveOutlinedIcon />}
                sx={{ flexGrow: 2, marginLeft: 2 }}
                type="submit"
                disabled={!isDirty || isProductUpdatePending}
                loading={isProductUpdatePending}
                loadingPosition="start"
              >
                Save
              </Button>
            </Stack>
          </Form>
        </DirtyFormik>
      </Box>
    );
  }
}
