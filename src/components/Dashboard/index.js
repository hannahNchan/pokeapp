import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Box } from '@mui/material';

import Loader from '../../ui/loader';
import SearchBar from '../SearchBar';
import PokemonCard from '../PokemonCard';
import utils from '../../utils/index';
import { useDynamicBackground } from '../../hooks/useDynamicBackground';
import logo from '../../assets/pokewall.jpg';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  useDynamicBackground(true, logo);
  const results = useSelector((state) => state.pokemon.pokemonData);
  const { types } = useSelector((state) => state.pokemon.types);
  const [afinity, setAfinity] = useState('all');
  const [pokemons, setPokemons] = useState([]);

  const orderPokemonBy = (array, by = 'asc') => {
    const getOrderedArray = utils.sortPokemonsByName([...array], by);
    setPokemons([...getOrderedArray]);
  };

  useEffect(() => {
    if (results.pokemon && !Object.prototype.hasOwnProperty.call(results.pokemon, 'count')) {
      return setPokemons([results.pokemon]);
    }
    if (results.pokemon && results.pokemon.results.length !== 0) {
      orderPokemonBy(results.pokemon.results);
    }
  }, [results]);

  const onHandleClear = () => {
    setPokemons([]);
  };

  const onHandleFilterType = (event) => {
    console.log(event.target.value);
    setAfinity(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <SearchBar
        type={afinity}
        handleFilterType={(e) => onHandleFilterType(e)}
        handleClear={onHandleClear}
        types={types}
        items={pokemons.length !== 0}
      />
      {(results.status === 'cargando' && <Loader size="big" />) || (
        <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
          {pokemons.length !== 0 &&
            pokemons.map((pokemon, index) => (
              <PokemonCard key={index} type={afinity} data={pokemon.url ? pokemon.url : pokemon} />
            ))}
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
