import { Box, CircularProgress } from "@mui/joy";
export default function Loading({ size = "md" }) {
  let height;
  switch (size) {
    case "sm":
      height = 30;
      break;
    case "md":
      height = 70;
      break;
    default:
      height = 150;
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height,
      }}
    >
      <CircularProgress size={size} color="success" />
    </Box>
  );
}
