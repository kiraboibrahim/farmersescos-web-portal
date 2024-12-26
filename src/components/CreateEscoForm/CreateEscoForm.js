import { Form, Formik } from "formik";
import TextInput from "../common/fields/TextInput";
import CSVChippedSelect from "../common/fields/CSVChippedSelect";
import { Button, Stack } from "@mui/joy";
import EscoProfileSchema from "../../validation-schemas/esco/EscoProfileSchema";
import useCreateEsco from "../../hooks/useCreateEsco";

export default function CreateEscoForm() {
  const [createEsco, isCreatingEsco] = useCreateEsco();
  return (
    <Formik
      validationSchema={EscoProfileSchema}
      initialValues={{
        name: "",
        email: "",
        phoneNumber: "",
        website: "",
        latitude: "",
        longitude: "",
        incorporationDate: "",
        specialization: "",
      }}
      onSubmit={async (values) => {
        await createEsco(values);
      }}
    >
      <Form>
        <TextInput name="name" label="Name" sx={{ marginBottom: 1 }} />
        <TextInput
          name="email"
          label="Email"
          type="email"
          sx={{ marginBottom: 1 }}
        />
        <TextInput
          name="phoneNumber"
          label="Phone number"
          type="tel"
          sx={{ marginBottom: 1 }}
        />
        <TextInput
          name="website"
          label="Website"
          placeholder="example.com"
          sx={{ marginBottom: 1 }}
        />
        <TextInput name="address" label="Address" sx={{ marginBottom: 1 }} />
        <TextInput
          name="latitude"
          label="Latitude"
          type="number"
          sx={{ marginBottom: 1 }}
        />
        <TextInput
          name="longitude"
          label="Longitude"
          type="number"
          sx={{ marginBottom: 1 }}
        />
        <TextInput
          name="incorporationDate"
          label="Date of Incorporation"
          type="date"
          sx={{ marginBottom: 1 }}
        />
        <CSVChippedSelect
          isDynamic={true}
          name="specialization"
          label="What do you specialize in?"
          sx={{ marginBottom: 1 }}
        />
        <Stack direction="row">
          <Button
            type="submit"
            sx={{ marginLeft: "auto" }}
            color="success"
            loading={isCreatingEsco}
            loadingPosition="start"
            disabled={isCreatingEsco}
          >
            Create Esco
          </Button>
        </Stack>
      </Form>
    </Formik>
  );
}
