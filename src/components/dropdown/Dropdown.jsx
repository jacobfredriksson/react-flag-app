import React from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { styled } from "@mui/system";

const StyledFormControl = styled(FormControl)({
  position: "relative",
  display: "inline-block",
  width: "175px",
  "@media (max-width: 375px)": {
    marginLeft: "20px",
    width: "175px",
  },
});

const CustomSelect = styled(Select)({
  backgroundColor: "var(--secondary-background)",
  color: "var(--primary-text)",
  width: "100%",
  border: "none",
  borderRadius: "4px",
  boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)",
  outline: "none",
  appearance: "none",
  cursor: "pointer",
  backgroundImage: "var(--chevron-down-image)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 10px center",
  fontWeight: 500,
  "& .MuiSelect-icon": {
    color: "var(--primary-text)",
    display: "none",
    border: "none",
  },
});

const CustomInputLabel = styled(InputLabel)({
  color: "var(--primary-text)",
  fontFamily: '"Open Sans", sans-serif',
  letterSpacing: "0.1rem",
});

const CustomMenuItem = styled(MenuItem)({
  fontFamily: '"Open Sans", sans-serif',
  letterSpacing: "0.1rem",
});

const Dropdown = ({ regions, onSelect }) => {
  const handleChange = (e) => {
    const selectedRegion = e.target.value;
    console.log("Selected Region:", selectedRegion);
    onSelect(selectedRegion);
  };

  return (
    <StyledFormControl variant="outlined">
      <CustomInputLabel
        id="region-select-label"
        sx={{ color: "var(--primary-text)" }}
      >
        Region
      </CustomInputLabel>
      <CustomSelect
        labelId="region-select-label"
        id="region-select"
        onChange={handleChange}
        label="Region"
      >
        {regions.map((region) => (
          <CustomMenuItem key={region} value={region}>
            {region.charAt(0).toUpperCase() + region.slice(1)}
          </CustomMenuItem>
        ))}
      </CustomSelect>
    </StyledFormControl>
  );
};

export default Dropdown;
