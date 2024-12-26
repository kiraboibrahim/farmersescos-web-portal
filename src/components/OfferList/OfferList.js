import {
  AspectRatio,
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Typography,
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
    <Card size="sm">
      <Card size="sm">
        <CardContent orientation="horizontal">
          <Avatar size="sm" src={resolvePhotoSrc(esco.profilePhoto)}></Avatar>
          <Typography level="body-sm" sx={{ alignSelf: "center" }}>
            {esco.name}
          </Typography>
          <IconButton
            sx={{ marginLeft: "auto" }}
            component={RouterLink}
            to={`/escos/${esco.id}`}
          >
            <ChevronRightOutlinedIcon />
          </IconButton>
        </CardContent>
      </Card>
      <AspectRatio>
        <img src={resolvePhotoSrc(product.coverPhoto)} alt={product.name} />
      </AspectRatio>
      <Typography
        component={RouterLink}
        to={`/products/${product.id}`}
        sx={{ textDecoration: "none" }}
      >
        {product.name}
      </Typography>
      <Card size="sm">
        <CardContent orientation="horizontal">
          <Avatar size="sm" src={resolvePhotoSrc(farmer.profilePhoto)}></Avatar>
          <Typography
            level="body-sm"
            sx={{ alignSelf: "center" }}
          >{`${farmer.firstName} ${farmer.lastName}`}</Typography>
          <IconButton
            sx={{ marginLeft: "auto" }}
            component={RouterLink}
            to={`/farmers/${farmer.id}`}
          >
            <ChevronRightOutlinedIcon />
          </IconButton>
        </CardContent>
      </Card>
      <Box sx={{ display: "flex" }}>
        <Chip color="warning" sx={{ marginLeft: "auto" }}>
          {getOfferStatus()}
        </Chip>
      </Box>
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
