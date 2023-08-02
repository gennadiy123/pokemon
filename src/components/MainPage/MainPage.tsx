import { SetStateAction, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pokemon, PokemonState } from "../../types";
import { getPokemonList, getPokemonInfo } from "../../redux/middleware";
import { AppDispatch } from "../../redux/store";

export const MainPage = () => {
  const [pokemonPerPage, setPokemonPerPage] = useState<number>(12);
  const [search, setSearch] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const pokemon = useSelector((state: PokemonState) => state.pokemon);

  useEffect(() => {
    dispatch(getPokemonList(pokemonPerPage));
  }, [pokemonPerPage]);

  const getId = (pokemonUrl: string) => {
    const url = new URL(pokemonUrl);
    const id = url.pathname.split("/")[4];
    return id;
  };

  const onLoadPokemon = () => {
    setPokemonPerPage(pokemonPerPage + 12);
    };
    
    const handleChange = (e: { preventDefault: () => void; target: { value: SetStateAction<string>; }; }) => {
        e.preventDefault();
        setSearch(e.target.value);
    }

  const onSearch = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
      console.log('search', search)
      dispatch(getPokemonInfo(search));
  };

  return (
    <>
      <form onSubmit={onSearch}>
        <input placeholder="Search..." value={search} onChange={handleChange} />
      </form>
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
      <button onClick={onLoadPokemon}>Load more</button>
    </>
  );
};
