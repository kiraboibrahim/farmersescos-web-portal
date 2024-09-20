import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Box,
  Stack,
} from "@mui/joy";
import { NavLink as RouterLink, useParams } from "react-router-dom";
import { useGetEscoByIdQuery } from "../../services/esco";

export default function EscoDetail() {
  const { id: escoId } = useParams();
  const { data: esco, error, isLoading } = useGetEscoByIdQuery(escoId);
  return !!error ? (
    <Typography>{error}</Typography>
  ) : isLoading ? (
    <Typography>Loading...</Typography>
  ) : !!esco ? (
    <>
      <Card orientation="horizontal" sx={{ marginBottom: 5 }}>
        <CardContent orientation="horizontal">
          <Avatar
            size="lg"
            src={`${process.env.REACT_APP_MEDIA_BASE_URL}/${esco.profilePhoto}`}
          >
            {esco.name}
          </Avatar>
          <Box>
            <Typography level="h3">{esco.name}</Typography>
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
    </>
  ) : null;
}
