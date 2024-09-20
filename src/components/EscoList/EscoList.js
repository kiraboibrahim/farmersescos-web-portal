import {
  AspectRatio,
  Avatar,
  Box,
  Card,
  CardContent,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  Dropdown,
  MenuButton,
  Link,
  Grid,
} from "@mui/joy";
import { Link as RouterLink } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useGetEscosQuery } from "../../services/esco";

function EscoItem({ esco }) {
  return (
    <Card size="sm">
      <CardContent orientation="horizontal">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={`${process.env.REACT_APP_MEDIA_BASE_URL}/${esco.profilePhoto}`}
            sx={{ marginRight: 1 }}
          >
            {esco.name}
          </Avatar>
          <Typography
            level="body-sm"
            sx={{
              width: 120,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontWeight: "bold",
            }}
          >
            <Link
              component={RouterLink}
              to={`/escos/${esco.id}`}
              overlay
              underline="none"
              color="neutral"
            >
              {esco.name}
            </Link>
          </Typography>
        </Box>
        <Box sx={{ marginLeft: "auto" }}>
          <Dropdown>
            <MenuButton slots={{ root: IconButton }}>
              <MoreVertIcon />
            </MenuButton>
            <Menu>
              <MenuItem>
                <Typography
                  level="body-sm"
                  startDecorator={<ModeEditOutlinedIcon />}
                >
                  Edit
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography
                  level="body-sm"
                  startDecorator={<DeleteOutlinedIcon />}
                >
                  Delete
                </Typography>
              </MenuItem>
            </Menu>
          </Dropdown>
        </Box>
      </CardContent>
      <AspectRatio>
        <img
          src={`${process.env.REACT_APP_MEDIA_BASE_URL}/${esco.coverPhoto}`}
          alt={esco.name}
        />
      </AspectRatio>
    </Card>
  );
}

export default function EscoList() {
  const { data: escos, error, isLoading } = useGetEscosQuery();

  return isLoading ? (
    <Typography>Loading...</Typography>
  ) : !!error ? (
    <Typography>{error}</Typography>
  ) : !!escos ? (
    <Grid container spacing={1}>
      {escos.data.map((esco) => (
        <Grid
          key={esco.id}
          size={{ xs: 12, sm: 6, md: 3 }}
          flexGrow={1}
          flexBasis={250}
        >
          <EscoItem esco={esco} />
        </Grid>
      ))}
    </Grid>
  ) : null;
}
