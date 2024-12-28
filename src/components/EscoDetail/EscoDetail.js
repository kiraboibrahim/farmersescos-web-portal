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
import { useGetEscoQuery } from "../../services/esco";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import Loading from "../common/utils/Loading";
import Error from "../common/utils/Error";
import toTitleCase from "../../utils/toTitleCase";
import resolvePhotoSrc from "../../utils/resolve-photo-src";

export default function EscoDetail() {
  const { id: escoId } = useParams();
  const { data: esco, error, isFetching } = useGetEscoQuery(escoId);

  if (isFetching) {
    return <Loading />;
  }
  if (!!error) {
    return <Error error={error} />;
  }
  if (!!esco) {
    return (
      <>
        <Card sx={{ marginBottom: 5 }}>
          <CardContent orientation="horizontal">
            <Avatar size="lg" src={resolvePhotoSrc(esco.profilePhoto)}>
              {esco.name}
            </Avatar>
            <Box>
              <Typography level="h3">{toTitleCase(esco.name)}</Typography>
              <Box level="body-xs" sx={{ marginTop: 1, overflow: "hidden" }}>
                {esco.specialization.split(",").map((specialization, index) => (
                  <Chip
                    key={index}
                    size="sm"
                    color="success"
                    sx={{ marginRight: 1 }}
                  >
                    {specialization}
                  </Chip>
                ))}
              </Box>
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={1}
                sx={{ marginTop: 1, overflow: "hidden" }}
              >
                <Typography
                  level="body-xs"
                  startDecorator={<LocationOnOutlinedIcon />}
                >
                  {esco.address}
                </Typography>
                <Typography
                  level="body-xs"
                  startDecorator={<PhoneAndroidOutlinedIcon />}
                >
                  {esco.phoneNumber}
                </Typography>
              </Stack>
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
            to={`/escos/${esco.id}/profile`}
            sx={{ marginRight: 5 }}
            size="md"
          >
            Profile
          </Chip>
          <Chip
            component={RouterLink}
            to={`/escos/${esco.id}/products`}
            sx={{ marginRight: 5 }}
            size="md"
          >
            Products
          </Chip>
          <Chip
            component={RouterLink}
            to={`/escos/${esco.id}/offers`}
            sx={{ marginRight: 5 }}
            size="md"
          >
            Offers
          </Chip>
          <Chip
            component={RouterLink}
            to={`/escos/${esco.id}/installations`}
            sx={{ marginRight: 5 }}
            size="md"
          >
            Installations
          </Chip>
        </Stack>
        <Box sx={{ marginTop: 3, padding: { xs: 1, sm: 2 } }}>
          <Outlet />
        </Box>
      </>
    );
  }
}
