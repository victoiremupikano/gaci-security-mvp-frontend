import Dashboard from "../../components/DashbordUC";
import ReusableHeader from "../../components/ReusableHeader";
import { useEffect } from "react"

export default function UnconectedDashboard() {
    useEffect(() => {
        // on stocke l'id de l'entreprise en cours
        localStorage.setItem("entreprize", "1");
    },[])

    return (
        <>
            <ReusableHeader text="Dashboard"/>
        <Dashboard/>
      </>
    );
}