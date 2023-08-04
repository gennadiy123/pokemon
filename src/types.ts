export type Pokemon = {
  name: string;
  url: string;
};

export type SortedPokemon = {
  name: string;
  id: number;
  type: string;
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

export type TypeButton = {
  children: string;
  onClick: () => Promise<void> | void;
};
