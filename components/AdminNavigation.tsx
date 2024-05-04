import {
  Bars3BottomLeftIcon,
  Bars3Icon,
  PowerIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import Link from "next/link";
import AdminMobileDropDownMenu from "./AdminMobileDropDownMenu";
import useVerify from "../hooks/useVerify";
import Auth from "../api/auth";
import { useRouter } from "next/router";
import BackupMobileMenu from "./BackupMobileMenu";

export default function AdminNavigation() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBackupMenu, setShowBackupMenu] = useState(false);
  const menuClicked = () => setShowMobileMenu(false);
  const menuBackupClicked = () => setShowBackupMenu(false);
  const t = useVerify();
  const router = useRouter();
  const logout = async () => {
    await Auth.logout();
    localStorage.clear();
    router.push("/auth/login");
  };
  return (
    <header className="w-full mx-auto relative flex bg-white h-12 md:border-b">
      <div className="w-[95%] md:w-[99%] mx-auto  h-full flex items-center justify-between">
        <span className="text-blue-600 font-bold w-[50%] text-xl">GACI</span>{" "}
        <div className="flex text-gray-600 w-fit justify-around">
          {router.pathname.includes("backup") && (
            <>
              <span
                onClick={() => setShowBackupMenu((t) => !t)}
                className=" hover:bg-gray-100 cursor-pointer duration-500 mr-1.5 lg:hidden transition-all h-8 w-8 p-0.5 rounded border grid place-items-center"
              >
                <Bars3Icon className="w-6 h-6" />
              </span>
            </>
          )}
          <Link
            href="/staff/profile"
            className=" hover:bg-gray-100 mr-1.5 cursor-pointer duration-500 transition-colors h-8 w-8 p-0.5 rounded border grid place-items-center"
          >
            <UserIcon className="w-6 h-6" />
          </Link>
          {t === true && (
            <span
              onClick={logout}
              className=" hover:bg-gray-100 mr-1.5 cursor-pointer duration-500 transition-colors h-8 w-8 p-0.5 rounded border grid place-items-center"
            >
              <PowerIcon className="w-6 h-6" />
            </span>
          )}
          {showMobileMenu === true ? (
            <span
              onClick={() => setShowMobileMenu(false)}
              className=" hover:bg-gray-100 cursor-pointer duration-500 transition-all h-8 w-8 p-0.5 rounded border grid place-items-center"
            >
              <XMarkIcon className="w-6 h-6" />
            </span>
          ) : (
            <span
              onClick={() => setShowMobileMenu(true)}
              className=" hover:bg-gray-100 cursor-pointer duration-500 transition-all h-8 w-8 p-0.5 rounded border grid place-items-center"
            >
              <Bars3BottomLeftIcon className="w-6 h-6" />
            </span>
          )}
        </div>
      </div>
      {showMobileMenu === true ? (
        <AdminMobileDropDownMenu onClick={menuClicked} />
      ) : null}
      {showBackupMenu === true ? (
        <BackupMobileMenu onClick={menuBackupClicked} />
      ) : null}
    </header>
  );
}
