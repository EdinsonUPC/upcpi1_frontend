import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Menu,
  Stack,
  TextField,
} from "@mui/material";
import { FaDollarSign } from "react-icons/fa";

const FilterButtonsReport = ({
  filterData,
  setFilterData,
  handleApplyFilters,
}) => {
  const [anchorElRangos, setAnchorElRangos] = useState(null);

  const handleClick = (event) => {
    setAnchorElRangos(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElRangos(null);
  };

  const handleApplyFiltersAndClose = () => {
    handleApplyFilters();
    handleClose();
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
      <ButtonGroup>
        <Button
          variant="outlined"
          startIcon={<FaDollarSign />}
          onClick={handleClick}
        >
          RANGOS
        </Button>
        <Menu
          anchorEl={anchorElRangos}
          open={Boolean(anchorElRangos)}
          onClose={handleClose}
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
              <Stack direction="row" spacing={1}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleApplyFiltersAndClose}
                >
                  Aplicar
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  onClick={handleClose}
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

export default FilterButtonsReport;
