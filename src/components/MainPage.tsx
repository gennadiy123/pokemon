import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Search } from "./Search";
import { Pokemon, PokemonState, SortedPokemon } from "../types";
import { getPokemonList, getPokemonInfo } from "../redux/middleware";
import { AppDispatch } from "../redux/store";
import { url, imageUrl } from "../constants";
import { Button } from './Button';
import "../sass/_main-page.scss";

export const MainPage = () => {
  const [pokemonPerPage, setPokemonPerPage] = useState<number>(10);
  const dispatch: AppDispatch = useDispatch();
  const pokemon = useSelector((state: PokemonState) => state.pokemon);
  const navigate = useNavigate();

  const [sortedPokemon, setSortedPokemon] = useState<SortedPokemon[]>([]);
  const [sortingComplete, setSortingComplete] = useState(false);

  useEffect(() => {
    dispatch(getPokemonList(pokemonPerPage));
  }, [pokemonPerPage]);

  const onSort = async () => {
    if (!sortingComplete) {
      const array = [];

      for (const el of pokemon) {
        const data = axios
          .get(`${url}${el.name}`)
          .then((response) => response.data);
        array.push(data);
      }

      const data = await Promise.all(array);
      const sorted = data
        .map(({name, id, types}) => ({
          name: name,
          id: id,
          type: types[0].type.name,
        }))
        .sort((a, b) => (a.type > b.type ? 1 : -1));

      setSortedPokemon(sorted);
      setSortingComplete(true);
    } else {
      setSortingComplete(false);
    }
    
  };

  const onLoadPokemon = () => {
    setSortingComplete(false);
    setPokemonPerPage(pokemonPerPage + 10);
  };

  const onOpenPokemon = async (pokemon: string) => {
    await dispatch(getPokemonInfo(pokemon));
    navigate(`/${pokemon}`);
  };

  const getId = (pokemonUrl: string) => {
    const url = new URL(pokemonUrl);
    const id = url.pathname.split("/")[4];
    return id;
  };

  return (
    <div className="wrapper">
      <div className="navigation">
        <Search />
        <Button  onClick={onSort}>
          {sortingComplete ? "Place by default" : "Sort by type"}
        </Button>
      </div>
      <div className="images">
        {sortingComplete
          ? sortedPokemon.map((el: SortedPokemon) => (
              <div
                onClick={() => onOpenPokemon(el.name)}
                className="image-card"
                key={el.name}
              >
                <img
                  className="image"
                  src={`${imageUrl}${el.id}.svg`}
                  alt={`pokemon ${el.name}`}
                />
                <p className="pokemon-name">{el.name}</p>
              </div>
            ))
          : pokemon.map((el: Pokemon) => (
              <div
                onClick={() => onOpenPokemon(el.name)}
                className="image-card"
                key={el.name}
              >
                <img
                  className="image"
                  src={`${imageUrl}${getId(el.url)}.svg`}
                  alt={`pokemon ${el.name}`}
                />
                <p className="pokemon-name">{el.name}</p>
              </div>
            ))}
      </div>
      <Button onClick={onLoadPokemon}>
        Load more
      </Button>
    </div>
  );
};
