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
    },
    types: {
      status: 'exitoso',
      types: [],
      error: null
    }
  },
  reducers: {
    clearAllData(state) {
      state.pokemonData.pokemon = null;
      state.pokemonData.status = 'exitoso';
      state.pokemonData.error = null;
      state.pokemonData.pokemonMiniCard = null;
      state.types.status = 'exitoso';
      state.types.types = [];
      state.types.error = null;
    }
  },
  extraReducers: (builder) => {
    const { fetchPokemonByName, loginPost, fetchPokemonByUrl, fetchAllTypes } = pokemonService;
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
      .addCase(fetchAllTypes.pending, (state) => {
        state.types.status = 'cargando';
      })
      .addCase(fetchAllTypes.fulfilled, (state, action) => {
        state.types.status = 'exitoso';
        state.types.types = action.payload.results;
      })
      .addCase(fetchAllTypes.rejected, (state, action) => {
        state.types.status = 'fallo';
        state.types.error = action.error.message;
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

export const { clearAllData } = pokemonSlice.actions;
export default pokemonSlice.reducer;
