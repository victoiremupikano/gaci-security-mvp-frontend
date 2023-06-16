import { HomeIcon } from "@heroicons/react/20/solid";
import NoStaffSideNavigationItem from "./NoStaffSideNavigationItem";

export default function NoStaffSideNavigation() {
  return (
    <div className="lg:w-[15%] md:w-[20%] md:block hidden border-r  h-auto">
      <NoStaffSideNavigationItem
        icon={<HomeIcon className="w-6 h-6" />}
        text="Dashboard"
        path="/nostaff/dashboard"
      />
    </div>
  );
}
