import { Box } from "@mui/joy";
export default function Empty({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 150,
      }}
    >
      {children}
    </Box>
  );
}
