import { ChangeEventHandler } from "react";

declare type Props = {
  name: string;
  value?: string;
  error?: string;
  type: string;
  placeholder: string;
  event: ChangeEventHandler<HTMLInputElement>;
};
export default function Textbox({ name, value, error, type, placeholder, event }: Props) {
    if (type == "date") {
        return (
          <div className="mb-2 w-full">
            <div className="w-full focus-within:font-semibold  text-gray-700 focus-within:text-blue-600 focus-within:border-blue-600 border-2 transition-colors duration-500 border-transparent bg-gray-100 h-10 items-center justify-between flex rounded">
             <span className="w-fit text-sm text-gray-500">{placeholder}</span>
              <input
                onChange={event}
                name={name}
                type='date'
                className="bg-transparent transition-colors duration-500 placeholder:text-sm placeholder:text-gray-500 focus:text-blue-600 focus:outline-none ml-2 w-6/12"
                value={value}
              />
            </div>
            {error ? (
              <span className=" text-red-500 text-xs">{error}</span>
            ) : null}
          </div>
        );
    }
    return (<div className="mb-2 w-full">
        <div className="w-full focus-within:font-semibold  text-gray-700 focus-within:text-blue-600 focus-within:border-blue-600 border-2 transition-colors duration-500 border-transparent bg-gray-100 h-10 items-center flex rounded">
            <input onChange={event} name={name} type={type} placeholder={placeholder} className="bg-transparent transition-colors duration-500 placeholder:text-sm placeholder:text-gray-500 focus:text-blue-600 focus:outline-none ml-2 w-full" value={value} />
        </div>
        {error  ? <span className=" text-red-500 text-xs">{error}</span> : null}
    </div>)
}