import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './pokemon-slice.js';

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer
  }
});

export default store;
