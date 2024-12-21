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
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Directions';
import { useDispatch } from 'react-redux';

import service from '../../api/index';

const SearchBar = () => {
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
    return dispatch(service.fetchPokemonByName({ pokemonName: text, limit }));
  };

  return (
    <Box display="flex" alignItems="center" gap={2} mt={4} mb={4}>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}>
        <IconButton sx={{ p: '10px' }} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Busca tu Pokémon..."
          inputProps={{ 'aria-label': 'Busca tu Pokémon' }}
          onChange={handleChange}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Button onClick={onSearch} variant="contained" endIcon={<SendIcon />}>
          Buscar
        </Button>
      </Paper>
      <FormControl variant="outlined" sx={{ minWidth: 150 }}>
        <InputLabel>Items</InputLabel>
        <Select value={limit} onChange={handleLimit} label="Por busqueda">
          <MenuItem value="20">20</MenuItem>
          <MenuItem value="40">40</MenuItem>
          <MenuItem value="60">60</MenuItem>
          <MenuItem value="80">80</MenuItem>
          <MenuItem value="100">100</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" sx={{ minWidth: 150 }}>
        <InputLabel>Type</InputLabel>
        <Select value={filterType} onChange={handleFilterType} label="Type">
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Grass">Grass</MenuItem>
          <MenuItem value="Fire">Fire</MenuItem>
          <MenuItem value="Water">Water</MenuItem>
          <MenuItem value="Steel">Steel</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SearchBar;
