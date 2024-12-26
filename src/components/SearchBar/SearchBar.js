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
  Divider,
  Link,
} from "@mui/joy";
import useDebouncedInput from "../../hooks/useDebouncedInput";
import { useEffect, useReducer, useRef, useState } from "react";
import { styled } from "@mui/joy/styles";
import { ClickAwayListener, Popper } from "@mui/material";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useLazyGetProductsQuery } from "../../services/product";
import { useLazyGetFarmersQuery } from "../../services/farmer";
import { useLazyGetEscosQuery } from "../../services/esco";
import resolvePhotoSrc from "../../utils/resolve-photo-src";
import Loading from "../common/utils/Loading";
import toTitleCase from "../../utils/toTitleCase";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";

const Popup = styled(Popper)({
  zIndex: 1000,
});

const PRODUCTS = "products";
const FARMERS = "farmers";
const ESCOS = "escos";
const SEARCH_BASE_URLS = {
  [PRODUCTS]: "/products",
  [FARMERS]: "/farmers",
  [ESCOS]: "/escos",
};
function SearchResults({
  searchResults,
  loading,
  onSearchResultClick,
  searchQuery,
}) {
  return (
    <>
      {Object.entries(searchResults).map(([key, results], index) => {
        return (
          <Box key={index}>
            <Typography level="body-sm">{toTitleCase(key)}</Typography>
            <Stack direction="column">
              <Card sx={{ marginBottom: 1 }} variant="soft">
                <CardContent orientation="horizontal">
                  <AspectRatio sx={{ width: "70px" }}>
                    <Box>
                      <SearchOutlinedIcon />
                    </Box>
                  </AspectRatio>
                  <Link
                    component={RouterLink}
                    to={`${SEARCH_BASE_URLS[key]}?search=${searchQuery}`}
                    underline="none"
                    overlay
                    onClick={onSearchResultClick}
                  >
                    <Typography level="body-sm">{`Search in all ${toTitleCase(
                      key
                    )}`}</Typography>
                  </Link>
                </CardContent>
              </Card>
              {loading[key] && <Loading size="sm" />}
              {results.map((result, index) => (
                <SearchResult
                  key={index}
                  variant="soft"
                  sx={{
                    marginBottom: index !== results.length - 1 ? 1 : 0,
                  }}
                  type={key}
                  onClick={onSearchResultClick}
                  {...result}
                />
              ))}
            </Stack>
            {index < Object.keys(searchResults).length - 1 && (
              <Divider sx={{ marginTop: 1, marginBottom: 2 }} />
            )}
          </Box>
        );
      })}
    </>
  );
}

function SearchResult({ name, photo, to, sx, onClick }) {
  return (
    <Card variant="soft" sx={sx}>
      <CardContent orientation="horizontal">
        <AspectRatio sx={{ width: 70, flex: "0 0 auto" }}>
          <img src={resolvePhotoSrc(photo)} alt={name} />
        </AspectRatio>
        <Link
          sx={{
            display: "inline-block",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          component={RouterLink}
          to={to}
          underline="none"
          overlay
          onClick={onClick}
        >
          <Typography level="body-sm">{name}</Typography>
        </Link>
      </CardContent>
    </Card>
  );
}

function searchResultsReducer(state, { type, payload }) {
  const { items } = payload;
  const newItems = items.map((item) => {
    switch (type) {
      case PRODUCTS:
        return { ...item, to: `/products/${item.id}` };
      case FARMERS:
        return {
          ...item,
          to: `/farmers/${item.id}`,
          name: toTitleCase(`${item.firstName} ${item.lastName}`),
        };
      case ESCOS:
        return { ...item, to: `/escos/${item.id}` };
      default:
        return item;
    }
  });
  return { ...state, [type]: newItems };
}

export default function SearchBar({ containersx = {}, ...props }) {
  const inputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchResults, dispatch] = useReducer(searchResultsReducer, {
    [PRODUCTS]: [],
    [FARMERS]: [],
    [ESCOS]: [],
  });
  const [debouncedSearchQuery, unDebouncedSearchQuery, setSearchQuery] =
    useDebouncedInput({
      defaultValue: searchParams.get("search") || "",
    });
  const [fetchProducts, { isFetching: isFetchingProducts }] =
    useLazyGetProductsQuery();
  const [fetchFarmers, { isFetching: isFetchingFarmers }] =
    useLazyGetFarmersQuery();
  const [fetchEscos, { isFetching: isFetchingEscos }] = useLazyGetEscosQuery();

  function handleSearchClear() {
    setSearchQuery("");
    searchParams.delete("search");
    setSearchParams(searchParams);
    handleResultsPopupClose();
  }
  function handleChange({ target }) {
    setSearchQuery(target.value);
    setIsOpen(target.value.trim() !== "");
  }

  function handleResultsPopupClose() {
    setIsOpen(false);
  }

  useEffect(() => {
    fetchProducts({ search: debouncedSearchQuery })
      .unwrap()
      .then(({ data }) => {
        dispatch({
          type: PRODUCTS,
          payload: { items: data.slice(0, 4) },
        });
      });
    fetchFarmers({ search: debouncedSearchQuery })
      .unwrap()
      .then(({ data }) => {
        dispatch({
          type: FARMERS,
          payload: { items: data.slice(0, 4) },
        });
      });
    fetchEscos({ search: debouncedSearchQuery })
      .unwrap()
      .then(({ data }) => {
        dispatch({ type: ESCOS, payload: { items: data.slice(0, 4) } });
      });
  }, [debouncedSearchQuery, fetchProducts, fetchFarmers, fetchEscos]);
  return (
    <ClickAwayListener onClickAway={handleResultsPopupClose}>
      <Box sx={containersx}>
        <Input
          ref={inputRef}
          onChange={handleChange}
          onFocus={({ target }) => setIsOpen(target.value.trim() !== "")}
          placeholder="Search farmers, escos, products"
          value={unDebouncedSearchQuery}
          endDecorator={
            unDebouncedSearchQuery !== "" && (
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
            <SearchResults
              searchResults={searchResults}
              loading={{
                [PRODUCTS]: isFetchingProducts,
                [FARMERS]: isFetchingFarmers,
                [ESCOS]: isFetchingEscos,
              }}
              onSearchResultClick={handleResultsPopupClose}
              searchQuery={unDebouncedSearchQuery}
            />
          </MenuList>
        </Popup>
      </Box>
    </ClickAwayListener>
  );
}
