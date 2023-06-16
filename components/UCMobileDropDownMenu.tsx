import {
  ArchiveBoxIcon,
  HeartIcon,
  DocumentIcon,
  HomeIcon,
  UserGroupIcon,
  PowerIcon,
} from "@heroicons/react/20/solid";
import MobileMenuItem from "./MobileMenuItem";
import { useRouter } from "next/router";

declare type Props = {
  onClick: () => void;
};

export default function UCMobileDropDownMenu({ onClick }: Props) {
  const router = useRouter();
  const login = async () => {
    localStorage.clear();
    router.push("/auth/login");
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
        path="/unconected/dashboard"
        Icon={<HomeIcon className="w-6 h-6" />}
      />
      <MobileMenuItem
        onClick={onClick}
        name="Actualités"
        path="/unconected/pub/"
        Icon={<DocumentIcon className="h-7 w-7 " />}
      />
      <MobileMenuItem
        onClick={onClick}
        name="Adhésion"
        path="/unconected/pricing/"
        Icon={<UserGroupIcon className="h-7 w-7 " />}
      />
      <MobileMenuItem
        onClick={onClick}
        name="Suivis"
        path="/unconected/pages/tracked"
        Icon={<HeartIcon className="h-7 w-7 " />}
      />
      <MobileMenuItem
        onClick={onClick}
        name="Apropos"
        path="/unconected/pages/about"
        Icon={<ArchiveBoxIcon className="h-7 w-7 " />}
      />
      <MobileMenuItem
        onClick={login}
        name="Connexion"
        Icon={<PowerIcon className="h-7 w-7 " />}
      />
    </div>
  );
}
