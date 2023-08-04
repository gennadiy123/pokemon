import { TypeButton } from '../types';
import "../sass/_button.scss";

export const Button = ({ children, onClick }: TypeButton) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};
