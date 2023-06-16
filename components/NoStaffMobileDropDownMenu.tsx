import {
  ArchiveBoxIcon,
  ArrowLeftOnRectangleIcon,
  DocumentIcon,
  HeartIcon,
  HomeIcon,
  UserGroupIcon
} from "@heroicons/react/20/solid";
import MobileMenuItem from "./MobileMenuItem";
import Auth from "../api/auth";
import { useRouter } from "next/router";

declare type Props = {
  onClick: () => void;
};

export default function NoStaffMobileDropDownMenu({ onClick }: Props) {
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
      className="w-full p-4 flex flex-col h-[100vh] border rounded-b absolute top-14 z-50 bg-white"
    >
      <MobileMenuItem
        onClick={onClick}
        name="Dashboard"
        path="/nostaff/dashboard"
        Icon={<HomeIcon className="w-6 h-6" />}
      />
      <MobileMenuItem
        onClick={onClick}
        name="Actualités"
        path="/nostaff/unconected/pub/"
        Icon={<DocumentIcon className="h-7 w-7 " />}
      />
      <MobileMenuItem
        onClick={onClick}
        name="Adhésion"
        path="/nostaff/unconected/pricing/"
        Icon={<UserGroupIcon className="h-7 w-7 " />}
      />
      <MobileMenuItem
        onClick={onClick}
        name="Suivis"
        path="/nostaff/unconected/pages/tracked"
        Icon={<HeartIcon className="h-7 w-7 " />}
      />
      <MobileMenuItem
        onClick={onClick}
        name="Apropos"
        path="/nostaff/unconected/pages/about"
        Icon={<ArchiveBoxIcon className="h-7 w-7 " />}
      />
      <MobileMenuItem
        onClick={logout}
        name="Déconnexion"
        Icon={<ArrowLeftOnRectangleIcon className="h-7 w-7 " />}
      />
    </div>
  );
}
