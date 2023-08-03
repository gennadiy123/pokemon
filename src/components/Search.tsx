import { SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPokemonInfo } from "../redux/middleware";
import { AppDispatch } from "../redux/store";

export const Search = () => {
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const handleChange = (e: {
    preventDefault: () => void;
    target: { value: SetStateAction<string> };
  }) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const onSearch = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await dispatch(getPokemonInfo(search));
    setSearch("");
    navigate(`/${search}`);
  };

  return (
    <form onSubmit={onSearch}>
      <input placeholder="Search..." value={search} onChange={handleChange} />
    </form>
  );
};
