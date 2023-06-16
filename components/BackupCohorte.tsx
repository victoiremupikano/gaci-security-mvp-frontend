import { FunctionComponent, useEffect } from "react";
import { useState } from "react";
import Cohorte from "../api/backup/cohorte";
import moment from "moment";
import "moment/locale/fr";

const BackupCohorte: FunctionComponent = () => {
  const [cohorte, setCohorte] = useState<any[]>();
  const getCohorte = async () => {
    const result = await Cohorte.get();
    if (result.results) {
      setCohorte(result.results);
    }
  };
  useEffect(() => {
    getCohorte();
    localStorage.setItem("current_report", "all-cohorte");
    localStorage.setItem("filename", "all_cohorte_backup");
  }, []);
  return (
    <div id="all-cohorte" className="w-11/12 h-full mx-auto">
      <div className="flex my-4 justify-center">
        <h1 className="w-80 font-semibold">LISTE DE TOUS LES COHORTES</h1>
      </div>
      <div className="w-full p-2 border-b mb-2 font-semibold text-gray-700 md:text-base text-xs hidden md:flex justify-between">
        <span className="w-[5%]">#</span>
        <span className="w-[10%]">Idsl</span>
        <span className="w-[20%]">Libélé</span>
        <span className="w-[10%]">Début</span>
        <span className="w-[10%]">Limite</span>
        <span className="w-[5%]">Nbr H.</span>
        <span className="w-[5%]">Nbr A.</span>
        <span className="w-[5%]">% H.</span>
        <span className="w-[5%]">% A.</span>
        <span className="w-[5%] flex">Status</span>
        <span className="w-[10%] flex justify-center">Créé</span>
        <span className="w-[10%]">Modif.</span>
      </div>
      <div className="w-full flex text-xs flex-col  md:justify-between">
        {Array.isArray(cohorte) && cohorte.length > 0
          ? cohorte.map((u) => (
              <div key={u.pk}>
                <div
                  className={`w-full ${
                    cohorte.indexOf(u) % 2 != 0 ? "bg-gray-200" : ""
                  } p-2 mb-2  text-gray-700  md:flex hidden justify-between`}
                >
                  <span className="w-[5%]">{cohorte.indexOf(u) + 1}</span>
                  <span className="w-[10%]">{u?.idsl}</span>
                  <span className="w-[20%]">{u?.wording}</span>
                  <span className="w-[10%]">{u?.dateStart}</span>
                  <span className="w-[10%]">{u?.dateEnd}</span>
                  <span className="w-[5%]">{u?.nbrHosp}</span>
                  <span className="w-[5%]">{u?.nbrAmbu}</span>
                  <span className="w-[5%]">{u?.pourcentHosp}</span>
                  <span className="w-[5%]">{u?.pourcentAmbu}</span>
                  <span
                    className={`w-[5%] font-semibold ${
                      u.status ? "text-green-600" : ""
                    }`}
                  >
                    {u?.status ? "Oui" : "Non"}
                  </span>
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

export default BackupCohorte;
