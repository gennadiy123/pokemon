import {useEffect} from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PokemonState } from "../types";

export const PokemonInfo = () => {
  const {name, image, moves, stats} = useSelector((state: PokemonState) => state.pokemonInfo);
  const navigate = useNavigate();

  useEffect(() => {
    !name && navigate("/");
  }, [])

  const onMainPage = () => {
    navigate("/");
  };

  return (
    <>
      <p>{name}</p>
      <img src={image} />
      <p>Moves</p>
      <ul>
        {moves.map((el) => (
          <li key={el.move.name}>{el.move.name}</li>
        ))}
      </ul>
      <ul>
        <p>Stats</p>
        {stats.map((el) => (
          <li key={el.stat.name}>
            {el.stat.name}: {el.base_stat}
          </li>
        ))}
      </ul>
      <button onClick={onMainPage}>Back to Main page</button>
    </>
  );
};
