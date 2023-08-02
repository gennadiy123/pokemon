export type Pokemon = {
  name: string;
  url: string;
};

export type PokemonState = {
  pokemon: [];
  pokemonInfo: {
    name: string;
    image: string;
    moves: [{ move: { name: string } }];
    stats: [{ base_stat: 60, stat: {name: string}}];
  };
};
