import {
  Box,
  IconButton,
  Input,
  Stack,
  AspectRatio,
  Typography,
  MenuList,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  Chip,
  ChipDelete,
  FormHelperText,
} from "@mui/joy";
import useDebouncedInput from "../../../hooks/useDebouncedInput";
import { useCallback, useEffect, useRef, useState } from "react";
import { styled } from "@mui/joy/styles";
import { ClickAwayListener, Popper } from "@mui/material";
import { useLazyGetFarmersQuery } from "../../../services/farmer";
import resolvePhotoSrc from "../../../utils/resolve-photo-src";
import Loading from "../utils/Loading";
import isEmpty from "../../../utils/isEmpty";
import Empty from "../utils/Empty";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import { useField } from "formik";

const Popup = styled(Popper)({
  zIndex: 1000,
});

function FarmerItems({ farmers, isLoading, onSelect }) {
  const isLastFarmer = (index) => index === farmers.length - 1;
  return (
    <Box>
      <Stack direction="column">
        {isLoading && <Loading size="xs" />}
        {farmers.map((farmer, index) => (
          <FarmerItem
            key={index}
            variant="soft"
            sx={{
              marginBottom: !isLastFarmer(index) ? 1 : 0,
              cursor: "pointer",
            }}
            onSelect={() => onSelect(farmer)}
            farmer={farmer}
          />
        ))}
        {!farmers.length && <Empty>No farmers found</Empty>}
      </Stack>
    </Box>
  );
}

function FarmerItem({ farmer, sx = [], onSelect }) {
  const farmerFullName = `${farmer.firstName} ${farmer.lastName}`;

  return (
    <Card variant="soft" sx={Array.isArray(sx) ? sx : [sx]} onClick={onSelect}>
      <CardContent orientation="horizontal">
        <AspectRatio sx={{ width: 70, flex: "0 0 auto" }}>
          <img
            src={resolvePhotoSrc(farmer.profilePhoto)}
            alt={`${farmerFullName}`}
          />
        </AspectRatio>
        <Typography
          sx={{
            display: "inline-block",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          level="body-sm"
        >
          {farmerFullName}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function FarmerSelect({ name, label, sx = [], ...props }) {
  const isMounted = useRef(true);

  const [, { value: selectedFarmers, touched, error }, { setValue }] = useField(
    {
      name,
      ...props,
    }
  );
  const hasError = touched && !!error;
  const inputRef = useRef(null);
  const [farmers, setFarmers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedQuery, unDebouncedQuery, setQuery] = useDebouncedInput({
    defaultValue: "",
  });
  const [fetchFarmers, { isFetching: isFetchingFarmers }] =
    useLazyGetFarmersQuery();

  function handleSearchClear() {
    setQuery("");
    handlePopupClose();
  }

  function handleChange({ target }) {
    setQuery(target.value);
    setIsOpen(target.value.trim() !== "");
  }

  function handlePopupClose() {
    setIsOpen(false);
  }
  const getSelectedFarmers = useCallback(() => {
    return selectedFarmers || [];
  }, [selectedFarmers]);

  const isFarmerSelected = useCallback(
    (farmer) => {
      return getSelectedFarmers().find(
        (selectedFarmer) => selectedFarmer.id === farmer.id
      );
    },
    [getSelectedFarmers]
  );

  function selectFarmer(farmer) {
    const _isFarmerSelected = isFarmerSelected(farmer);
    if (_isFarmerSelected) return;
    setValue([...getSelectedFarmers(), farmer]);
  }
  function unSelectFarmer(farmer) {
    if (!isFarmerSelected(farmer)) return;
    setValue(
      getSelectedFarmers().filter(
        (selectedFarmer) => selectedFarmer.id !== farmer.id
      )
    );
  }
  useEffect(() => {
    isMounted.current = true;
    const { unwrap, abort } = fetchFarmers({ search: debouncedQuery });
    unwrap().then(({ data: farmers }) => {
      if (!isMounted.current) {
        abort();
        return;
      }
      setFarmers(farmers.filter((farmer) => !isFarmerSelected(farmer)));
    });
    return () => (isMounted.current = false);
  }, [debouncedQuery, fetchFarmers, isFarmerSelected]);

  return (
    <FormControl sx={Array.isArray(sx) ? sx : [sx]} error={hasError}>
      <ClickAwayListener onClickAway={handlePopupClose}>
        <Box>
          <FormLabel>{label}</FormLabel>
          <Input
            ref={inputRef}
            onChange={handleChange}
            onFocus={({ target }) => setIsOpen(!isEmpty(target.value.trim()))}
            placeholder="Search farmer"
            value={unDebouncedQuery}
            endDecorator={
              !isEmpty(unDebouncedQuery) && (
                <IconButton size="sm" onClick={handleSearchClear}>
                  <SearchOffOutlinedIcon />
                </IconButton>
              )
            }
            {...props}
          />

          <Popup
            open={isOpen}
            anchorEl={inputRef.current}
            disablePortal={true}
            modifiers={[
              {
                name: "offset",
                options: {
                  offset: [0, 4],
                },
              },
            ]}
          >
            <MenuList
              sx={{
                padding: 1,
                maxHeight: 350,
                overflowY: "auto",
                overflowX: "hidden",
                width: 290,
              }}
            >
              <FarmerItems
                farmers={farmers}
                isLoading={isFetchingFarmers}
                onSelect={selectFarmer}
              />
            </MenuList>
          </Popup>
        </Box>
      </ClickAwayListener>

      {hasError && <FormHelperText>{error}</FormHelperText>}
      <Box sx={{ marginTop: 2 }}>
        {getSelectedFarmers().map((farmer, index) => {
          const farmerFullName = `${farmer.firstName} ${farmer.lastName}`;
          return (
            <Chip
              key={index}
              color="success"
              size="lg"
              sx={{ marginRight: 2 }}
              endDecorator={
                <ChipDelete onClick={() => unSelectFarmer(farmer)} />
              }
            >
              {farmerFullName}
            </Chip>
          );
        })}
      </Box>
    </FormControl>
  );
}
