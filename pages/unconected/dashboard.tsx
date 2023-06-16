import Dashboard from "../../components/DashbordUC";
import ReusableHeader from "../../components/ReusableHeader";
import ReusableFooter from "../../components/ReusableFooter";

export default function UnconectedDashboard() {
  return (
    <>
      <ReusableHeader text="Dashboard" />
      <Dashboard />
      <ReusableFooter />
    </>
  );
}
