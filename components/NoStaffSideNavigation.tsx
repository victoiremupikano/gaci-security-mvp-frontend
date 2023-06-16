import { ArchiveBoxIcon, DocumentIcon, HeartIcon, HomeIcon, UserGroupIcon } from "@heroicons/react/20/solid";
import NoStaffSideNavigationItem from "./NoStaffSideNavigationItem";

export default function NoStaffSideNavigation() {
  return (
    <div className="lg:w-[15%] md:w-[20%] md:block hidden border-r  h-auto">
      <NoStaffSideNavigationItem
        icon={<HomeIcon className="w-6 h-6" />}
        text="Dashboard"
        path="/nostaff/dashboard"
      />
      <NoStaffSideNavigationItem
        icon={<DocumentIcon className="w-6 h-6" />}
        text="Actualités"
        path="/nostaff/unconected/pub/"
      />
      <NoStaffSideNavigationItem
        icon={<UserGroupIcon className="w-6 h-6" />}
        text="Adhésion"
        path="/nostaff/unconected/pricing/"
      />
      <NoStaffSideNavigationItem
        icon={<HeartIcon className="w-6 h-6" />}
        text="Suivis"
        path="/nostaff/unconected/pages/tracked"
      />
      <NoStaffSideNavigationItem
        icon={<ArchiveBoxIcon className="w-6 h-6" />}
        text="Apropos"
        path="/nostaff/unconected/pages/about"
      />
    </div>
  );
}
