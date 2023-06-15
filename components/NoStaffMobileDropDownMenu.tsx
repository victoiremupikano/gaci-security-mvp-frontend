import {
  ArrowLeftOnRectangleIcon,
  Bars3BottomLeftIcon,
  GlobeEuropeAfricaIcon,
  HomeIcon,
  ListBulletIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import useVerify from "../hooks/useVerify";
import MobileMenuItem from "./MobileMenuItem";
import Auth from "../api/auth"
import { useRouter } from "next/router";

declare type Props = {
  onClick : () => void
}

export default function NoStaffMobileDropDownMenu({onClick}: Props) {
  const router = useRouter()
  const logout = async () => {
    Auth.logout().then(() => {
      localStorage.clear()
      router.push("/auth/login")
    })
  };
  return (
    <div
      data-aos="slide-left"
      data-aos-duration="500"
      className="w-full p-4 flex flex-col h-[100vh] border rounded-b absolute top-14 z-50 bg-white"
    >
      <MobileMenuItem
        onClick={onClick}
        name="Dashboard"
        path="/nostaff/dashboard"
        Icon={<HomeIcon className="w-6 h-6" />}
      />
      <MobileMenuItem
        onClick={logout}
        name="Déconnexion"
        Icon={<ArrowLeftOnRectangleIcon className="h-7 w-7 " />}
      />
    </div>
  );
}
