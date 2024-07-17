import React from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { styled } from "@mui/system";

const CustomFormControl = styled(FormControl)({
  position: "relative",
  display: "inline-block",
  width: "175px",
});

const CustomSelect = styled(Select)({
  backgroundColor: "var(--secondary-background)",
  color: "var(--primary-text)",
  width: "100%",
  height: "40px",
  border: "none",
  padding: "8px",
  borderRadius: "4px",
  boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)",
  outline: "none",
  appearance: "none",
  cursor: "pointer",
  backgroundImage: "var(--chevron-down-image)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 10px center",
  backgroundSize: "8px 8px",
  fontWeight: 500,
  "&:hover": {
    border: "none",
  },
  "&:focus": {
    border: "none",
  },
  "& .MuiSelect-icon": {
    color: "var(--primary-text)",
    display: "none",
    border: "none",
  },
});

const CustomInputLabel = styled(InputLabel)({
  color: "var(--primary-text)",
  fontFamily: '"Open Sans", sans-serif',
});

const Dropdown = ({ regions, onSelect }) => {
  const handleChange = (e) => {
    const selectedRegion = e.target.value;
    console.log("Selected Region:", selectedRegion);
    onSelect(selectedRegion);
  };

  return (
    <CustomFormControl variant="outlined">
      <CustomInputLabel id="region-select-label">Region</CustomInputLabel>
      <CustomSelect
        labelId="region-select-label"
        id="region-select"
        onChange={handleChange}
        label="Region"
      >
        {regions.map((region) => (
          <MenuItem key={region} value={region}>
            {region.charAt(0).toUpperCase() + region.slice(1)}
          </MenuItem>
        ))}
      </CustomSelect>
    </CustomFormControl>
  );
};

export default Dropdown;
