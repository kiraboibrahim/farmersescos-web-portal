import * as Yup from "yup";

const PromotionSchema = Yup.object({
  recipient: Yup.string()
    .required("Choose the recipients of the promotion")
    .oneOf(["ALL_FARMERS", "ALL_GROUPS", "GROUP"]),
  group: Yup.array().when("recipient", {
    is: "selectGroup",
    then: (schema) => schema.min(1, "You have to choose a group"),
    otherwise: (schema) => schema.nullable(),
  }),
  message: Yup.string().required("A promotion message is required"),
});

export default PromotionSchema;
