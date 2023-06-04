import {
  ArchiveBoxArrowDownIcon,
  ArrowLeftOnRectangleIcon,
  Bars3BottomLeftIcon,
  ArchiveBoxIcon,
  ChartBarIcon,
  HeartIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  DocumentIcon,
  GlobeAltIcon,
  GlobeEuropeAfricaIcon,
  HomeModernIcon,
  LinkIcon,
  HomeIcon,
  ListBulletIcon,
  UserCircleIcon,
  UserGroupIcon,
  UserIcon,
  UserPlusIcon,
  UsersIcon,
  ShareIcon,
  DocumentChartBarIcon,
  PowerIcon
} from "@heroicons/react/20/solid";
import MobileMenuItem from "./MobileMenuItem";
import { useRouter } from "next/router";

declare type Props = {
  onClick : () => void
}

export default function UCMobileDropDownMenu({onClick}: Props) {
  const router = useRouter()
  const login = () => {
    localStorage.clear()
    router.push("/auth/login")
  }
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
        name="Actualitées"
        path="/unconected/pub/"
        Icon={<DocumentIcon className="h-7 w-7 " />}
      />
      <MobileMenuItem
        onClick={onClick}
        name="Adhésion"
        path="/unconected/pages/subscriber"
        Icon={<UserGroupIcon className="h-7 w-7 " />}
      />
      <MobileMenuItem
        onClick={onClick}
        name="Tarification"
        path="/unconected/pages/pricing"
        Icon={<CurrencyDollarIcon className="h-7 w-7 " />}
      />
      <MobileMenuItem
        onClick={onClick}
        name="Suivis"
        path="/unconected/pages/tracked"
        Icon={<HeartIcon className="h-7 w-7 " />}
      />
      <MobileMenuItem
        onClick={onClick}
        name="Apropos de nous"
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
