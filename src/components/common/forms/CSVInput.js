import { useField } from "formik";
import {
  Box,
  Button,
  Chip,
  ChipDelete,
  FormControl,
  FormLabel,
  Input,
} from "@mui/joy";
import { useState } from "react";

export default function CSVInput({ sx = [], containerSx, label, ...props }) {
  const [newValue, setNewValue] = useState("");
  const [{ value: values }, , { setValue }] = useField(props);
  const removeValue = async (value) => {
    await setValue(
      [
        ...values
          .split(",")
          .map((v) => v.trim())
          .filter((v) => v !== value),
      ].join(",")
    );
  };
  const addValue = async (value) => {
    if (!value) return;
    await setValue(
      [...values.split(",").map((v) => v.trim()), value].join(",")
    );
    setNewValue("");
  };
  return (
    <FormControl sx={containerSx}>
      <FormLabel>{label}</FormLabel>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Box sx={{ marginBottom: 1 }}>
          {values.split(",").map((value, index) => {
            return !!value ? (
              <Chip
                key={index}
                color="success"
                size="sm"
                sx={{ marginRight: 2 }}
                endDecorator={<ChipDelete onClick={() => removeValue(value)} />}
              >
                {value}
              </Chip>
            ) : (
              <></>
            );
          })}
        </Box>
        <Input
          size="sm"
          value={newValue}
          sx={{ borderRadius: "lg" }}
          onChange={({ target }) => setNewValue(target.value)}
          endDecorator={
            <Button
              variant="soft"
              color="success"
              sx={{ borderRadius: "lg" }}
              onClick={() => addValue(newValue)}
            >
              Add
            </Button>
          }
        />
      </Box>
    </FormControl>
  );
}
