import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Menu,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FaTag, FaDollarSign } from "react-icons/fa";
import DdownMultiSearchClient from "../components/DdownMultiSearchClient";
import DdownMultiSearchProduct from "../components/DdownMultiSearchProductX";
import DdownMultiSearchEstados from "../components/DdownMultiSearchEstados";

const FilterButtonsMUI = ({
  filterData,
  setFilterData,
  handleApplyFilters,
}) => {
  const [anchorElPropiedades, setAnchorElPropiedades] = useState(null);
  const [anchorElRangos, setAnchorElRangos] = useState(null);

  const handleClick = (event, type) => {
    if (type === "propiedades") {
      setAnchorElPropiedades(event.currentTarget);
    } else {
      setAnchorElRangos(event.currentTarget);
    }
  };

  const handleClose = (type) => {
    if (type === "propiedades") {
      setAnchorElPropiedades(null);
    } else {
      setAnchorElRangos(null);
    }
  };

  const handleApplyFiltersAndClose = (type) => {
    handleApplyFilters();
    handleClose(type);
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
      <ButtonGroup>
        {/* Propiedades */}
        <Button
          variant="outlined"
          startIcon={<FaTag />}
          onClick={(e) => handleClick(e, "propiedades")}
        >
          PROPIEDADES
        </Button>
        <Menu
          anchorEl={anchorElPropiedades}
          open={Boolean(anchorElPropiedades)}
          onClose={() => handleClose("propiedades")}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Box sx={{ p: 2, width: 250 }}>
            <DdownMultiSearchProduct
              onChange={(selectedProducts) =>
                setFilterData({
                  ...filterData,
                  varIdProductos: selectedProducts,
                })
              }
            />
            <DdownMultiSearchClient
              onChange={(selectedClients) =>
                setFilterData({ ...filterData, varIdClientes: selectedClients })
              }
            />
            <DdownMultiSearchEstados
              onChange={(selectedEstados) =>
                setFilterData({ ...filterData, varEstados: selectedEstados })
              }
            />
            <TextField
              fullWidth
              size="small"
              label="Texto de búsqueda"
              value={filterData.varSearchText}
              onChange={(e) =>
                setFilterData({ ...filterData, varSearchText: e.target.value })
              }
              sx={{ my: 1 }}
            />
            <Stack direction="row" spacing={1}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => handleApplyFiltersAndClose("propiedades")}
              >
                Aplicar
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="error"
                onClick={() => handleClose("propiedades")}
              >
                Cerrar
              </Button>
            </Stack>
          </Box>
        </Menu>

        {/* Rangos */}
        <Button
          variant="outlined"
          startIcon={<FaDollarSign />}
          onClick={(e) => handleClick(e, "rangos")}
        >
          RANGOS
        </Button>
        <Menu
          anchorEl={anchorElRangos}
          open={Boolean(anchorElRangos)}
          onClose={() => handleClose("rangos")}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Box sx={{ p: 2, width: 250 }}>
            <Stack spacing={1}>
              <TextField
                size="small"
                label="Fecha Inicio"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={filterData.datFechaInicial}
                onChange={(e) =>
                  setFilterData({
                    ...filterData,
                    datFechaInicial: e.target.value,
                  })
                }
              />
              <TextField
                size="small"
                label="Fecha Fin"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={filterData.datFechaFinal}
                onChange={(e) =>
                  setFilterData({
                    ...filterData,
                    datFechaFinal: e.target.value,
                  })
                }
              />
              {/* <TextField
                size="small"
                label="Monto Inicial"
                type="number"
                value={filterData.numMontoInicial}
                onChange={(e) =>
                  setFilterData({
                    ...filterData,
                    numMontoInicial: e.target.value,
                  })
                }
              />
              <TextField
                size="small"
                label="Monto Final"
                type="number"
                value={filterData.numMontoFinal}
                onChange={(e) =>
                  setFilterData({
                    ...filterData,
                    numMontoFinal: e.target.value,
                  })
                }
              />
              <TextField
                size="small"
                label="Saldo Inicial"
                type="number"
                value={filterData.numSaldoInicial}
                onChange={(e) =>
                  setFilterData({
                    ...filterData,
                    numSaldoInicial: e.target.value,
                  })
                }
              />
              <TextField
                size="small"
                label="Saldo Final"
                type="number"
                value={filterData.numSaldoFinal}
                onChange={(e) =>
                  setFilterData({
                    ...filterData,
                    numSaldoFinal: e.target.value,
                  })
                }
              /> */}
              <Stack direction="row" spacing={1}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleApplyFiltersAndClose("rangos")}
                >
                  Aplicar
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  onClick={() => handleClose("rangos")}
                >
                  Cerrar
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Menu>
      </ButtonGroup>
    </Stack>
  );
};

export default FilterButtonsMUI;
