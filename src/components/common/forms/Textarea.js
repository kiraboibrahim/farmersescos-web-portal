import {
  FormControl,
  FormHelperText,
  FormLabel,
  Textarea as JoyTextarea,
} from "@mui/joy";
import { useField } from "formik";

export default function Textarea({ sx = [], label, containerSx, ...props }) {
  const [field, meta] = useField(props);
  return (
    <FormControl sx={containerSx} error={!!(meta.touched && meta.error)}>
      <FormLabel htmlFor={props.id || props.label}>{label}</FormLabel>
      <JoyTextarea
        {...field}
        {...props}
        sx={[
          ...(Array.isArray(sx) ? sx : [sx]),
          { fontSize: "sm", color: "neutral", width: "100%" },
        ]}
      />
      {!!(meta.touched && meta.error) && (
        <FormHelperText sx={{ fontSize: "sm" }}>{meta.error}</FormHelperText>
      )}
    </FormControl>
  );
}
