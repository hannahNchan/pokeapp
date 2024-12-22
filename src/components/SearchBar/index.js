import React, { useState } from 'react';
import {
  Box,
  MenuItem,
  Select,
  Button,
  FormControl,
  InputLabel,
  Paper,
  InputBase,
  Divider,
  IconButton
} from '@mui/material';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid2';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Directions';
import { useDispatch } from 'react-redux';

import service from '../../api/index';
import { clearAllData } from '../../redux/pokemon-slice';

const SearchBar = ({ handleClear }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [filterType, setFilterType] = useState('');
  const [limit, setLimit] = useState('200');
  const handleChange = (event) => {
    setText(event.target.value);
  };
  const handleFilterType = (event) => {
    setFilterType(event.target.value);
  };
  const handleLimit = (event) => {
    setLimit(event.target.value);
  };
  const onSearch = () => {
    const pokemonText = text.toLowerCase().trim();
    return dispatch(service.fetchPokemonByName({ pokemonName: pokemonText, limit }));
  };
  const clearAll = () => {
    setText('');
    handleClear();
    dispatch(clearAllData());
  };

  return (
    <Box gap={2} mt={4} mb={4} sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
        <Grid size={{ xs: 12, sm: 12, md: 8, lg: 8, xl: 8 }}>
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}>
            <IconButton role="button" onClick={clearAll} sx={{ p: '10px' }} aria-label="menu">
              <HighlightOffIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search your Pokémon..."
              inputProps={{ 'aria-label': 'Search your Pokémon' }}
              onChange={handleChange}
              value={text}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Button onClick={onSearch} variant="contained" endIcon={<SendIcon />}>
              Search
            </Button>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, sm: 3, md: 4, lg: 1, xl: 1 }}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="demo-select-small-label">Items</InputLabel>
            <Select value={limit} onChange={handleLimit} label="Por busqueda">
              <MenuItem value="20">20</MenuItem>
              <MenuItem value="40">40</MenuItem>
              <MenuItem value="60">60</MenuItem>
              <MenuItem value="80">80</MenuItem>
              <MenuItem value="100">100</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 3, md: 4, lg: 1, xl: 1 }}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel>Type</InputLabel>
            <Select value={filterType} onChange={handleFilterType} label="Type">
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Grass">Grass</MenuItem>
              <MenuItem value="Fire">Fire</MenuItem>
              <MenuItem value="Water">Water</MenuItem>
              <MenuItem value="Steel">Steel</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 3, md: 4, lg: 1, xl: 1 }}>
          <FormControl variant="outlined" size="small" fullWidth>
            <Button
              sx={{ marginLeft: '10px' }}
              onClick={clearAll}
              variant="contained"
              endIcon={<SendIcon />}>
              Clear
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

SearchBar.propTypes = {
  handleClear: PropTypes.node.isRequired
};

export default SearchBar;
