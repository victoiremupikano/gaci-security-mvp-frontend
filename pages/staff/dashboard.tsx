import Dashboard from "../../components/DashbordC";
import ReusableHeader from "../../components/ReusableHeader";
import ReusableFooter from "../../components/ReusableFooter";

export default function StaffDashboard() {
  return (
    <>
      <ReusableHeader text="Dashboard" />
      <Dashboard />
      <ReusableFooter />
    </>
  );
}
