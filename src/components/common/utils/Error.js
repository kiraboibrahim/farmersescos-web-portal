import { Sheet, Typography } from "@mui/joy";
import parseError from "./parse-error";

export default function Error({ error }) {
  console.log(error);
  return (
    <Sheet
      sx={{
        width: 1,
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "md",
      }}
      variant="soft"
      color="danger"
    >
      <Typography level="body-sm">{parseError(error)}</Typography>
    </Sheet>
  );
}
