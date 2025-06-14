import MuiAvatar from "@mui/material/Avatar";
import MuiListItemAvatar from "@mui/material/ListItemAvatar";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";

const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: 28,
  height: 28,
  backgroundColor: (theme.vars || theme).palette.background.paper,
  color: (theme.vars || theme).palette.text.secondary,
  border: `1px solid ${(theme.vars || theme).palette.divider}`,
}));

const ListItemAvatar = styled(MuiListItemAvatar)({
  minWidth: 0,
  marginRight: 12,
});

export default function SelectContent() {
  return (
    <MenuItem value="">
      <ListItemAvatar>
        <Avatar alt="Sitemark web">
          <DevicesRoundedIcon sx={{ fontSize: "1rem" }} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Nombre Empresa" secondary="Avicola predictivo" />
    </MenuItem>
  );
}
