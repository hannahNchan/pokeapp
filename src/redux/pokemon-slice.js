import { createSlice } from '@reduxjs/toolkit';

const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState: { pokemon: 0 },
  reducers: {
    storePokemon: (state) => {
      state.value += 1;
    },
  },
});

export const { storePokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;