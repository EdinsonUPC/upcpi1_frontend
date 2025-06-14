import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Breadcrumbs, { breadcrumbsClasses } from "@mui/material/Breadcrumbs";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: "center",
  },
}));

export default function NavbarBreadcrumbs({ nav }) {
  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      {nav.map((x, index) => {
        if (index === nav.length - 1) {
          return (
            <Typography
              key={index}
              variant="body1"
              sx={{ color: "text.primary", fontWeight: 600 }}
            >
              {x}
            </Typography>
          );
        } else {
          return (
            <Typography key={index} variant="body1">
              {x}
            </Typography>
          );
        }
      })}
    </StyledBreadcrumbs>
  );
}
