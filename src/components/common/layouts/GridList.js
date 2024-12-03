import { Grid, Box } from "@mui/joy";

export default function GridList({
  items,
  renderItem,
  renderEmpty = () => <Box>No items found</Box>,
}) {
  if (items?.length) {
    return (
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        {items.map((item, index) => (
          <Grid
            sx={{ width: { xs: 1, sm: 6 / 12, md: 4 / 12, lg: 3 / 12 } }}
            key={index}
          >
            {renderItem(item)}
          </Grid>
        ))}
      </Grid>
    );
  } else {
    return <>{renderEmpty()}</>;
  }
}
