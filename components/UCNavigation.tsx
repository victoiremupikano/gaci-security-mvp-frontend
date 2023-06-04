import { ArrowLeftOnRectangleIcon, Bars3BottomLeftIcon, PowerIcon, UserIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useRouter } from "next/router";
import useVerify from "../hooks/useVerify";
import UCMobileDropDownMenu from "./UCMobileDropDownMenu";

export default function UCNavigation() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const onClick = () => setShowMobileMenu(false)
  const router = useRouter();
  const login = async () => {
    localStorage.clear();
    router.push("/auth/login");
  };
  return (
    <header className="w-full relative flex bg-white h-14">
      <div className="w-[99%] h-full flex items-center justify-between mx-auto ">
        <span className="text-blue-600 w-fit font-bold text-xl">MUSACOM</span>{" "}
        <div className="flex text-gray-600 w-fit justify-around">
          {/* on met le button pour nous envoyer sur le login */}
          <span
            onClick={login}
            className=" hover:bg-gray-100 mr-1.5  cursor-pointer duration-500 transition-colors h-8 w-8 p-0.5 rounded border hidden md:grid place-items-center"
            >
            <PowerIcon className="w-6 h-6" />
          </span>
          {!showMobileMenu ? <span
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className=" hover:bg-gray-100 cursor-pointer duration-500 transition-colors h-8 w-8 p-0.5 rounded border grid place-items-center"
          >
            <Bars3BottomLeftIcon className="w-6 h-6" />
          </span> : <span
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className=" hover:bg-gray-100 cursor-pointer duration-500 transition-colors h-8 w-8 p-0.5 rounded border grid place-items-center"
          >
            <XMarkIcon className="w-6 h-6" />
          </span> }
        </div>
      </div>
      {showMobileMenu && <UCMobileDropDownMenu onClick={onClick} />}
    </header>
  );
}
