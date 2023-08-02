import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pokemon, PokemonState } from "../../types";
import { getPokemon } from "../../redux/middleware";
import { AppDispatch } from "../../redux/store";

export const MainPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const pokemon = useSelector((state: PokemonState) => state.pokemon);

  useEffect(() => {
    dispatch(getPokemon());
  }, []);

  const getId = (pokemonUrl: string) => {
    const url = new URL(pokemonUrl);
    const id = url.pathname.split("/")[4];
    return id;
  };

  return (
    <>
      {pokemon.map((el: Pokemon) => (
        <div key={el.name}>
          <img
            src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${getId(
              el.url
            )}.svg`}
          />
          <p>{el.name}</p>
        </div>
      ))}
    </>
  );
};
