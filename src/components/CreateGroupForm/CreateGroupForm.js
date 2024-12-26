import { Stack } from "@mui/joy";
import TextInput from "../common/fields/TextInput";
import FormWizard, { FormWizardStep } from "../common/forms/FormWizard";
import FarmerSelect from "../common/fields/FarmerSelect";
import Textarea from "../common/fields/Textarea";
import LocalSelect from "../common/fields/LocalSelect";

export default function CreateGroupForm() {
  return (
    <FormWizard
      steps={{ 1: "Group Details", 2: "Assign Admin", 3: "Add Members" }}
      onSubmit={(values) => console.log(values)}
    >
      <FormWizardStep stepIndex={1}>
        <TextInput name="name" label="Name" containerSx={{ marginBottom: 1 }} />
        <TextInput
          name="email"
          label="Email"
          type="email"
          containerSx={{ marginBottom: 1 }}
        />
        <TextInput
          name="address"
          label="Address"
          containerSx={{ marginBottom: 1 }}
        />
        <TextInput
          name="website"
          label="Website"
          containerSx={{ marginBottom: 1 }}
        />
        <LocalSelect
          label="What kind of group is this?"
          name="type"
          defaultValue="SACCO"
          options={["SACCO", "COOPERATIVE", "OTHER"]}
          sx={{ marginBottom: 1 }}
        ></LocalSelect>
        <Textarea name="description" label="Tell us more about this group" />
      </FormWizardStep>

      <FormWizardStep stepIndex={2}>
        <Stack direction={{ sm: "column", md: "row" }} sx={{ marginBottom: 1 }}>
          <TextInput
            name="firstName"
            label="First name"
            containerSx={{ flex: "1 1 auto" }}
          />
          <TextInput
            name="lastName"
            label="Last name"
            containerSx={{
              marginTop: { sm: 1, md: 0 },
              marginLeft: { sm: 0, md: 1 },
              flex: "1 1 auto",
            }}
          />
        </Stack>
        <TextInput
          name="phoneNumber"
          label="Phone number"
          containerSx={{ marginBottom: 1 }}
        />
        <TextInput
          name="address"
          label="Address"
          containerSx={{ marginBottom: 1 }}
        />
      </FormWizardStep>
      <FormWizardStep stepIndex={3}>
        <FarmerSelect name="farmers" label="Select farmers" />
      </FormWizardStep>
    </FormWizard>
  );
}
