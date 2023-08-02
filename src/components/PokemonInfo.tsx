import { useSelector } from "react-redux";
import { PokemonState } from "../types";

export const PokemonInfo = () => {
  const pokemonInfo = useSelector((state: PokemonState) => state.pokemonInfo);

  return (
    <>
      <p>{pokemonInfo.name}</p>
      <img src={pokemonInfo.image} />
      <p>Moves</p>
      <ul>
        {pokemonInfo.moves.map((el) => (
          <li key={el.move.name}>{el.move.name}</li>
        ))}
      </ul>
      <ul>
        <p>Stats</p>
        {pokemonInfo.stats.map((el) => (
          <li key={el.stat.name}>
            {el.stat.name}: {el.base_stat}
          </li>
        ))}
      </ul>
    </>
  );
};
