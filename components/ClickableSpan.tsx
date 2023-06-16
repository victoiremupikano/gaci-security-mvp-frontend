import { FunctionComponent, ReactNode } from "react";

type Props = {
  onClick?: () => void;
  children: ReactNode;
  color?: "blue" | "red" | "green" | "gray";
};

const ClickableSpan: FunctionComponent<Props> = ({
  onClick,
  children,
  color = "blue",
}) => {
  return (
    <span
      onClick={onClick}
      className={`text-white bg-${color}-600  flex justify-around items-center hover:shadow-lg hover:bg-${color}-800 hover:shadow-${color}-300 cursor-pointer flex items-center justify-around p-1 rounded`}
    >
      {children}
    </span>
  );
};

export default ClickableSpan;
