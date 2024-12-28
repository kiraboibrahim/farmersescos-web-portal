import {
  Avatar,
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
} from "@mui/joy";
import { Form, Formik, useFormikContext } from "formik";
import PromotionSchema from "../../validation-schemas/product/PromotionSchema";
import resolvePhotoSrc from "../../utils/resolve-photo-src";
import toTitleCase from "../../utils/toTitleCase";
import RadioInput from "../common/fields/RadioInput";
import Textarea from "../common/fields/Textarea";
import GroupSelect from "../common/fields/GroupSelect";
import usePromoteProduct from "../../hooks/usePromoteProduct";

export default function PromoteProductForm({ product }) {
  const [promoteProduct, isPromotingProduct] = usePromoteProduct(product);
  return (
    <Box>
      <Card
        variant="soft"
        orientation="horizontal"
        sx={{ marginBottom: 3, overflow: "hidden" }}
      >
        <CardContent orientation="horizontal">
          <Avatar size="lg" src={resolvePhotoSrc(product.coverPhoto)}>
            {product.name}
          </Avatar>
          <Box>
            <Typography level="h3">{toTitleCase(product.name)}</Typography>

            <Box level="body-xs" sx={{ marginTop: 1 }}>
              {product.categories.map(({ name }, index) => (
                <Chip
                  size="sm"
                  key={index}
                  color="success"
                  sx={{ marginRight: 1, overflow: "scroll" }}
                >
                  {name}
                </Chip>
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Formik
        validationSchema={PromotionSchema}
        initialValues={{
          recipient: "",
          group: null,
          message: "",
        }}
        onSubmit={async (values) => {
          await promoteProduct(product.id, values);
        }}
      >
        <Form>
          <RadioInput
            name="recipient"
            label="Send promotion to"
            options={{
              ALL_FARMERS: "All farmers",
              ALL_GROUPS: "All groups",
              GROUP: "Select group",
            }}
            sx={{ marginBottom: 1 }}
          ></RadioInput>
          <DependentGroupSelect />
          <Textarea name="message" label="Message" sx={{ marginTop: 2 }} />
          <Button
            type="submit"
            sx={{ marginTop: 2, borderRadius: "lg", width: "100%" }}
            color="success"
            loadingPosition="start"
            loading={isPromotingProduct}
            disabled={isPromotingProduct}
          >
            Promote
          </Button>
        </Form>
      </Formik>
    </Box>
  );
}

function DependentGroupSelect() {
  const {
    values: { recipient },
  } = useFormikContext();

  return recipient === "GROUP" ? <GroupSelect name="group" label="" /> : <></>;
}
