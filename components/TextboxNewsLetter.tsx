import { ChangeEventHandler } from "react";

declare type Props = {
  name: string;
  value?: string;
  error?: string;
  type: string;
  placeholder: string;
  event: ChangeEventHandler<HTMLInputElement>;
};
export default function TextboxNewsLetter({
  name,
  value,
  error,
  type,
  placeholder,
  event,
}: Props) {
  return (
    <div className="py-4">
      <div>
      <input
        onChange={event}
        name={name}
        type={type}
        placeholder={placeholder}
        className="text shadow border rounded w-9/12 py-3 px-3
        text-gray-700 focus:outline-none focus:shadow-outline"
        value={value}
      />
      </div>
      {error ? <span className=" text-red-500 text-xs">{error}</span> : null}
    </div>
  );
}
