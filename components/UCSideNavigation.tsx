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
  DocumentChartBarIcon
 } from "@heroicons/react/20/solid";
import UCSideNavigationItem from "./UCSideNavigationItem";
export default function UCSideNavigation() {
  return (
    <div className="lg:w-[15%] md:w-[20%] md:block hidden border-r  h-auto">
      <UCSideNavigationItem
        icon={<HomeIcon className="w-6 h-6" />}
        text="Dashboard"
        path="/unconected/dashboard"
      />
      <UCSideNavigationItem
        icon={<DocumentIcon className="w-6 h-6" />}
        text="Actualitées"
        path="/unconected/pub/"
      />
      <UCSideNavigationItem
        icon={<UserGroupIcon className="w-6 h-6" />}
        text="Adhésion"
        path="/unconected/pricing/"
      />
      <UCSideNavigationItem
        icon={<HeartIcon className="w-6 h-6" />}
        text="Suivis"
        path="/unconected/pages/tracked"
      />
      <UCSideNavigationItem
        icon={<ArchiveBoxIcon className="w-6 h-6" />}
        text="Apropos de nous"
        path="/unconected/pages/about"
      />
    </div>
   );
}