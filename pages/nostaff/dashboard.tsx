import Dashboard from "../../components/DashbordC";
import ReusableHeader from "../../components/ReusableHeader";
import ReusableFooter from "../../components/ReusableFooter";

export default function NoStaffDashboard() {
    return (
        <>
            <ReusableHeader text="Dashboard"/>
            <Dashboard/>
            <ReusableFooter />
      </>
    );
}