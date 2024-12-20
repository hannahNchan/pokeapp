import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchPokemonByName = createAsyncThunk(
  'pokemons/fetchPokemon',
  async (pokemonName) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (!response.ok) {
      throw new Error('Error');
    }
    return await response.json();
  }
);

const loginPost = createAsyncThunk(
    'pokemons/login',
    async (credentials) => {
      const response = await fetch('http://localhost:4000/login',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...credentials})
      });
      if (!response.status) {
        throw new Error('Error');
      }
      const res = await response.json();
      return res;
    }
  );

export default { fetchPokemonByName, loginPost };