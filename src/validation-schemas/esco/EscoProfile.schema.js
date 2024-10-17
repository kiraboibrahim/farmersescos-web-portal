import * as Yup from "yup";
import { DOMAIN_REGEX, UG_PHONE_NUMBER_REGEX } from "../../constants";

const today = new Date();

const EscoProfileSchema = Yup.object({
  name: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Esco name is required"),
  email: Yup.string().email().required("Email is required"),
  phoneNumber: Yup.string()
    .matches(UG_PHONE_NUMBER_REGEX, {
      message: "Must be a Ugandan phone number",
    })
    .required(
      "Phone number is required. It will be used to reset your password"
    ),
  website: Yup.string()
    .matches(DOMAIN_REGEX, {
      message: "Must be a valid domain i.e www.example.com",
    })
    .notRequired(),
  latitude: Yup.number().notRequired(),
  longitude: Yup.number().notRequired(),
  incorporationDate: Yup.date()
    .max(`${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`)
    .required("Incoporation Date is required"),
  address: Yup.string().required("Address is required"),
  specialization: Yup.string().required("Specialization is required"),
});
export default EscoProfileSchema;
