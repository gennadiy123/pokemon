import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PokemonState } from "../types";
import { Button } from "./Button";
import "../sass/_pokemon-info.scss";

export const PokemonInfo = () => {
  const { name, image, moves, stats } = useSelector(
    (state: PokemonState) => state.pokemonInfo
  );
  const navigate = useNavigate();

  useEffect(() => {
    !name && navigate("/");
  }, []);

  const onMainPage = () => {
    navigate("/");
  };

  return (
    <div className="page-wrapper">
      <h1>Pokemon characteristics</h1>
      <div className="info-wrapper">
        <div className="pokemon-info">
          <div className="section-wrapper">
            <img className="info-image" src={image} />
            <h2>{name}</h2>
          </div>
          <div className="section-wrapper">
            <h2>Stats</h2>
            <ul className="stats">
              {stats.map((el) => (
                <li key={el.stat.name}>
                  <span>{el.stat.name}</span>
                  {el.base_stat}
                </li>
              ))}
            </ul>
          </div>
          <Button onClick={onMainPage}>
            Back to Main page
          </Button>
        </div>
        <div className="section-wrapper">
          <h2>Moves</h2>
          <ul className="moves">
            {moves.map((el) => (
              <li data-weight={el.move.name.length} key={el.move.name}>
                {el.move.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
