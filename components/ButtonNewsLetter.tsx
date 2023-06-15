import { MouseEventHandler } from "react";

declare type Props = {
  content: string | JSX.Element;
  type: "submit" | "reset" | "button";
  size: "full" | "fit";
  design: "primary" | "secondary";
  event: MouseEventHandler<HTMLButtonElement>;
};
export default function ButtonNewsLetter({
  content,
  type,
  design,
  size,
  event,
}: Props) {
  return (
    <button
      onClick={event}
      className={`bg-blue-400 px-20 py-3 rounded-full text-gray-50 text-xl ${
        size == "full" ? "w-full h-10" : "w-fit px-1.5 py-1.5 h-fit"
      }`}
      type={type}
    >
      {content}
    </button>
  );
}
