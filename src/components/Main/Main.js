import { Box } from "@mui/joy";
import { Outlet } from "react-router";
import Header from "../Header/Header";
import Nav from "../Nav/Nav";
import ToolBar from "../ToolBar/ToolBar";

export default function Main() {
  return (
    <>
      <Box
        sx={{ paddingTop: 2, marginBottom: 5, paddingRight: 2, paddingLeft: 2 }}
      >
        <Header />
      </Box>
      <Box marginBottom={4} sx={{ marginLeft: { xs: 3, sm: 4, md: 5 } }}>
        <Nav />
      </Box>

      <Box
        sx={{
          paddingLeft: { xs: 3, sm: 4, md: 5 },
          paddingRight: { xs: 3, sm: 4, md: 5 },
        }}
      >
        <ToolBar
          sx={{ position: "fixed", bottom: 80, right: 50, zIndex: "popup" }}
        />
        <Outlet />
      </Box>
    </>
  );
}
