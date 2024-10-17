import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/joy";
import { NavLink as RouterLink, Outlet, useParams } from "react-router-dom";
import { useGetFarmerQuery } from "../../services/farmer";
import Loading from "../common/utils/Loading";
import Error from "../common/utils/Error";

export default function FarmerDetail() {
  const { id: farmerId } = useParams();
  const { data: farmer, error, isFetching } = useGetFarmerQuery(farmerId);
  if (!!error) {
    return <Error error={error} />;
  }
  if (isFetching) {
    return <Loading />;
  }

  if (!!farmer) {
    return (
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

              <Box level="body-xs" sx={{ marginTop: 1 }}>
                {farmer.cropsGrown.split(",").map((crop) => (
                  <Chip size="sm" color="success" sx={{ marginRight: 1 }}>
                    {crop}
                  </Chip>
                ))}
              </Box>
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
          <Chip
            component={RouterLink}
            to={`/farmers/${farmer.id}/recommendations`}
            size="md"
          >
            Recommendations
          </Chip>
        </Stack>
        <Box sx={{ marginTop: 3, padding: { xs: 1, sm: 2 } }}>
          <Outlet />
        </Box>
      </>
    );
  }
}
