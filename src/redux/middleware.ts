import axios from "axios";
import { Dispatch } from "redux";
import { getAllPokemon, getPokemon } from "./pokemonSlice";
import { url, imageUrl } from '../constants'

export const getPokemonList = (pokemonPerPage: number) => {
  return async (dispatch: Dispatch) => {
    await axios
      .get(`${url}?limit=${pokemonPerPage}`)
      .then((response) => response.data)
      .then((data) => dispatch(getAllPokemon(data.results)))
      .catch((error) => alert(error));
  };
};

export const getPokemonInfo = (pokemon: string) => {
  return async (dispatch: Dispatch) => {
    await axios
      .get(`${url}${pokemon}`)
      .then((response) => response.data)
      .then(({ name, id, moves, stats }) =>
        dispatch(
          getPokemon({
            name: name,
            image: `${imageUrl}${id}.svg`,
            moves: moves,
            stats: stats,
          })
        )
      ).catch(error => alert(error))
  };
}
