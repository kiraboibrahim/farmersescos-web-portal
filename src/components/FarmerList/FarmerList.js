import {
  AspectRatio,
  Avatar,
  Box,
  Card,
  CardContent,
  IconButton,
  Typography,
  Link,
  MenuButton,
  Dropdown,
  MenuItem,
  Menu,
  Grid,
} from "@mui/joy";
import { Link as RouterLink } from "react-router-dom";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useGetFarmersQuery } from "../../services/farmer";

function FarmerItem({ farmer }) {
  return (
    <Card size="sm">
      <CardContent orientation="horizontal">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={`${process.env.REACT_APP_MEDIA_BASE_URL}/${farmer.profilePhoto}`}
            sx={{ marginRight: 1 }}
          >
            {farmer.name}
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
              to={`/farmers/${farmer.id}`}
              underline="none"
              color="neutral"
              overlay
            >
              {`${farmer.firstName} ${farmer.lastName}`}
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
          src={`${process.env.REACT_APP_MEDIA_BASE_URL}/${farmer.coverPhoto}`}
          alt={farmer.name}
        />
      </AspectRatio>
      <Typography
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
        level="body-xs"
      >
        {farmer.farmDescription}
      </Typography>
    </Card>
  );
}

export default function FarmerList() {
  const { data: farmers, error, isLoading } = useGetFarmersQuery();

  return !!error ? (
    <Typography>{error}</Typography>
  ) : isLoading ? (
    <Typography>Loading...</Typography>
  ) : !!farmers ? (
    <Grid container spacing={1}>
      {farmers.data.map((farmer) => (
        <Grid
          key={farmer.id}
          size={{ xs: 12, sm: 6, md: 3 }}
          flexGrow={1}
          flexBasis={250}
        >
          <FarmerItem farmer={farmer} />
        </Grid>
      ))}
    </Grid>
  ) : null;
}
