import { FormControl, FormHelperText, FormLabel, Input } from "@mui/joy";
import { useField } from "formik";

export default function TextInput({ name, label, sx = [], ...props }) {
  const [field, { touched, error }] = useField({ name, ...props });
  const hasError = touched && !!error;
  return (
    <FormControl
      error={hasError}
      sx={[{ width: "100%" }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <FormLabel htmlFor={props.id || props.label}>{label}</FormLabel>
      <Input
        {...field}
        {...props}
        sx={{ fontSize: "sm", color: "neutral", width: "100%" }}
      />
      {hasError && (
        <FormHelperText sx={{ fontSize: "sm" }}>{error}</FormHelperText>
      )}
    </FormControl>
  );
}
