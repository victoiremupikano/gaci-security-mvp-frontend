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
        text="Envie de recherche"
        path="/nostaff/pub/wtr/"
      />
      <NoStaffSideNavigationItem
        icon={<UserGroupIcon className="w-6 h-6" />}
        text="Couvre-feu"
        path="/nostaff/pub/cai/"
      />
      <NoStaffSideNavigationItem
        icon={<HeartIcon className="w-6 h-6" />}
        text="Alerte d'insécurité"
        path="/nostaff/pa/add"
      />
    </div>
  );
}
