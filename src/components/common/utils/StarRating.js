import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Stack } from "@mui/joy";

export default function StarRating({ value }) {
  return (
    <Stack direction="row">
      {Array.from({ length: 5 }).map((_, index) => {
        return (
          <StarBorderIcon
            fontSize="lg"
            variant="solid"
            color={index + 1 <= value ? "warning" : "neutral"}
            fill="warning"
          />
        );
      })}
    </Stack>
  );
}