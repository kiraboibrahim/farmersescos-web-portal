import { Chip } from "@mui/joy";
import { NavLink as RouterLink, useSearchParams } from "react-router-dom";
import serializeParams from "../../utils/serializeParams";

export default function Nav() {
  const [searchParams] = useSearchParams();
  const search = serializeParams({ search: searchParams.get("search") });
  return (
    <>
      <Chip
        sx={{ marginRight: 5 }}
        size="lg"
        component={RouterLink}
        to={`/products${search}`}
      >
        Products
      </Chip>
      <Chip
        sx={{ marginRight: 5 }}
        size="lg"
        component={RouterLink}
        to={`/escos${search}`}
      >
        Escos
      </Chip>
      <Chip size="lg" component={RouterLink} to={`/farmers${search}`}>
        Farmers
      </Chip>
    </>
  );
}
