import { FormControl, FormHelperText, FormLabel, Input, Stack } from "@mui/joy";
import { useField, ErrorMessage } from "formik";

export default function UGPhoneNumberInput({ name, label, sx = [], ...props }) {
  const [field, { touched, error, value }, { setValue }] = useField({
    name,
    ...props,
  });
  const getValue = () => {
    console.log(value);
    return !!value ? value : "";
  };
  const hasError = touched && !!error;
  const formatValue = () => {
    /*const firstPart = getValue().substr(0, 3).trim();
    const secondPart = getValue().substr(3, 6).trim();
    const thirdPart = getValue().substr(6, 9).trim();

    return [firstPart, secondPart, thirdPart].join(" "); */
    console.log(value);
  };
  const formattedValue = formatValue();
  return (
    <>
      <Stack direction="row" sx={[Array.isArray(sx) ? sx : [sx]]} {...props}>
        <Input
          sx={{ flex: "0 0 auto" }}
          disabled
          name="prefix"
          defaultValue="+256"
        />
        <FormControl error={hasError} sx={{ flex: "1 1 auto" }}>
          <Input
            name={name}
            value={formattedValue}
            onChange={({ target }) => setValue(target.value)}
          />
        </FormControl>
      </Stack>
      <FormHelperText sx={{ fontSize: "sm" }}>
        <ErrorMessage name={name} />
      </FormHelperText>
    </>
  );
}
