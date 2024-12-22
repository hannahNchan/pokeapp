import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Box } from '@mui/material';

import Loader from '../../ui/loader';
import SearchBar from '../SearchBar';
import PokemonCard from '../PokemonCard';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const results = useSelector((state) => state.pokemon.pokemonData);
  const [pokemons, setPokemons] = useState([]);

  // TODO: implement filter section

  useEffect(() => {
    if (results.pokemon && !Object.prototype.hasOwnProperty.call(results.pokemon, 'count')) {
      return setPokemons([results.pokemon]);
    }
    if (results.pokemon && results.pokemon.results.length !== 0) {
      return setPokemons(results.pokemon.results);
    }
  }, [results]);

  const onHandleClear = () => {
    setPokemons([]);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <SearchBar handleClear={onHandleClear} />
      {(results.status === 'cargando' && <Loader size="big" />) || (
        <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
          {pokemons.length !== 0 &&
            pokemons.map((pokemon, index) => (
              <Grid key={index} size={{ xs: 2, sm: 4, md: 4, lg: 4, xl: 3 }}>
                <PokemonCard data={pokemon.url ? pokemon.url : pokemon} />
              </Grid>
            ))}
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
