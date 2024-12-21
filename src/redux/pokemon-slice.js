import { createSlice } from '@reduxjs/toolkit';

import pokemonService from '../api/index';

const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState: {
    pokemonData: {
      pokemon: null,
      status: 'exitoso',
      error: null,
      pokemonMiniCard: null
    },
    loginInfo: {
      status: 'exitoso',
      isLoged: false
    }
  },
  reducers: {},
  extraReducers: (builder) => {
    const { fetchPokemonByName, loginPost, fetchPokemonByUrl } = pokemonService;
    builder
      .addCase(fetchPokemonByName.pending, (state) => {
        state.pokemonData.status = 'cargando';
      })
      .addCase(fetchPokemonByName.fulfilled, (state, action) => {
        state.pokemonData.status = 'exitoso';
        state.pokemonData.pokemon = action.payload;
      })
      .addCase(fetchPokemonByName.rejected, (state, action) => {
        state.pokemonData.status = 'fallo';
        state.pokemonData.error = action.error.message;
      });

    builder
      .addCase(loginPost.pending, (state) => {
        state.loginInfo.status = 'cargando';
        state.loginInfo.isLoged = state.payload;
      })
      .addCase(loginPost.fulfilled, (state, action) => {
        state.loginInfo.status = 'exitoso';
        state.loginInfo.isLoged = action.payload.status;
        sessionStorage.setItem('isLoged', JSON.stringify({ success: action.payload.status }));
      })
      .addCase(loginPost.rejected, (state, action) => {
        state.loginInfo.status = 'fallo';
        state.loginInfo.isLoged = action.error.message;
        sessionStorage.setItem('isLoged', JSON.stringify({ success: action.payload.status }));
      });

    builder
      .addCase(fetchPokemonByUrl.pending, (state) => {
        state.pokemonData.status = 'cargando';
      })
      .addCase(fetchPokemonByUrl.fulfilled, (state, action) => {
        state.pokemonData.status = 'exitoso';
        state.pokemonData.pokemonMiniCard = action.payload;
      })
      .addCase(fetchPokemonByUrl.rejected, (state, action) => {
        state.pokemonData.status = 'fallo';
        state.pokemonData.error = action.error.message;
      });
  }
});

export const { storePokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;
