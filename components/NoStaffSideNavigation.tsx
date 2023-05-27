import { HomeIcon } from "@heroicons/react/20/solid";
import AdminSideNavigationItem from "./AdminSideNavigationItem";
export default function NoStaffSideNavigation() {
  return (
    <div className="lg:w-[15%] md:w-[20%] md:block hidden border-r  h-auto">
      <AdminSideNavigationItem
        icon={<HomeIcon className="w-6 h-6" />}
        text="Dashboard"
        path="/staff/dashboard"
      />
    </div>
   );
}