import clsx from "clsx";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={clsx("max-w-280 mx-auto px-3", className)}>{children}</div>
  );
};

export default Container;
