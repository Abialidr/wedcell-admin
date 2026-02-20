import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  ListSubheader,
  TextField,
  InputAdornment,
  Paper,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { PROXY } from "../../config";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { GetSearchForVendors } from "../../redux/actions/HomeActions";

const containsText = (text, searchText) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

const allOptions = ["Option One", "Option Two", "Option Three", "Option Four"];

export default function VendorSelect({ tags, setTags }) {
  const [selectedOption, setSelectedOption] = useState(allOptions[0]);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { vendors } = useSelector((state) => state.homeReducer);
  console.log(
    "🚀 ~ file: vendorSelect.js:30 ~ VendorSelect ~ vendors:",
    vendors
  );
  const dispatch = useDispatch();

  // const displayedOptions = useMemo(
  //   () => data.filter((option) => containsText(option.name, searchText)),
  //   [data, searchText]
  // );

  // const [tags, setTags] = useState([]);

  const handleDelete = (chipToDelete) => () => {
    setTags((chips) => chips.filter((chip) => chip._id !== chipToDelete._id));
  };

  const addTag = (value) => {
    console.log(`🚀 ~ file: vendorSelect.js:40 ~ addTag ~ value:`, value);
    if (!tags.some((tag) => tag._id === value._id)) {
      let newArray = tags;
      newArray.push(value);
      console.log(
        `🚀 ~ file: vendorSelect.js:43 ~ addTag ~ newArray:`,
        newArray
      );
      setTags(newArray);
    } else {
      alert("Vendor already added");
    }
    setSelectedOption(value);
  };

  // useEffect(() => {
  //   const getVendors = async () => {
  //     const response = await axios.post(`${PROXY}/item/getAll`, {
  //       type: "Vendor",
  //     });
  //     setData(response.data.data);
  //     if (response.data.data.length > 0) {
  //       setSelectedOption(response.data.data[0]);
  //     }
  //   };
  //   getVendors();
  // }, []);

  useEffect(() => {
    console.log("000", selectedOption);
  }, [data, selectedOption]);

  return (
    <Box sx={{ m: 2 }}>
      <Paper sx={{ m: 1 }}>
        {tags.map((data) => {
          return (
            <span key={data._id} style={{ display: "inline-block" }}>
              <ul>
                <Chip label={data.name} onDelete={handleDelete(data)} />
              </ul>
            </span>
          );
        })}
      </Paper>
      <FormControl fullWidth>
        <InputLabel id="search-select-label">Options</InputLabel>

        <Select
          // Disables auto focus on MenuItems and allows TextField to be in focus
          MenuProps={{ autoFocus: false }}
          labelId="search-select-label"
          id="search-select"
          value={selectedOption.name}
          label="Options"
          onChange={(e) => {
            addTag(e.target.value);
          }}
          onClose={() => setSearchText("")}
          // This prevents rendering empty string in Select's value
          // if search text would exclude currently selected option.
          renderValue={() => selectedOption.name}>
          {/* TextField is put into ListSubheader so that it doesn't
              act as a selectable item in the menu
              i.e. we can click the TextField without triggering any selection.*/}
          <ListSubheader>
            <TextField
              size="small"
              autoFocus
              placeholder="Type to search..."
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{
                      cursor: "pointer",
                      border: "1px solid lightgrey",
                      padding: "13px",
                      borderRadius: "5px",
                    }}
                    onClick={() => {
                      dispatch(
                        GetSearchForVendors({ page: 1, searchTerm: searchText })
                      );
                    }}>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Escape") {
                  // Prevents autoselecting item while typing (default Select behaviour)
                  e.stopPropagation();
                }
              }}
            />
          </ListSubheader>
          {vendors?.data?.map((option, i) => (
            <MenuItem key={i} value={option}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
