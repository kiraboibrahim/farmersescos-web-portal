import {
  Box,
  Chip,
  ChipDelete,
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  Input,
} from "@mui/joy";
import { useState, useCallback } from "react";
import { useField } from "formik";

export default function CSVChippedSelect({
  name,
  label,
  options = [],
  sx = [],
  isDynamic = false,
  ...props
}) {
  const [newOption, setNewOption] = useState("");
  const [, { value: selectedOptions, error, touched }, { setValue }] = useField(
    {
      name,
      ...props,
    }
  );
  const hasError = touched && !!error;

  const getSelectedOptions = useCallback(() => {
    return selectedOptions || "";
  }, [selectedOptions]);

  function getOptions() {
    return Array.from(
      new Set([...options, ...fromCSVToArray(getSelectedOptions())])
    );
  }
  function fromCSVToArray(csv) {
    return csv
      .split(",")
      .map((v) => v.trim())
      .filter((v) => !!v.length);
  }

  function fromArrayToCSV(arr) {
    return arr
      .map((v) => v.trim())
      .filter((v) => !!v.length)
      .join(",");
  }

  function isOptionSelected(option) {
    return fromCSVToArray(getSelectedOptions())
      .map((selectedOption) => selectedOption.toLowerCase())
      .includes(option.toLowerCase());
  }

  const unSelectOption = (option) => {
    setValue(
      fromArrayToCSV(
        fromCSVToArray(getSelectedOptions()).filter((v) => v !== option)
      )
    );
  };
  const selectOption = (option) => {
    if (isOptionSelected(option)) return;
    setValue(fromArrayToCSV([...fromCSVToArray(getSelectedOptions()), option]));
  };
  return (
    <FormControl sx={Array.isArray(sx) ? sx : [sx]} error={hasError}>
      <FormLabel>{label}</FormLabel>
      <Box sx={{ marginTop: 1 }}>
        <Box sx={{ diplay: "flex", flexWrap: "wrap" }}>
          {getOptions().map((option, index) => {
            const _isOptionSelected = isOptionSelected(option);
            return _isOptionSelected ? (
              <Chip
                key={index}
                color="success"
                size="sm"
                sx={{ marginRight: 2, marginBottom: 1 }}
                endDecorator={
                  <ChipDelete onClick={() => unSelectOption(option)} />
                }
              >
                {option}
              </Chip>
            ) : (
              <Chip
                key={index}
                color="secondary"
                size="sm"
                sx={{ marginRight: 2, marginBottom: 1 }}
                onClick={() => selectOption(option)}
              >
                {option}
              </Chip>
            );
          })}
        </Box>
        {isDynamic && (
          <Input
            size="sm"
            value={newOption}
            onChange={({ target }) => setNewOption(target.value)}
            endDecorator={
              <Button
                variant="soft"
                color="success"
                onClick={() => {
                  !!newOption.trim().length && selectOption(newOption);
                }}
              >
                Add
              </Button>
            }
          />
        )}
      </Box>

      {hasError && (
        <FormHelperText sx={{ fontSize: "sm" }}>{error}</FormHelperText>
      )}
    </FormControl>
  );
}
