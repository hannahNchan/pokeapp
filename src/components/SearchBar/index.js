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
//import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from '@mui/icons-material/Search';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useDispatch } from 'react-redux';

import service from '../../api/index';
import { clearAllData } from '../../redux/pokemon-slice';
import { ReactComponent as Logo } from '../../assets/pokeball.svg';

const SearchBar = ({ handleClear, items, handleFilterType, types, type }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [limit, setLimit] = useState('200');
  const handleChange = (event) => {
    setText(event.target.value);
  };
  const handleLimit = (event) => {
    setLimit(event.target.value);
  };
  const onSearch = () => {
    const pokemonText = text.toLowerCase().trim();
    dispatch(service.fetchPokemonByName({ pokemonName: pokemonText, limit }));
    return dispatch(service.fetchAllTypes());
  };
  const clearAll = () => {
    setText('');
    handleClear();
    dispatch(clearAllData());
  };

  React.useEffect(() => {
    document.getElementById('grid2').style.flexGrow = 1;
    document.getElementById('grid1').style.flexGrow = 1;
    document.getElementById('grid3').style.flexGrow = 1;
    document.getElementById('grid4').style.flexGrow = 1;
  }, []);

  return (
    <Box gap={2} mt={4} mb={4} sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
        <Grid id="grid1" container size={{ xs: 12, sm: 12, md: 8, lg: 8, xl: 8 }}>
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}>
            <IconButton
              disabled={!items}
              role="button"
              onClick={clearAll}
              sx={{ p: '10px' }}
              aria-label="menu">
              <Logo width="25px" height="25px" />
            </IconButton>
            <InputBase
              sx={{ ml: 1, height: '50px', flex: 1 }}
              placeholder="Search your Pokémon..."
              inputProps={{ 'aria-label': 'Search your Pokémon' }}
              onChange={handleChange}
              value={text}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton onClick={onSearch} type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid id="grid2" container size={{ xs: 12, sm: 4, md: 4, lg: 1, xl: 1 }}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel>Items</InputLabel>
            <Select
              fullWidth
              sx={{ height: '55px' }}
              value={limit}
              onChange={handleLimit}
              label="Items">
              <MenuItem value="20">20</MenuItem>
              <MenuItem value="40">40</MenuItem>
              <MenuItem value="60">60</MenuItem>
              <MenuItem value="80">80</MenuItem>
              <MenuItem value="100">100</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid id="grid3" container size={{ xs: 12, sm: 4, md: 4, lg: 1, xl: 1 }}>
          <FormControl disabled={types.length === 0} variant="outlined" size="small" fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              fullWidth
              sx={{ height: '55px' }}
              value={type}
              onChange={(e) => handleFilterType(e)}
              label="Type">
              <MenuItem value="all">All</MenuItem>
              {types.length !== 0 &&
                types.map((type, index) => (
                  <MenuItem value={type.name} key={'index-' + index}>
                    {type.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid id="grid4" container size={{ xs: 12, sm: 4, md: 4, lg: 1, xl: 1 }}>
          <FormControl variant="outlined" size="small" fullWidth>
            <Button
              fullWidth
              sx={{ height: '55px' }}
              onClick={clearAll}
              variant="outlined"
              color="error"
              disabled={!items}
              endIcon={<DeleteForeverOutlinedIcon />}>
              Clear
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

SearchBar.propTypes = {
  handleClear: PropTypes.node.isRequired,
  items: PropTypes.array,
  handleFilterType: PropTypes.func,
  types: PropTypes.array,
  type: PropTypes.string
};

export default SearchBar;
