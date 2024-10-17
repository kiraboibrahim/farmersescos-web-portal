import {
  Box,
  Stack,
  AspectRatio,
  Avatar,
  Dropdown,
  MenuButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/joy";
import logo from "../../assets/logo.jpg";
import { useAuth } from "../../hooks/useAuth";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/auth";
import SearchBar from "../SearchBar/SearchBar";

export default function Header() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  return (
    <Stack direction="row">
      <AspectRatio sx={{ width: 100 }}>
        <img src={logo} alt="IMEU logo" />
      </AspectRatio>
      <SearchBar
        variant="soft"
        containersx={{
          alignSelf: "center",
          display: "flex",
          flexGrow: 2,
        }}
        sx={{
          borderRadius: "lg",
          padding: 1,
          width: { xs: "60%", sm: "50%" },
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />

      <Box sx={{ alignSelf: "center" }}>
        <Dropdown>
          <MenuButton
            size="sm"
            slots={{ root: Avatar }}
            sx={{ cursor: "pointer" }}
          >
            {`${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`}
          </MenuButton>
          <Menu>
            <MenuItem>
              <Typography
                level="body-sm"
                startDecorator={<SettingsOutlinedIcon />}
              >
                Settings
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => dispatch(logout())}>
              <Typography
                level="body-sm"
                startDecorator={<LogoutOutlinedIcon />}
              >
                Log out
              </Typography>
            </MenuItem>
          </Menu>
        </Dropdown>
      </Box>
    </Stack>
  );
}
