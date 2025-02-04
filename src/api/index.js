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

const fetchAllTypes = createAsyncThunk('pokemons/fetchPokemonTypes', async () => {
  const response = await fetch('https://pokeapi.co/api/v2/type/');

  if (!response.ok) {
    throw new Error('Error fetching the Type');
  }

  return await response.json();
});

const loginPost = createAsyncThunk('pokemons/login', async (credentials) => {
  const response = await fetch('http://localhost:3000/login.json');
  const res = await response.json();

  const isCorrect = credentials.admin === res.admin && credentials.password === res.password;

  return isCorrect
    ? { message: 'Inicio de sesión exitoso.', status: 'ok' }
    : { message: 'Credenciales incorrectas.', status: 'failed' };
});

const fetchPokemonByUrl = createAsyncThunk('pokemons/fetchPokemonByUrl', async (url) => {
  const response = await fetch(url);
  if (!response.status) {
    throw new Error('Error');
  }
  const res = await response.json();
  return res;
});

export default { fetchPokemonByName, loginPost, fetchPokemonByUrl, fetchAllTypes };
