import {
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
  Option,
} from "@mui/joy";
import { useField, ErrorMessage } from "formik";

export default function LocalSelect({
  name,
  label,
  sx = [],
  options,
  defaultValue = null,
  multiple,
  ...props
}) {
  const [, { value: selectedOptions, touched, error }, { setValue }] = useField(
    { name, ...props }
  );

  const hasError = touched && !!error;

  function selectOption(option) {
    return !!multiple
      ? setValue([...selectedOptions, option])
      : setValue(option);
  }
  return (
    <FormControl sx={Array.isArray(sx) ? sx : [sx]} error={hasError}>
      <FormLabel>{label}</FormLabel>
      <Select
        name={name}
        multiple={!!multiple}
        defaultValue={defaultValue}
        onChange={(event, option) => selectOption(option)}
        {...props}
      >
        {options.map((option, index) => (
          <Option value={option} key={index}>
            {option}
          </Option>
        ))}
      </Select>
      <FormHelperText sx={{ fontSize: "sm" }}>
        <ErrorMessage name={name} />
      </FormHelperText>
    </FormControl>
  );
}
