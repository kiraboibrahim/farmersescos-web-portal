import FormWizard, { FormWizardStep } from "../common/forms/FormWizard";
import TextInput from "../common/fields/TextInput";
import CSVChippedSelect from "../common/fields/CSVChippedSelect";
import { ANIMALS, CROPS } from "../../constants";
import Textarea from "../common/fields/Textarea";
import { Stack } from "@mui/joy";
import useCreateFarmer from "../../hooks/useCreateFarmer";
import {
  FarmerDetailsSchema,
  FarmerLocationSchema,
  FarmDetailsSchema,
} from "../../validation-schemas/farmer/FarmerProfileSchema";
export default function CreateFarmerForm() {
  const [createFarmer] = useCreateFarmer();

  return (
    <FormWizard
      steps={{ 1: "Farmer Details", 2: "Location", 3: "Farm Details" }}
      onSubmit={async (values) => {
        await createFarmer(values);
      }}
    >
      <FormWizardStep stepIndex={1} validationSchema={FarmerDetailsSchema}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ marginBottom: 2 }}
        >
          <TextInput
            containerSx={{ flexGrow: 1 }}
            name="firstName"
            label="First name"
            sx={{ marginBottom: { xs: 2, sm: 0 } }}
          />
          <TextInput
            containerSx={{ flexGrow: 1 }}
            label="Last name"
            name="lastName"
          />
        </Stack>
        <TextInput name="phoneNumber" type="tel" label="Mobile" />
      </FormWizardStep>

      <FormWizardStep stepIndex={2} validationSchema={FarmerLocationSchema}>
        <TextInput
          name="latitude"
          label="Latitude"
          type="number"
          containerSx={{ marginBottom: 1 }}
        />
        <TextInput
          name="longitude"
          label="Longitude"
          type="number"
          containerSx={{ marginBottom: 1 }}
        />
        <TextInput
          name="address"
          label="Address"
          containerSx={{ marginBottom: 1 }}
        />
      </FormWizardStep>

      <FormWizardStep stepIndex={3} validationSchema={FarmDetailsSchema}>
        <TextInput
          name="farmName"
          label="Farm name"
          containerSx={{ marginBottom: 1 }}
        />
        <TextInput
          name="farmEstablishedOn"
          label="When was the farm established?"
          type="date"
          containerSx={{ marginBottom: 1 }}
        />
        <TextInput
          name="farmSize"
          label="Farm size"
          containerSx={{ marginBottom: 1 }}
        />
        <Textarea
          name="farmDescription"
          label="Farm description"
          containerSx={{ marginBottom: 1 }}
        />
        <CSVChippedSelect
          name="animalsKept"
          label="What animals do you rear?"
          options={ANIMALS}
          sx={{ marginBottom: 1 }}
        />
        <TextInput
          name="animalsPerType"
          label="For each animal selected, how many animals do you rear?"
          placeholder="10,15,20"
          containerSx={{ marginBottom: 1 }}
        />
        <CSVChippedSelect
          name="cropsGrown"
          label="What crops do you grow?"
          options={CROPS}
          sx={{ marginBottom: 1 }}
        />
        <TextInput
          name="acreagePerCrop"
          label="For each crop selected, how many acres per crop?"
          placeholder="10,15,20"
        />
      </FormWizardStep>
    </FormWizard>
  );
}
