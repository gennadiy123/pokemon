import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PokemonState } from "../types";
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
      <div className="info-wrapper">
        <div className="section-wrapper">
          <h1>{name}</h1>
          <img className="info-image" src={image} />
        </div>
        <div className="section-wrapper">
          <h2>Moves</h2>
          <ul className="moves">
            {moves.map((el) => (
              <li key={el.move.name}>{el.move.name}</li>
            ))}
          </ul>
        </div>
        <div className="section-wrapper">
          <h2>Stats</h2>
          <ul>
            {stats.map((el) => (
              <li key={el.stat.name}>
                {el.stat.name}: {el.base_stat}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button className='main-page-button' onClick={onMainPage}>Back to Main page</button>
    </div>
  );
};
