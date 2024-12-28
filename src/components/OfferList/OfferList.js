import {
  AspectRatio,
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Typography,
  Link,
} from "@mui/joy";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { Link as RouterLink } from "react-router-dom";
import { useGetFarmerOffersQuery } from "../../services/farmer";
import { useGetEscoOffersQuery } from "../../services/esco";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import Loading from "../common/utils/Loading";
import Empty from "../common/utils/Empty";
import { useState } from "react";
import resolvePhotoSrc from "../../utils/resolve-photo-src";
import PaginatedGridList from "../common/layouts/PaginatedGridList";
import toTitleCase from "../../utils/toTitleCase";

function OfferItem({
  offer: { product, esco, farmer, isAccepted, expiryDate },
}) {
  const getOfferStatus = () => {
    const isPending = isAccepted === null;
    const isRejected = isAccepted;
    const isExpired =
      (isPending || isRejected) && Date.parse(expiryDate) < Date.now();
    return isExpired
      ? "Expired"
      : isPending
      ? "Pending"
      : isRejected
      ? "Rejected"
      : isAccepted
      ? "Accepted"
      : "Unknown";
  };
  return (
    <Card size="sm" variant="soft" sx={{ borderRadius: "lg" }}>
      <Card size="sm" variant="soft" sx={{ padding: 0 }}>
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
            {toTitleCase(esco.name)}
          </Link>
        </CardContent>
      </Card>
      <AspectRatio>
        <img src={resolvePhotoSrc(product.coverPhoto)} alt={product.name} />
      </AspectRatio>
      <Box sx={{ position: "relative" }}>
        <Chip
          variant="soft"
          color="warning"
          size="sm"
          sx={{
            transform: "translateY(-65%)",
            position: "absolute",
          }}
        >
          {getOfferStatus()}
        </Chip>
      </Box>
      <Typography
        component={RouterLink}
        to={`/products/${product.id}`}
        sx={{ textDecoration: "none", fontSize: "sm", marginTop: 1 }}
      >
        {toTitleCase(product.name)}
      </Typography>
      <Card size="sm">
        <CardContent orientation="horizontal">
          <Avatar size="sm" src={resolvePhotoSrc(farmer.profilePhoto)}></Avatar>
          <Typography level="body-sm" sx={{ alignSelf: "center" }}>
            {toTitleCase(`${farmer.firstName} ${farmer.lastName}`)}
          </Typography>
          <IconButton
            sx={{ marginLeft: "auto" }}
            component={RouterLink}
            to={`/farmers/${farmer.id}`}
          >
            <ChevronRightOutlinedIcon />
          </IconButton>
        </CardContent>
      </Card>
    </Card>
  );
}

export function FarmerOfferList() {
  const { id: farmerId } = useParams();
  const [page, setPage] = useState(1);
  const {
    data: offers,
    isFetching,
    error,
  } = useGetFarmerOffersQuery({ farmerId, page });
  if (isFetching) {
    return <Loading />;
  }
  if (!!error) {
    return toast.error(error?.message);
  }
  if (!!offers) {
    return <OfferList offers={offers} onSelectPage={setPage} />;
  }
}

export function EscoOfferList() {
  const { id: escoId } = useParams();
  const [page, setPage] = useState(1);
  const {
    data: offers,
    isFetching,
    error,
  } = useGetEscoOffersQuery({ escoId, page });
  if (isFetching) {
    return <Loading />;
  }
  if (!!error) {
    return toast.error(error?.message);
  }
  if (!!offers) {
    return <OfferList offers={offers} onSelectPage={setPage} />;
  }
}

function OfferList({ offers, onSelectPage }) {
  return (
    <PaginatedGridList
      data={offers}
      renderItem={(item) => <OfferItem offer={item} />}
      renderEmpty={() => <Empty>No offers found</Empty>}
      onSelectPage={onSelectPage}
    />
  );
}
