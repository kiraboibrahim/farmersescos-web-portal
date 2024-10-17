import {
  AspectRatio,
  Avatar,
  Box,
  Card,
  CardContent,
  Dropdown,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  Typography,
} from "@mui/joy";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useGetEscosQuery } from "../../services/esco";
import Pagination from "../Pagination/Pagination";
import { useState } from "react";
import Loading from "../common/utils/Loading";
import Error from "../common/utils/Error";
import GridList from "../common/layouts/GridList";
import resolvePhotoSrc from "../../utils/resolve-photo-src";
import Empty from "../common/utils/Empty";

function EscoItem({ esco }) {
  return (
    <Card size="sm">
      <CardContent orientation="horizontal">
        <Box>
          <Avatar
            src={resolvePhotoSrc(esco.profilePhoto)}
            sx={{ marginRight: 1, flexGrow: 1 }}
          >
            {esco.name}
          </Avatar>
        </Box>
        <Link
          component={RouterLink}
          to={`/escos/${esco.id}`}
          overlay
          underline="none"
          color="neutral"
          sx={{
            display: "block",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontWeight: "bold",
            alignSelf: "center",
            marginRight: "auto",
            maxWidth: 1,
          }}
          level="body-sm"
        >
          {esco.name}
        </Link>
        <Dropdown>
          <MenuButton slots={{ root: IconButton }}>
            <MoreVertIcon />
          </MenuButton>
          <Menu>
            <MenuItem>
              <Typography
                level="body-sm"
                startDecorator={<ModeEditOutlinedIcon />}
              >
                Edit
              </Typography>
            </MenuItem>
            <MenuItem>
              <Typography
                level="body-sm"
                startDecorator={<DeleteOutlinedIcon />}
              >
                Delete
              </Typography>
            </MenuItem>
          </Menu>
        </Dropdown>
      </CardContent>
      <AspectRatio>
        <img src={resolvePhotoSrc(esco.coverPhoto)} alt={esco.name} />
      </AspectRatio>
    </Card>
  );
}

export default function EscoList() {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const {
    data: escos,
    error: escosFetchError,
    isFetching: isEscosFetchPending,
  } = useGetEscosQuery({ page, search: searchParams.get("search") });

  if (isEscosFetchPending) {
    return <Loading />;
  }

  if (escosFetchError) {
    return <Error error={escosFetchError} />;
  }

  if (escos?.data) {
    return (
      <>
        <GridList
          items={escos.data}
          renderItem={(item) => <EscoItem esco={item} />}
          renderEmpty={() => <Empty>No escos found</Empty>}
        />
        <Pagination
          pageCount={escos.meta.totalPages}
          currentPage={escos.meta.currentPage}
          onSelectPage={setPage}
        ></Pagination>
      </>
    );
  }
}
