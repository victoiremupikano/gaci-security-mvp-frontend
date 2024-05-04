import { Bars3BottomLeftIcon } from "@heroicons/react/20/solid";

export default function Navigation() {
  return (
    <header className="w-full flex bg-white h-14">
      <div className="w-11/12 h-full flex items-center justify-between mx-auto ">
        <span className="text-blue-600 font-bold text-xl">GACI</span>{" "}
        <span className=" hover:bg-gray-100 cursor-pointer duration-500 transition-colors h-8 w-8 p-0.5 rounded border grid place-items-center">
          <Bars3BottomLeftIcon className="w-6 h-6" />
        </span>
      </div>
    </header>
  );
}
