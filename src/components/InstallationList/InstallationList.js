import {
  AspectRatio,
  Avatar,
  Card,
  CardContent,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/joy";
import { Link as RouterLink, useParams } from "react-router-dom";
import AgricultureOutlinedIcon from "@mui/icons-material/AgricultureOutlined";
import { useState } from "react";
import Loading from "../common/utils/Loading";
import { useGetFarmerInstallationsQuery } from "../../services/farmer";
import { useGetEscoInstallationsQuery } from "../../services/esco";

import Pagination from "../Pagination/Pagination";
import StarRating from "../common/utils/StarRating";
import Error from "../common/utils/Error";
import GridList from "../common/layouts/GridList";
import resolvePhotoSrc from "../../utils/resolve-photo-src";
import Empty from "../common/utils/Empty";

function InstallationItem({ installation }) {
  return (
    <Card size="sm">
      <CardContent orientation="horizontal">
        <Avatar
          src={resolvePhotoSrc(installation.esco.profilePhoto)}
          sx={{ marginRight: 1 }}
        >
          {installation.esco.name}
        </Avatar>
        <Typography
          level="body-sm"
          sx={{
            display: "block",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontWeight: "bold",
            width: 1,
            alignSelf: "center",
          }}
        >
          {installation.esco.name}
        </Typography>
      </CardContent>
      <AspectRatio>
        <img
          src={resolvePhotoSrc(installation.product.coverPhoto)}
          alt={installation.name}
        />
      </AspectRatio>
      <Stack direction="row">
        <IconButton>
          <AgricultureOutlinedIcon />
        </IconButton>
        <Typography
          level="body-sm"
          sx={{ alignSelf: "center" }}
        >{`${installation.farmer.firstName} ${installation.farmer.lastName}`}</Typography>
      </Stack>
      <Link
        sx={{
          display: "block",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
        component={RouterLink}
        to="#"
        overlay
        underline="none"
      >
        <Typography level="body-lg">{installation.product.name}</Typography>
      </Link>
      <StarRating value={3} />
    </Card>
  );
}

export default function FarmerInstallationList() {
  const { id: farmerId } = useParams();

  const [page, setPage] = useState(1);
  const {
    data: installations,
    error,
    isFetching,
  } = useGetFarmerInstallationsQuery({ farmerId, page });
  if (isFetching) {
    return <Loading />;
  }
  if (!!error) {
    return <Error error={error} />;
  }
  return (
    <InstallationList installations={installations} onSelectPage={setPage} />
  );
}

export function EscoInstallationList() {
  const { id: escoId } = useParams();
  const [page, setPage] = useState(1);
  const {
    data: installations,
    error,
    isFetching,
  } = useGetEscoInstallationsQuery({ escoId, page });
  if (isFetching) {
    return <Loading />;
  }
  if (!!error) {
    return <Error error={error} />;
  }
  return (
    <InstallationList installations={installations} onSelectPage={setPage} />
  );
}

function InstallationList({ installations, onSelectPage = (page) => page }) {
  if (installations?.data) {
    return (
      <>
        <GridList
          items={installations.data}
          renderItem={(item) => <InstallationItem installation={item} />}
          renderEmpty={() => <Empty>No installations found</Empty>}
        />
        <Pagination
          pageCount={installations.meta.totalPages}
          currentPage={installations.meta.currentPage}
          onSelectPage={onSelectPage}
        ></Pagination>
      </>
    );
  }
}
