import {
  FormControl,
  FormHelperText,
  FormLabel,
  Textarea as JoyTextarea,
} from "@mui/joy";
import { useField } from "formik";

export default function Textarea({ sx = [], name, label, ...props }) {
  const [field, { touched, error }] = useField({ name, ...props });
  const hasError = touched && !!error;

  return (
    <FormControl
      sx={[{ width: "100%" }, ...(Array.isArray(sx) ? sx : [sx])]}
      error={hasError}
    >
      <FormLabel htmlFor={props.id || props.label}>{label}</FormLabel>
      <JoyTextarea
        {...field}
        {...props}
        sx={{ fontSize: "sm", color: "neutral" }}
      />

      {hasError && (
        <FormHelperText sx={{ fontSize: "sm" }}>{error}</FormHelperText>
      )}
    </FormControl>
  );
}
