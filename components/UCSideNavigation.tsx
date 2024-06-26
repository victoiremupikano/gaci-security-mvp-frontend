import {
  ArchiveBoxIcon,
  HeartIcon,
  DocumentIcon,
  HomeIcon,
  UserGroupIcon
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
        text="Actualités"
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
        text="Apropos"
        path="/unconected/pages/about"
      />
    </div>
  );
}
