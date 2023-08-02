import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pokemon: [],
  pokemonInfo: {
    name: '',
    image: '',
    moves: [],
    stats: []
  }
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    getAllPokemon: (state, action) => {
      state.pokemon = action.payload;
    },
    getPokemon: (state, action) => {
      state.pokemonInfo = action.payload;
    },
  },
});

export const { getAllPokemon, getPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;
