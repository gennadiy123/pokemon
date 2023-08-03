export type Pokemon = {
  name: string;
  id: number;
  type: string
};

export type PokemonState = {
  pokemon: Pokemon[] | [];
  pokemonInfo: {
    name: string;
    image: string;
    moves: [{ move: { name: string } }];
    stats: [{ base_stat: 60; stat: { name: string } }];
  };
};
