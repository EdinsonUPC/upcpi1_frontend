import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
// import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
// import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
// import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
// import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import SellIcon from "@mui/icons-material/Sell";

const mainListItems = [
  { text: "General", icon: <HomeRoundedIcon /> },
  { text: "Analisis", icon: <AnalyticsRoundedIcon /> },
  { text: "Compras", icon: <ShoppingBasketIcon /> },
  { text: "Ventas", icon: <SellIcon /> },
  { text: "Reportes", icon: <AssignmentRoundedIcon /> },
];

// const secondaryListItems = [
//   { text: "Settings", icon: <SettingsRoundedIcon /> },
//   { text: "About", icon: <InfoRoundedIcon /> },
//   { text: "Feedback", icon: <HelpRoundedIcon /> },
// ];

export default function MenuContent() {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton selected={index === 0}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
