import { Input as JoyInput } from "@mui/joy";

export default function Input({ sx = [], ...rest }) {
  return (
    <JoyInput
      {...rest}
      sx={[
        ...(Array.isArray(sx) ? sx : [sx]),
        { fontSize: "sm", color: "neutral", width: "100%" },
      ]}
    />
  );
}
