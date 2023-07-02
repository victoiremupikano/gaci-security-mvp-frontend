import {
  ChartBarIcon,
  CurrencyDollarIcon,
  DocumentIcon,
  HomeIcon,
  UserGroupIcon,
  ShareIcon,
  DocumentChartBarIcon,
  ArchiveBoxIcon,
  HeartIcon,
} from "@heroicons/react/20/solid";
import AdminSideNavigationItem from "./AdminSideNavigationItem";

export default function AdminSideNavigation() {
  return (
    <div className="lg:w-[15%] md:w-[20%]  h-[calc(100vh-48px)] overflow-auto  md:block hidden  md:border-r">
      <AdminSideNavigationItem
        icon={<HomeIcon className="w-6 h-6" />}
        text="Dashboard"
        path="/staff/dashboard"
      />
      <AdminSideNavigationItem
        icon={<DocumentIcon className="w-6 h-6" />}
        text="Envie de recherche"
        path="/staff/wtr/"
      />
      <AdminSideNavigationItem
        icon={<UserGroupIcon className="w-6 h-6" />}
        text="Couvre-feu"
        path="/staff/cai/"
      />
      <AdminSideNavigationItem
        icon={<HeartIcon className="w-6 h-6" />}
        text="Alerte population"
        path="/staff/pa/"
      />
      <AdminSideNavigationItem
        icon={<UserGroupIcon className="w-6 h-6" />}
        text="Identification"
        path="/staff/ident/"
      />
    </div>
  );
}
