import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import SellIcon from "@mui/icons-material/Sell";

export const SidebarData = [
  { title: "General", path: "/", icon: <HomeRoundedIcon />, cName: "nav-text" },
  {
    title: "Analisis",
    path: "/analisis",
    icon: <AnalyticsRoundedIcon />,
    cName: "nav-text",
  },
  { title: "Compras", icon: <ShoppingBasketIcon />, cName: "nav-text" },
  { title: "Ventas", icon: <SellIcon />, cName: "nav-text" },
  { title: "Reportes", icon: <AssignmentRoundedIcon />, cName: "nav-text" },
];
