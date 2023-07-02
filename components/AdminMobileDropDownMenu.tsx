import {
  ArrowLeftOnRectangleIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  DocumentIcon,
  HomeModernIcon,
  UserGroupIcon,
  ShareIcon,
  DocumentChartBarIcon,
  HeartIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/20/solid";
import MobileMenuItem from "./MobileMenuItem";
import Auth from "../api/auth";
import { useRouter } from "next/router";

declare type Props = {
  onClick: () => void;
};

export default function AdminMobileDropDownMenu({ onClick }: Props) {
  const router = useRouter();
  const logout = async () => {
    Auth.logout().then(() => {
      localStorage.clear();
      router.push("/auth/login");
    });
  };
  return (
    <div
      data-aos="slide-left"
      data-aos-duration="500"
      className="w-full p-4 flex flex-col h-[calc(100vh-48px)] overflow-auto border rounded-b absolute top-[2.75rem] z-50 bg-white"
    >
      <MobileMenuItem
        onClick={onClick}
        name="Dashboard"
        path="/staff/dashboard"
        Icon={<HomeModernIcon className="h-7 w-7 " />}
      />
      <MobileMenuItem
        onClick={onClick}
        name="Envie de recherche"
        path="/staff/wtr/"
        Icon={<DocumentIcon className="h-7 w-7 " />}
      />
      <MobileMenuItem
        onClick={onClick}
        name="Couvre-feu"
        path="/staff/cai/"
        Icon={<UserGroupIcon className="h-7 w-7 " />}
      />
      <MobileMenuItem
        onClick={onClick}
        name="Alerte population"
        path="/staff/pa/"
        Icon={<HeartIcon className="h-7 w-7 " />}
      />
      <MobileMenuItem
        onClick={onClick}
        name="Identification"
        path="/staff/ident"
        Icon={<UserGroupIcon className="h-7 w-7 " />}
      />
      <MobileMenuItem
        onClick={logout}
        name="Déconnexion"
        Icon={<ArrowLeftOnRectangleIcon className="h-7 w-7 " />}
      />
    </div>
  );
}
