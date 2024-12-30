import TextInput from "../common/fields/TextInput";
import FormWizard, { FormWizardStep } from "../common/forms/FormWizard";
import FarmerSelect from "../common/fields/FarmerSelect";
import Textarea from "../common/fields/Textarea";
import LocalSelect from "../common/fields/LocalSelect";
import {
  GroupDetailsSchema,
  GroupMembersSchema,
} from "../../validation-schemas/group/GroupProfileSchema";
import useCreateGroup from "../../hooks/useCreateGroup";
import AgroProcessorSelect from "../common/fields/AgroProcessorSelect";

export default function CreateGroupForm() {
  const [createGroup] = useCreateGroup();

  return (
    <FormWizard
      steps={{ 1: "Group Details", 2: "Add Members" }}
      onSubmit={async (values) => await createGroup(values)}
    >
      <FormWizardStep stepIndex={1} validationSchema={GroupDetailsSchema}>
        <TextInput name="name" label="Name" sx={{ marginBottom: 2 }} />
        <TextInput
          name="email"
          label="Email"
          type="email"
          sx={{ marginBottom: 2 }}
        />
        <TextInput
          name="phoneNumber"
          label="Phone number"
          sx={{ marginBottom: 2 }}
        />
        <TextInput name="address" label="Address" sx={{ marginBottom: 2 }} />
        <TextInput name="website" label="Website" sx={{ marginBottom: 2 }} />
        <LocalSelect
          label="What kind of group is this?"
          name="type"
          defaultValue="SACCO"
          options={["SACCO", "COOPERATIVE", "OTHER"]}
          sx={{ marginBottom: 2 }}
        ></LocalSelect>
        <Textarea name="description" label="Tell us more about this group" />
      </FormWizardStep>
      <FormWizardStep
        stepIndex={2}
        validationSchema={GroupMembersSchema}
        isOptional={true}
      >
        <FarmerSelect
          name="farmers"
          label="Select farmers"
          placeholder="Search farmers"
          sx={{ marginBottom: 2 }}
        />

        <AgroProcessorSelect
          name="agroProcessors"
          label="Select agro processors"
          placeholders="Search agro processors"
        />
      </FormWizardStep>
    </FormWizard>
  );
}
