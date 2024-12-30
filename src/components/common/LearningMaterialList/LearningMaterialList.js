import { useGetProductLearningMaterialQuery } from "../../../services/product";
import YouTubePlayer from "react-player/youtube";
import Error from "../../common/utils/Error";
import Loading from "../utils/Loading";
import { Box, Sheet, Stack, Typography, Button } from "@mui/joy";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";

function LearningMaterial({ item, sx = [] }) {
  const { videoUrl } = item;
  return (
    <Box
      sx={[
        { minWidth: 1, maxWidth: 1, height: 200 },
        { ...(Array.isArray(sx) ? sx : [sx]) },
      ]}
    >
      <YouTubePlayer url={videoUrl} width="100%" height={200} />
    </Box>
  );
}

function EmptyLearningMaterials() {
  return (
    <Sheet
      variant="soft"
      color="neutral"
      sx={{
        minWidth: 1,
        height: 200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "lg",
      }}
    >
      <Stack direction="column" sx={{ alignItems: "center" }}>
        <SchoolOutlinedIcon fontSize="xl3" />
        <Typography level="body-sm">No Learning Materials</Typography>
        <Button
          size="sm"
          variant="soft"
          color="success"
          sx={{ borderRadius: 50, marginTop: 1 }}
        >
          Upload
        </Button>
      </Stack>
    </Sheet>
  );
}
export default function LearningMaterialsList({ productId }) {
  const {
    data: learningMaterials,
    isFetching,
    error: fetchError,
  } = useGetProductLearningMaterialQuery(productId);
  if (isFetching) return <Loading size="sm" />;
  if (!!fetchError) return <Error error={fetchError} />;

  if (!!learningMaterials.length) {
    return (
      <Stack
        direction="row"
        spacing={2}
        sx={{ overflowX: "scroll", overflowY: "hidden" }}
      >
        {learningMaterials.map((learningMaterial) => (
          <LearningMaterial item={learningMaterial} sx={{ flex: "1 1 auto" }} />
        ))}
      </Stack>
    );
  } else {
    return <EmptyLearningMaterials />;
  }
}
