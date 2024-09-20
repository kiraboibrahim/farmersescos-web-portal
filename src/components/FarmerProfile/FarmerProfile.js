import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Chip,
  ChipDelete,
  FormControl,
  FormLabel,
  Sheet,
  Stack,
  Textarea,
  ButtonGroup,
  Typography,
} from "@mui/joy";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import Input from "../common/Input";
import { useParams } from "react-router";
import { useGetFarmerByIdQuery } from "../../services/farmer";

export default function FarmerProfile() {
  const { id: farmerId } = useParams();
  const { data: farmer, error, isLoading } = useGetFarmerByIdQuery(farmerId);

  return !!error ? (
    <Typography>{error}</Typography>
  ) : !!isLoading ? (
    <Typography>Loading...</Typography>
  ) : !!farmer ? (
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
              src={`${process.env.REACT_APP_MEDIA_BASE_URL}/${farmer.coverPhoto}`}
              alt={farmer.firstName}
            />
          </AspectRatio>
          <Avatar
            size="lg"
            variant="solid"
            src={`${process.env.REACT_APP_MEDIA_BASE_URL}/${farmer.profilePhoto}`}
            sx={{
              position: "absolute",
              left: 10,
              bottom: -20,
            }}
          ></Avatar>
        </Box>
      </Sheet>
      <ButtonGroup color="warning" buttonFlex={1} sx={{ marginTop: 4 }}>
        <Button startDecorator={<DeleteOutlinedIcon />}>Delete</Button>

        <Button startDecorator={<KeyOutlinedIcon />}>Reset Password</Button>
      </ButtonGroup>
      <Box sx={{ marginTop: 4 }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <FormControl sx={{ flexGrow: 1 }}>
            <FormLabel>First name</FormLabel>
            <Input value={farmer.firstName} />
          </FormControl>
          <FormControl sx={{ flexGrow: 1 }}>
            <FormLabel>Last name</FormLabel>
            <Input value={farmer.lastName} />
          </FormControl>
        </Stack>
        <FormControl sx={{ marginTop: 2 }}>
          <FormLabel>Phone number</FormLabel>
          <Input
            value={farmer.phoneNumber}
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
        </FormControl>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ marginTop: 2 }}
        >
          <FormControl sx={{ flexGrow: 1 }}>
            <FormLabel>Latitude</FormLabel>
            <Input value={farmer.latitude} />
          </FormControl>
          <FormControl
            sx={{
              flexGrow: 1,
            }}
          >
            <FormLabel>Longitude</FormLabel>
            <Input value={farmer.longitude} />
          </FormControl>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ marginTop: 3 }}
        >
          <FormControl sx={{ flexGrow: 1 }}>
            <FormLabel>Farm name</FormLabel>
            <Input value={farmer.farmName} />
          </FormControl>
          <FormControl sx={{ flexGrow: 1 }}>
            <FormLabel>Farm size(acres)</FormLabel>
            <Input value={farmer.farmSize} />
          </FormControl>
          <FormControl sx={{ flexGrow: 1 }}>
            <FormLabel>Farm date</FormLabel>
            <Input value={farmer.farmEstablishedOn} type="date" />
          </FormControl>
        </Stack>

        <Box sx={{ marginTop: 2 }}>
          <FormLabel>Crops</FormLabel>
          {farmer.cropsGrown.split(",").map((crop) => (
            <Chip
              color="success"
              sx={{ marginRight: 2 }}
              endDecorator={<ChipDelete />}
            >
              {crop}
            </Chip>
          ))}
        </Box>

        <Box sx={{ marginTop: 2 }}>
          <FormLabel>Animals</FormLabel>
          {farmer.animalsKept.split(",").map((animal) => (
            <Chip
              color="success"
              sx={{ marginRight: 2 }}
              endDecorator={<ChipDelete />}
            >
              {animal}
            </Chip>
          ))}
        </Box>
        <FormControl sx={{ marginTop: 2 }}>
          <FormLabel>Farm Description</FormLabel>
          <Textarea
            value={farmer.farmDescription}
            sx={{ fontSize: "sm" }}
          ></Textarea>
        </FormControl>
      </Box>
      <Button
        size="md"
        color="success"
        variant="soft"
        startDecorator={<SaveOutlinedIcon />}
        sx={{
          marginTop: 3,
          width: "100%",
          position: "sticky",
          bottom: 0,
          zIndex: "tooltip",
        }}
      >
        Save
      </Button>
    </Box>
  ) : null;
}
