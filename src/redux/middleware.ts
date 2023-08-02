import axios from "axios";
import { Dispatch } from "redux";
import { getAllPokemon, getPokemon } from "./pokemonSlice";

const url = "https://pokeapi.co/api/v2/pokemon/";

export const getPokemonList = (pokemonPerPage: number) => {
  return async (dispatch: Dispatch) => {
    await axios
      .get(`${url}?limit=${pokemonPerPage}`)
      .then((response) => response.data)
      .then((data) => dispatch(getAllPokemon(data.results)));
  };
};

export const getPokemonInfo = (pokemon: string) => {
  return async (dispatch: Dispatch) => {
    await axios
      .get(`${url}${pokemon}`)
      .then((response) => response.data)
      // .then((data) =>
      //   console.log("data", {
      //     name: data.name,
      //     image: `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${data.id}.svg`,
      //     moves: data.moves,
      //     stats: data.stats,
      //   })
      // )
      .then((data) => dispatch(getPokemon({
          name: data.name,
          image: `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${data.id}.svg`,
          moves: data.moves,
          stats: data.stats,
        })));
  };
}
