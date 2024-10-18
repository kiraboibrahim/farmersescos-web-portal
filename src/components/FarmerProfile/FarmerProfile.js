import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Sheet,
  Stack,
  Typography,
} from "@mui/joy";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import { useParams } from "react-router";
import { useGetFarmerQuery } from "../../services/farmer";
import Loading from "../common/utils/Loading";
import TextInput from "../common/forms/TextInput";
import CSVInput from "../common/forms/CSVInput";
import Textarea from "../common/forms/Textarea";
import { Form } from "formik";
import DirtyFormik from "../common/forms/DirtyFormik";
import { useState } from "react";
import resolvePhotoSrc from "../../utils/resolve-photo-src";

export default function FarmerProfile() {
  const [isDirty, setIsDirty] = useState(false);
  const { id: farmerId } = useParams();
  const { data: farmer, error, isFetching } = useGetFarmerQuery(farmerId);

  if (!!error) {
    return <Typography>{error}</Typography>;
  }
  if (isFetching) {
    return <Loading />;
  }
  if (!!farmer) {
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
              <img
                src={resolvePhotoSrc(farmer.coverPhoto)}
                alt={farmer.firstName}
              />
            </AspectRatio>
            <Avatar
              size="lg"
              variant="solid"
              src={resolvePhotoSrc(farmer.profilePhoto)}
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
            ...farmer,
          }}
          onDirty={(isDirty) => setIsDirty(isDirty)}
        >
          <Form>
            <Box sx={{ marginTop: 4 }}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextInput
                  containerSx={{ flexGrow: 1 }}
                  name="firstName"
                  label="First name"
                />
                <TextInput
                  containerSx={{ flexGrow: 1 }}
                  label="Last name"
                  name="lastName"
                />
              </Stack>
              <TextInput
                containerSx={{ marginTop: 2 }}
                label="Phone number"
                name="phoneNumber"
                endDecorator={
                  farmer.isPhoneNumberVerified ? (
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
                  label="Latitude"
                  name="latitude"
                />
                <TextInput
                  containerSx={{ flexGrow: 1 }}
                  label="Longitude"
                  name="longitude"
                />
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ marginTop: 3 }}
              >
                <TextInput
                  containerSx={{ flexGrow: 1 }}
                  label="Farm name"
                  name="farmName"
                  value={farmer.farmName}
                />

                <TextInput
                  containerSx={{ flexGrow: 1 }}
                  label="Farm size"
                  name="farmSize"
                />

                <TextInput
                  containerSx={{ flexGrow: 1 }}
                  label="Farm date"
                  name="farmEstablishedOn"
                  type="date"
                />
              </Stack>
              <CSVInput
                containerSx={{ marginTop: 2 }}
                label="Crops"
                name="cropsGrown"
              />

              <CSVInput
                containerSx={{ marginTop: 2 }}
                label="Animals"
                name="animalsKept"
              />
              <Textarea
                containerSx={{ marginTop: 2 }}
                sx={{ fontSize: "sm" }}
                label="Farm description"
                name="farmDescription"
              />
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
                  disabled={!isDirty}
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
                  disabled={!isDirty}
                  loading={false}
                  loadingPosition="start"
                >
                  Save
                </Button>
              </Stack>
            </Box>
          </Form>
        </DirtyFormik>
      </Box>
    );
  }
}
