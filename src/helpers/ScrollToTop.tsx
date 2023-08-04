import { useEffect, ReactNode } from "react";
import { useLocation } from "react-router-dom";

type ScrollToTopProps = {
  children: ReactNode;
};

export const ScrollToTop = ({children}: ScrollToTopProps) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{children}</>
};
