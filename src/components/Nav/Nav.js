import { Box, Chip, Input, IconButton, Stack, AspectRatio } from "@mui/joy";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import { NavLink as RouterLink } from "react-router-dom";
import { Outlet } from "react-router";
import logo from "../../assets/logo.jpg";
import "./Nav.css";

export default function Nav() {
  return (
    <>
      <Box
        sx={{ paddingTop: 2, marginBottom: 5, paddingRight: 2, paddingLeft: 2 }}
      >
        <Stack direction="row">
          <AspectRatio sx={{ width: 100 }}>
            <img src={logo} alt="IMEU logo" />
          </AspectRatio>
          <Input
            variant="soft"
            sx={{
              borderRadius: "md",
              marginLeft: "auto",
              marginRight: "auto",
              flexBasis: "40%",
              alignSelf: "center",
              padding: 1,
            }}
            placeholder="Search"
            endDecorator={
              <IconButton>
                <SearchOutlinedIcon />
              </IconButton>
            }
          />
          <IconButton size="lg" sx={{ alignSelf: "center" }}>
            <ManageAccountsOutlinedIcon />
          </IconButton>
        </Stack>
      </Box>

      <Box marginBottom={4} sx={{ marginLeft: 3 }}>
        <Chip
          sx={{ marginRight: 5 }}
          size="lg"
          component={RouterLink}
          to="products"
        >
          Products
        </Chip>
        <Chip
          sx={{ marginRight: 5 }}
          size="lg"
          component={RouterLink}
          to="escos"
        >
          Escos
        </Chip>
        <Chip size="lg" component={RouterLink} to="farmers">
          Farmers
        </Chip>
      </Box>
      <Box sx={{ paddingLeft: 5, paddingRight: 5 }}>
        <Outlet />
      </Box>
    </>
  );
}
