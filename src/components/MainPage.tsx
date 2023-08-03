import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Search } from "./Search";
import { Pokemon, PokemonState } from "../types";
import { getPokemonList } from "../redux/middleware";
import { AppDispatch } from "../redux/store";
import { url, imageUrl } from "../constants";
import "../sass/_main-page.scss";

export const MainPage = () => {
  const [pokemonPerPage, setPokemonPerPage] = useState<number>(10);
  const dispatch: AppDispatch = useDispatch();
  const pokemon = useSelector((state: PokemonState) => state.pokemon);

  const [sortedPokemon, setSortedPokemon] = useState<Pokemon[]>([]);
  const [sortingComplete, setSortingComplete] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      const array = [];

      for (const el of pokemon) {
        const data = axios
          .get(`${url}${el.name}`)
          .then((response) => response.data);
        array.push(data);
      }

      const data = await Promise.all(array);
      const sorted = data
        .map((el) => ({
          name: el.name,
          id: el.id,
          type: el.types[0].type.name,
        }))
        .sort((a, b) => (a.type > b.type ? 1 : -1));

      setSortedPokemon(sorted);
      setSortingComplete(true);
    };

    if (pokemon.length) {
      fetchPokemon();
    }
  }, [pokemon]);

  useEffect(() => {
    dispatch(getPokemonList(pokemonPerPage));
  }, [pokemonPerPage]);

  const onLoadPokemon = () => {
    setPokemonPerPage(pokemonPerPage + 10);
  };

  return (
    <div className="wrapper">
      <Search />
      <div className="images">
        {sortingComplete ? (
          sortedPokemon.map((el: Pokemon) => (
            <div className="image-card" key={el.name}>
              <img
                className="image"
                src={`${imageUrl}${el.id}.svg`}
                alt={`pokemon ${el.name}`}
              />
              <p>{el.name}</p>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <button className="button" onClick={onLoadPokemon}>Load more</button>
    </div>
  );
};
