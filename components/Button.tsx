import { MouseEventHandler } from "react";

declare type Props = {
  content: string | JSX.Element;
  type: "submit" | "reset" | "button";
  size: "full" | "fit";
  design: "primary" | "secondary";
  event: MouseEventHandler<HTMLButtonElement>;
};

export default function Button({ content, type, design, size, event }: Props) {
  if (design === "primary") {
    return (
      <button
        onClick={event}
        className={`text-white hover:shadow-lg hover:shadow-blue-300 my-2 rounded py-1 bg-blue-600 ${
          size == "full" ? "w-full h-10" : "w-fit px-1.5 py-1.5 h-fit"
        }`}
        type={type}
      >
        {content}
      </button>
    );
  } else {
    return (
      <button
        onClick={event}
        className={`text-blue-600 border-2 border-blue-600 my-2 rounded-md p-1 bg-transparent  ${
          size == "full" ? "w-full h-10" : "w-fit h-fit"
        }`}
        type={type}
      >
        {content}
      </button>
    );
  }
}
