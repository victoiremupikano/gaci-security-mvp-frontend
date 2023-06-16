import {
  Bars3BottomLeftIcon,
  PowerIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Auth from "../api/auth";
import useVerify from "../hooks/useVerify";
import NoStaffMobileDropDownMenu from "./NoStaffMobileDropDownMenu";

export default function NoStaffNavigation() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const onClick = () => setShowMobileMenu(false);
  const t = useVerify();
  const router = useRouter();
  const logout = async () => {
    await Auth.logout();
    localStorage.clear();
    router.push("/auth/login");
  };
  return (
    <header className="w-full relative flex bg-white h-14">
      <div className="w-[99%] h-full flex items-center justify-between mx-auto ">
        <span className="text-blue-600 w-fit font-bold text-xl">MUSACOM</span>{" "}
        <div className="flex text-gray-600 w-fit justify-around">
          <Link
            href={"/nostaff/profile"}
            className=" hover:bg-gray-100 mr-1.5 cursor-pointer duration-500 transition-colors h-8 w-8 p-0.5 rounded border grid place-items-center"
          >
            <UserIcon className="w-6 h-6" />
          </Link>
          {t === true && (
            <span
              onClick={logout}
              className=" hover:bg-gray-100 mr-1.5  cursor-pointer duration-500 transition-colors h-8 w-8 p-0.5 rounded border hidden md:grid place-items-center"
            >
              <PowerIcon className="w-6 h-6" />
            </span>
          )}
          {!showMobileMenu ? (
            <span
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className=" hover:bg-gray-100 cursor-pointer duration-500 transition-colors h-8 w-8 p-0.5 rounded border grid place-items-center"
            >
              <Bars3BottomLeftIcon className="w-6 h-6" />
            </span>
          ) : (
            <span
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className=" hover:bg-gray-100 cursor-pointer duration-500 transition-colors h-8 w-8 p-0.5 rounded border grid place-items-center"
            >
              <XMarkIcon className="w-6 h-6" />
            </span>
          )}
        </div>
      </div>
      {showMobileMenu && <NoStaffMobileDropDownMenu onClick={onClick} />}
    </header>
  );
}
