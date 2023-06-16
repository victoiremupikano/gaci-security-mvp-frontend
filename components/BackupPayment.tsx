import { FunctionComponent, useEffect } from "react";
import { useState } from "react";
import Payment from "../api/backup/payment";
import moment from "moment";
import "moment/locale/fr";

const BackupPayment: FunctionComponent = () => {
  const [payment, setPayment] = useState<any[]>();
  const getPayment = async () => {
    const result = await Payment.get();
    if (result.results) {
      setPayment(result.results);
    }
  };
  useEffect(() => {
    getPayment();
    localStorage.setItem("current_report", "all-payment");
    localStorage.setItem("filename", "all_payment_backup");
  }, []);
  return (
    <div id="all-Payment" className="w-11/12 h-full mx-auto">
      <div className="flex my-4 justify-center">
        <h1 className="w-80 font-semibold">LISTE DE TOUS LES PAIEMENTS</h1>
      </div>
      <div className="w-full p-2 border-b mb-2 font-semibold text-gray-700 md:text-base text-xs hidden md:flex justify-between">
        <span className="w-[5%]">#</span>
        <span className="w-[10%]">Idsl</span>
        <span className="w-[20%]">DCI catégorie</span>
        <span className="w-[15%]">Mt à payer</span>
        <span className="w-[15%]">Mt payer</span>
        <span className="w-[15%]">Solde</span>
        <span className="w-[10%] flex justify-center">Créé</span>
        <span className="w-[10%]">Modif.</span>
      </div>
      <div className="w-full flex text-xs flex-col  md:justify-between">
        {Array.isArray(payment) && payment.length > 0
          ? payment.map((u) => (
              <div key={u.pk}>
                <div
                  className={`w-full ${
                    payment.indexOf(u) % 2 != 0 ? "bg-gray-200" : ""
                  } p-2 mb-2  text-gray-700  md:flex hidden justify-between`}
                >
                  <span className="w-[5%]">{payment.indexOf(u) + 1}</span>
                  <span className="w-[10%]">{u?.idsl}</span>
                  <span className="w-[20%]">{u?.categoryMember}</span>
                  <span className="w-[15%]">{u?.mtAPayer}</span>
                  <span className="w-[15%]">{u?.mtPayer}</span>
                  <span className="w-[15%]">{u?.solde}</span>
                  <span className="w-[10%] flex justify-center">
                    {moment(u?.date_add).format("ll")}
                  </span>
                  <span className="w-[10%]">
                    {moment(u?.date_update).fromNow(true)}.
                  </span>
                </div>
              </div>
            ))
          : "No data"}
      </div>
    </div>
  );
};

export default BackupPayment;
