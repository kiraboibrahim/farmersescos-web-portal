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
import resolvePhotoSrc from "../../../utils/resolve-photo-src";
import Loading from "../utils/Loading";
import isEmpty from "../../../utils/isEmpty";
import Empty from "../utils/Empty";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import { useField } from "formik";
import toTitleCase from "../../../utils/toTitleCase";
import { useLazyGetGroupsQuery } from "../../../services/group";

const Popup = styled(Popper)({
  zIndex: 1000,
});

function GroupItems({ groups, isLoading, onSelect }) {
  const isLastGroup = (index) => index === groups.length - 1;
  return (
    <Box>
      <Stack direction="column">
        {isLoading && <Loading size="xs" />}
        {groups.map((group, index) => (
          <GroupItem
            key={index}
            variant="soft"
            sx={{
              marginBottom: !isLastGroup(index) ? 1 : 0,
              cursor: "pointer",
            }}
            onSelect={() => onSelect(group)}
            group={group}
          />
        ))}
        {!groups.length && <Empty>No groups found</Empty>}
      </Stack>
    </Box>
  );
}

function GroupItem({ group, sx = [], onSelect }) {
  return (
    <Card variant="soft" sx={Array.isArray(sx) ? sx : [sx]} onClick={onSelect}>
      <CardContent orientation="horizontal">
        <AspectRatio sx={{ width: 70, flex: "0 0 auto" }}>
          <img
            src={resolvePhotoSrc(group.profilePhoto)}
            alt={`${group.name}`}
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
          {toTitleCase(group.name)}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function GroupSelect({ name, label, sx = [], ...props }) {
  const isMounted = useRef(true);

  const [, { value: selectedGroups, touched, error }, { setValue }] = useField({
    name,
    ...props,
  });
  const { multiple } = props;
  const hasError = touched && !!error;
  const inputRef = useRef(null);
  const [groups, setGroups] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedQuery, unDebouncedQuery, setQuery] = useDebouncedInput({
    defaultValue: "",
  });
  const [fetchGroups, { isFetching: isFetchingGroups }] =
    useLazyGetGroupsQuery();

  function handleSearchClear() {
    setQuery("");
    handlePopupClose();
  }

  function handleChange({ target }) {
    setQuery(target.value);
    setIsOpen(target.value.trim() !== "");
  }

  function handleFocus({ target }) {
    if (!isEmpty(target.value.trim())) {
      setQuery(target.value);
      setIsOpen(true);
    }
  }

  function handlePopupClose() {
    setIsOpen(false);
  }
  const getSelectedGroups = useCallback(() => {
    return selectedGroups || [];
  }, [selectedGroups]);

  const isGroupSelected = useCallback(
    (group) => {
      return getSelectedGroups().find(
        (selectedGroup) => selectedGroup.id === group.id
      );
    },
    [getSelectedGroups]
  );

  function selectGroup(group) {
    const _isGroupSelected = isGroupSelected(group);
    if (_isGroupSelected) return;
    !!multiple ? setValue([...getSelectedGroups(), group]) : setValue([group]);
  }
  function unSelectGroup(group) {
    if (!isGroupSelected(group)) return;
    setValue(
      getSelectedGroups().filter(
        (selectedGroup) => selectedGroup.id !== group.id
      )
    );
  }
  useEffect(() => {
    isMounted.current = true;
    const { unwrap, abort } = fetchGroups({ search: debouncedQuery });
    unwrap().then(({ data: groups }) => {
      if (!isMounted.current) {
        abort();
        return;
      }
      setGroups(groups.filter((group) => !isGroupSelected(group)));
    });
    return () => (isMounted.current = false);
  }, [debouncedQuery, fetchGroups, isGroupSelected]);

  return (
    <FormControl sx={Array.isArray(sx) ? sx : [sx]} error={hasError}>
      <ClickAwayListener onClickAway={handlePopupClose}>
        <Box>
          <FormLabel>{label}</FormLabel>
          <Input
            ref={inputRef}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="Search groups"
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
              <GroupItems
                groups={groups}
                isLoading={isFetchingGroups}
                onSelect={selectGroup}
              />
            </MenuList>
          </Popup>
        </Box>
      </ClickAwayListener>

      {hasError && <FormHelperText>{error}</FormHelperText>}
      <Box sx={{ marginTop: 2 }}>
        {getSelectedGroups().map((group, index) => {
          return (
            <Chip
              key={index}
              color="success"
              size="lg"
              sx={{ marginRight: 2 }}
              endDecorator={<ChipDelete onClick={() => unSelectGroup(group)} />}
            >
              {toTitleCase(group.name)}
            </Chip>
          );
        })}
      </Box>
    </FormControl>
  );
}
