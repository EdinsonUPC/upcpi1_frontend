import Stack from "@mui/material/Stack";
import NavbarBreadcrumbs from "./NavbarBreadcrumbs";
import ColorModeIconDropdown from "../components/ColorModeIconDropdown";

export default function Header({ nav }) {
  return (
    <Stack
      direction="row"
      sx={{
        // display: { xs: "none", md: "flex" },
        width: "100%",
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-between",
        maxWidth: { sm: "100%", md: "1700px" },
        pt: 1.5,
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs nav={nav} />
      <Stack direction="row" sx={{ gap: 1 }}>
        <ColorModeIconDropdown />
      </Stack>
    </Stack>
  );
}
