import { FunctionComponent, useEffect } from "react";
import { useState } from "react";
import Enrolment from "../api/backup/enrolment";
import moment from "moment";
import "moment/locale/fr";

const BackupEnrolment: FunctionComponent = () => {
  const [enrolment, setEnrolment] = useState<any[]>();
  const getEnrolment = async () => {
    const result = await Enrolment.get();
    if (result.results) {
      setEnrolment(result.results);
    }
  };
  useEffect(() => {
    getEnrolment();
    localStorage.setItem("current_report", "all-enrolment");
    localStorage.setItem("filename", "all_enrolment_backup");
  }, []);
  return (
    <div id="all-enrolment" className="w-11/12 h-full mx-auto">
      <div className="flex my-4 justify-center">
        <h1 className="w-80 font-semibold">LISTE DE TOUS LES ADHESIONS</h1>
      </div>
      <div className="w-full p-2 border-b mb-2 font-semibold text-gray-700 md:text-base text-xs hidden md:flex justify-between">
        <span className="w-[5%]">#</span>
        <span className="w-[10%]">Idsl</span>
        <span className="w-[15%]">Date</span>
        <span className="w-[20%]">DCI catégorie</span>
        <span className="w-[15%]">DCI membre</span>
        <span className="w-[15%]">DCI Cohorte</span>
        <span className="w-[10%] flex justify-center">Créé</span>
        <span className="w-[10%]">Modif.</span>
      </div>
      <div className="w-full flex text-xs flex-col  md:justify-between">
        {Array.isArray(enrolment) && enrolment.length > 0
          ? enrolment.map((u) => (
              <div key={u.pk}>
                <div
                  className={`w-full ${
                    enrolment.indexOf(u) % 2 != 0 ? "bg-gray-200" : ""
                  } p-2 mb-2  text-gray-700  md:flex hidden justify-between`}
                >
                  <span className="w-[5%]">{enrolment.indexOf(u) + 1}</span>
                  <span className="w-[10%]">{u?.idsl}</span>
                  <span className="w-[25%]">{u?.dte}</span>
                  <span className="w-[20%]">{u?.categoryMember}</span>
                  <span className="w-[15%]">{u?.namesMember}</span>
                  <span className="w-[15%]">{u?.namesCohorte}</span>
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

export default BackupEnrolment;
