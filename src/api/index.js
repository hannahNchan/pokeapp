import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchPokemonByName = createAsyncThunk(
  'pokemons/fetchPokemon',
  async ({ pokemonName, limit }) => {
    const paramsObj = { limit };
    const searchParams = new URLSearchParams(paramsObj).toString();

    const queryStrings = pokemonName + '?' + searchParams;

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${queryStrings}`);

    if (!response.ok) {
      throw new Error('Error fetching the Pokémon');
    }

    return await response.json();
  }
);

const loginPost = createAsyncThunk('pokemons/login', async (credentials) => {
  const response = await fetch('http://localhost:4000/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...credentials })
  });
  if (!response.status) {
    throw new Error('Error');
  }
  const res = await response.json();
  return res;
});

const fetchPokemonByUrl = createAsyncThunk('pokemons/fetchPokemonByUrl', async (url) => {
  const response = await fetch(url);
  if (!response.status) {
    throw new Error('Error');
  }
  const res = await response.json();
  return res;
});

export default { fetchPokemonByName, loginPost, fetchPokemonByUrl };
