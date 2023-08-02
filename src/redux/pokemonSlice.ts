import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pokemon: [],
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    getAllPokemon: (state, action) => {
      state.pokemon = action.payload;
    },
  },
});

export const { getAllPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;
