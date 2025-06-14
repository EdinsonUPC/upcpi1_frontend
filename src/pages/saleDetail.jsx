import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Stack, Tab, Tabs } from "@mui/material";
import FormEditSale from "../saleDetail/FormEditSale";
import Header from "../components/Header";

export default function SaleDetail() {
  const [sale, setSale] = useState({});
  let params = useParams();

  useEffect(() => {
    const apiFetch = async () => {
      const { data: saleData } = await axios.post(
        "http://localhost:8000/api/ventas/find-ID",
        {
          intIdVenta: params.saleId,
        }
      );

      const saleDataFind = saleData[0] ? saleData[0] : null;
      setSale(saleDataFind);
    };
    apiFetch();
  }, []);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Stack
      spacing={2}
      sx={{
        alignItems: "center",
        mx: 3,
        pb: 5,
        mt: { xs: 8, md: 0 },
      }}
    >
      <Header nav={["Ventas", "Listado", `Venta - ${params.saleId}`]} />
      <Stack
        direction="column"
        sx={{
          // display: { xs: "none", md: "flex" },
          width: "100%",
          justifyContent: "space-between",
          maxWidth: { sm: "100%", md: "1700px" },
          pt: 1.5,
        }}
        spacing={2}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Tabs editar venta"
          >
            <Tab label="Editar Venta" />
            {/* <Tab label="Historial" /> */}
          </Tabs>
        </Box>

        <Box sx={{ mt: 2 }}>
          {value === 0 && <FormEditSale sale={sale} />}
          {/* {value === 1 && <FormHistorialTableroElectronico />} */}
        </Box>
      </Stack>
    </Stack>
  );
}
