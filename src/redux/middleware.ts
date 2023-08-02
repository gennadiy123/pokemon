import axios from "axios";
import { Dispatch } from "redux";
import { getAllPokemon } from "./pokemonSlice";
// import { Pokemon } from "../types";


const url = "https://pokeapi.co/api/v2/pokemon/";

export const getPokemon = () => {
  return async (dispatch: Dispatch) => {
    //-------------------------------------------------------------------------------------
    // try {
    //   // eslint-disable-next-line prefer-const
    //   // let data: Promise<unknown>[] = [];
    //   const data: any[] = [];
    //   const getPokemonData = async (pokemon: string) => {
    //     const pokemonData = await axios
    //       .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
    //       .then((response) => response.data);

    //     // console.log("pokemonData", pokemonData);
    //     return pokemonData;
    //   };

    //   //   const getAllPokemonData = async () => {
    //   await axios
    //     .get("http://pokeapi.co/api/v2/pokemon/?limit=2")
    //     .then((response) => response.data)
    //     .then((pokemon) => {
    //       // console.log('pokemon111', pokemon)
    //       pokemon.results.forEach((pokemon: Pokemon) => {
    //         // const pokemonName = getPokemonData(pokemon.name).then(pokemon => console.log('pokemon000', pokemon));
    //         // getPokemonData(pokemon.name).then((pokemon) => data.push(pokemon));
    //         getPokemonData(pokemon.name).then((pokemon) => console.log('pokemon', pokemon));
    //         // data.push(pokemonName)
    //         // console.log('pokemonName', pokemonName)
    //       });
    //     });
    //   //   };
    //     // console.log('data', data)
    //   dispatch(getAllPokemon(data));
    // } catch (error) {
    //   console.log("error", error);
    // }
    //-------------------------------------------------------------------------------------------------------------
    axios
      .get(`${url}?limit=3`)
      .then((response) => response.data)
      .then((data) => dispatch(getAllPokemon(data.results)));
  };
};
