import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Sheet,
  Stack,
} from "@mui/joy";
import { useParams } from "react-router";
import Loading from "../common/utils/Loading";
import { useGetEscoQuery, useUpdateEscoMutation } from "../../services/esco";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import TextInput from "../common/forms/TextInput";
import { Form } from "formik";
import CSVInput from "../common/forms/CSVInput";
import EscoProfileSchema from "../../validation-schemas/esco/EscoProfile.schema";
import { toast } from "react-toastify";
import difference from "../../utils/difference";
import isEmpty from "../../utils/isEmpty";
import parseError from "../common/utils/parse-error";
import DirtyFormik from "../common/forms/DirtyFormik";
import { useState } from "react";
import resolvePhotoSrc from "../../utils/resolve-photo-src";

export default function EscoProfile() {
  const { id: escoId } = useParams();
  const [isDirty, setIsDirty] = useState(false);
  const {
    data: esco,
    error: escoFetchError,
    isFetching: isEscoFetchPending,
  } = useGetEscoQuery(escoId);
  const [
    updateEsco,
    {
      isLoading: isEscoUpdatePending,
      isError: isEscoUpdateFailed,
      error: updateEscoError,
      isSuccess: isEscoUpdateSuccess,
    },
  ] = useUpdateEscoMutation();
  if (isEscoUpdateFailed) {
    toast.error(parseError(updateEscoError));
  }
  if (isEscoUpdateSuccess) {
    toast.success("Profile updated");
  }
  if (!!escoFetchError) {
    toast.error(escoFetchError?.message || `${escoFetchError}`);
  }
  if (isEscoFetchPending) {
    return <Loading />;
  }
  if (!!esco) {
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
        <Sheet
          sx={{
            display: "flex",
            justifyContent: "center",
            borderRadius: "md",
          }}
          variant="soft"
          color="success"
        >
          <Box sx={{ width: 400, position: "relative" }}>
            <AspectRatio variant="plain">
              <img src={resolvePhotoSrc(esco.coverPhoto)} alt={esco.name} />
            </AspectRatio>
            <Avatar
              size="lg"
              variant="solid"
              src={resolvePhotoSrc(esco.profilePhoto)}
              sx={{
                position: "absolute",
                left: 10,
                bottom: -20,
              }}
            ></Avatar>
          </Box>
        </Sheet>
        <ButtonGroup
          variant="soft"
          color="warning"
          buttonFlex={1}
          sx={{ marginTop: 4 }}
        >
          <Button startDecorator={<DeleteOutlinedIcon />}>Delete</Button>

          <Button startDecorator={<LockResetOutlinedIcon />}>Reset</Button>
        </ButtonGroup>

        <DirtyFormik
          initialValues={{
            name: esco.name,
            email: esco.email,
            phoneNumber: esco.phoneNumber,
            website: esco.website,
            latitude: esco.latitude,
            longitude: esco.longitude,
            address: esco.address,
            incorporationDate: esco.incorporationDate,
            specialization: esco.specialization,
          }}
          validationSchema={EscoProfileSchema}
          onSubmit={async (values) => {
            // Submit only values that were updated
            const updatedValues = difference(esco, values);
            if (!isEmpty(updatedValues)) {
              await updateEsco({ escoId, ...updatedValues });
            }
          }}
          onDirty={(isDirty) => setIsDirty(isDirty)}
        >
          <Form>
            <Box sx={{ marginTop: 4 }}>
              <TextInput name="name" label="Name" />
              <TextInput
                containerSx={{ marginTop: 2 }}
                name="phoneNumber"
                label="Phone number"
              />
              <TextInput
                containerSx={{ marginTop: 2 }}
                name="website"
                label="Website"
              />
              <TextInput
                containerSx={{ marginTop: 2 }}
                label="Email"
                name="email"
                endDecorator={
                  esco.isEmailVerified ? (
                    <VerifiedOutlinedIcon color="success" />
                  ) : (
                    <Button variant="soft" size="sm" color="danger">
                      Verify
                    </Button>
                  )
                }
              />
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ marginTop: 2 }}
              >
                <TextInput
                  containerSx={{ flexGrow: 1 }}
                  name="latitude"
                  label="Latitude"
                />
                <TextInput
                  containerSx={{ flexGrow: 1 }}
                  name="longitude"
                  label="Longitude"
                />
                <TextInput
                  containerSx={{ flexGrow: 1 }}
                  name="address"
                  label="Address"
                />
              </Stack>
              <TextInput
                containerSx={{ marginTop: 2 }}
                name="incorporationDate"
                label="Incorporation Date"
                type="date"
              />
              <CSVInput
                containerSx={{ marginTop: 2 }}
                name="specialization"
                label="Specialization"
              />
            </Box>
            <Stack
              direction="row"
              sx={{
                marginTop: 3,
                width: "100%",
                position: "sticky",
                bottom: 0,
                zIndex: "tooltip",
              }}
            >
              <Button
                sx={{ flexGrow: 1 }}
                type="reset"
                size="md"
                variant="soft"
                color="success"
                disabled={!isDirty || isEscoUpdatePending}
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
                disabled={!isDirty || isEscoUpdatePending}
                loading={isEscoUpdatePending}
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
