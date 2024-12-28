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
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useGetFarmersQuery } from "../../services/farmer";
import { useState } from "react";
import Loading from "../common/utils/Loading";
import resolvePhotoSrc from "../../utils/resolve-photo-src";
import Empty from "../common/utils/Empty";
import Error from "../common/utils/Error";
import PaginatedGridList from "../common/layouts/PaginatedGridList";
import toTitleCase from "../../utils/toTitleCase";
import useDeleteFarmer from "../../hooks/useDeleteFarmer";

function FarmerItem({ farmer }) {
  const [deleteFarmer, isDeletingFarmer] = useDeleteFarmer();
  return (
    <Card
      size="sm"
      variant="soft"
      sx={{ borderRadius: "lg" }}
      color={isDeletingFarmer ? "danger" : "neutral"}
    >
      <CardContent orientation="horizontal">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={resolvePhotoSrc(farmer.profilePhoto)}
            sx={{ marginRight: 1 }}
          >
            {farmer.name}
          </Avatar>
          <Typography
            level="body-sm"
            sx={{
              width: 120,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontWeight: "bold",
            }}
          >
            <Link
              component={RouterLink}
              to={`/farmers/${farmer.id}`}
              underline="none"
              color="neutral"
              overlay
            >
              {toTitleCase(`${farmer.firstName} ${farmer.lastName}`)}
            </Link>
          </Typography>
        </Box>
        <Box sx={{ marginLeft: "auto" }}>
          <Dropdown>
            <MenuButton slots={{ root: IconButton }}>
              <MoreVertIcon />
            </MenuButton>
            <Menu>
              <MenuItem onClick={async () => await deleteFarmer(farmer.id)}>
                <Typography
                  level="body-sm"
                  startDecorator={<DeleteOutlinedIcon />}
                >
                  Delete
                </Typography>
              </MenuItem>
            </Menu>
          </Dropdown>
        </Box>
      </CardContent>
      <AspectRatio>
        <img
          src={resolvePhotoSrc(farmer.coverPhoto)}
          alt={farmer.name}
          loading="lazy"
        />
      </AspectRatio>
      <Typography
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
        level="body-xs"
      >
        {farmer.farmDescription}
      </Typography>
    </Card>
  );
}

export default function FarmerList() {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const {
    data: farmers,
    error: farmersFetchError,
    isFetching,
  } = useGetFarmersQuery({ page, search: searchParams.get("search") });

  if (isFetching) {
    return <Loading />;
  }
  if (!!farmersFetchError) {
    return <Error error={farmersFetchError} />;
  }

  if (farmers?.data) {
    return (
      <PaginatedGridList
        data={farmers}
        renderItem={(item) => <FarmerItem farmer={item} />}
        renderEmpty={() => <Empty>No farmers found</Empty>}
        onSelectPage={setPage}
      />
    );
  }
}
