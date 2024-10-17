import { FormControl, FormLabel, Box, FormHelperText } from "@mui/joy";
import AsyncSelect from "react-select/async";
import { useField } from "formik";
import { useTheme } from "@mui/joy/styles";

const SELECT_OPTION_ACTION = "select-option";
const REMOVE_OPTION_ACTION = "remove-value";

export default function Select({
  defaultOptions = true,
  getOptions,
  getOptionLabel,
  getOptionValue,
  isMulti,
  placeholder,
  containerSx,
  ...props
}) {
  const theme = useTheme();
  const [
    ,
    { value: selectedOptions, touched, error },
    { setValue, setError, setTouched },
  ] = useField(props);

  const { label } = props;

  function handleAction(action, option) {
    setTouched(true);
    switch (action) {
      case SELECT_OPTION_ACTION:
        return addOption(option);
      case REMOVE_OPTION_ACTION:
        return removeOption(option);
      default:
        return setError("Unknown action performed");
    }
  }

  function removeOption(option) {
    setValue(
      selectedOptions.filter(
        (selectedOption) =>
          getOptionValue(selectedOption) !== getOptionValue(option)
      )
    );
  }
  function addOption(option) {
    // Before adding an option, filter to remove any duplicates of the option that might be selected
    setValue(
      selectedOptions
        .filter(
          (selectedOption) =>
            getOptionValue(selectedOption) !== getOptionValue(option)
        )
        .concat([option])
    );
  }

  return (
    <FormControl sx={containerSx} error={!!(touched && error)}>
      <FormLabel>{label}</FormLabel>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <AsyncSelect
          isMulti={isMulti}
          loadOptions={getOptions}
          defaultOptions={defaultOptions}
          value={selectedOptions}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          isClearable={false}
          onChange={(newValue, actionType) => {
            const { action, option, removedValue } = actionType;
            return handleAction(action, option || removedValue);
          }}
          placeholder={placeholder}
          /* Hide the multi value container in order to use the select just like a search field */
          styles={{
            container: (baseCss) => ({
              ...baseCss,
              display: "inline-block",
              flexGrow: 1,
            }),
            control: (baseCss) => ({
              ...baseCss,
              border: error
                ? `1px solid ${theme.palette.danger.outlinedBorder}`
                : baseCss?.border,
            }),
          }}
        />
      </Box>
      {!!(touched && error) && (
        <FormHelperText sx={{ fontSize: "sm" }}>{error}</FormHelperText>
      )}
    </FormControl>
  );
}
