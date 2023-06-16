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
        text="Actualités"
        path="/staff/unconected/pub/"
      />
      <AdminSideNavigationItem
        icon={<UserGroupIcon className="w-6 h-6" />}
        text="Adhésion"
        path="/staff/unconected/pricing/"
      />
      <AdminSideNavigationItem
        icon={<HeartIcon className="w-6 h-6" />}
        text="Suivis"
        path="/staff/unconected/pages/tracked"
      />
      <AdminSideNavigationItem
        icon={<ArchiveBoxIcon className="w-6 h-6" />}
        text="Apropos"
        path="/staff/unconected/pages/about"
      />
      <AdminSideNavigationItem
        icon={<UserGroupIcon className="w-6 h-6" />}
        text="Utilisateurs"
        path="/staff/users"
      />
      <AdminSideNavigationItem
        icon={<CurrencyDollarIcon className="w-6 h-6" />}
        text="Tarification"
        path="/staff/pricing"
      />
      <AdminSideNavigationItem
        icon={<DocumentIcon className="w-6 h-6" />}
        text="Publication"
        path="/staff/post"
      />
      <AdminSideNavigationItem
        icon={<ChartBarIcon className="w-6 h-6" />}
        text="Backup"
        path="/staff/backup"
      />
      <AdminSideNavigationItem
        icon={<ShareIcon className="w-6 h-6" />}
        text="News-letter"
        path="/staff/news-letter"
      />
      <AdminSideNavigationItem
        icon={<DocumentChartBarIcon className="w-6 h-6" />}
        text="SMS"
        path="/staff/sms"
      />
    </div>
  );
}
