import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
} from "@mui/joy";
import { Outlet, NavLink as RouterLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetFarmerByIdQuery } from "../../services/farmer";

export default function FarmerDetail() {
  const { id: farmerId } = useParams();
  const { data: farmer, error, isLoading } = useGetFarmerByIdQuery(farmerId);
  return !!error ? (
    <Typography>{error}</Typography>
  ) : !!isLoading ? (
    <Typography>Loading...</Typography>
  ) : !!farmer ? (
    <>
      <Card orientation="horizontal" sx={{ marginBottom: 5 }}>
        <CardContent orientation="horizontal">
          <Avatar
            size="lg"
            src={`${process.env.REACT_APP_MEDIA_BASE_URL}/${farmer.profilePhoto}`}
          >
            {farmer.lastName}
          </Avatar>
          <Box>
            <Typography level="h3">{`${farmer.firstName} ${farmer.lastName}`}</Typography>

            <Typography level="body-xs" sx={{ marginTop: 1 }}>
              {farmer.cropsGrown.split(",").map((crop) => (
                <Chip size="sm" color="success" sx={{ marginRight: 1 }}>
                  {crop}
                </Chip>
              ))}
            </Typography>
            <Typography sx={{ marginTop: 1 }} level="body-sm">
              {farmer.farmDescription}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Stack
        direction="row"
        sx={{
          overflow: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "&": {
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          },
        }}
      >
        <Chip
          component={RouterLink}
          to={`/farmers/${farmer.id}/profile`}
          sx={{ marginRight: 5 }}
          size="md"
        >
          Profile
        </Chip>
        <Chip
          component={RouterLink}
          to={`/farmers/${farmer.id}/interests`}
          sx={{ marginRight: 5 }}
          size="md"
        >
          Interests
        </Chip>
        <Chip
          component={RouterLink}
          to={`/farmers/${farmer.id}/offers`}
          sx={{ marginRight: 5 }}
          size="md"
        >
          Offers
        </Chip>
        <Chip
          component={RouterLink}
          to={`/farmers/${farmer.id}/installations`}
          sx={{ marginRight: 5 }}
          size="md"
        >
          Installations
        </Chip>
      </Stack>
      <Box sx={{ marginTop: 3 }}>
        <Outlet />
      </Box>
    </>
  ) : null;
}
