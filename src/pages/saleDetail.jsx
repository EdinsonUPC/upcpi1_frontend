import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Tab, Tabs } from "@mui/material";
import FormEditSale from "../saleDetail/FormEditSale";

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
    <Container>
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
    </Container>
  );
}
