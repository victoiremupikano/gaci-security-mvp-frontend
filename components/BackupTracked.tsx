import { FunctionComponent, useEffect } from "react";
import { useState } from "react";
import Tracked from "../api/backup/tracked";
import moment from "moment";
import "moment/locale/fr";

const BackupTracked: FunctionComponent = () => {
  const [tracked, setTracked] = useState<any[]>();
  const getTracked = async () => {
    const result = await Tracked.get();
    if (result.results) {
      setTracked(result.results);
    }
  };
  useEffect(() => {
    getTracked();
    localStorage.setItem("current_report", "all-tracked");
    localStorage.setItem("filename", "all_tracked_backup");
  }, []);
  return (
    <div id="all-tracked" className="w-11/12 h-full mx-auto">
      <div className="flex my-4 justify-center">
        <h1 className="w-80 font-semibold">LISTE DE TOUS LES BONS</h1>
      </div>
      <div className="w-full p-2 border-b mb-2 font-semibold text-gray-700 md:text-base text-xs hidden md:flex justify-between">
        <span className="w-[5%]">#</span>
        <span className="w-[5%]">Idsl</span>
        <span className="w-[10%]">Type</span>
        <span className="w-[10%]">Date</span>
        <span className="w-[10%]">Libélé</span>
        <span className="w-[10%]">Mt.</span>
        <span className="w-[10%]">DCI Membre</span>
        <span className="w-[10%]">Nbr Hosp.</span>
        <span className="w-[10%]">Nbr Amb.</span>
        <span className="w-[10%] flex justify-center">Créé</span>
        <span className="w-[10%]">Modif.</span>
      </div>
      <div className="w-full flex text-xs flex-col  md:justify-between">
        {Array.isArray(tracked) && tracked.length > 0
          ? tracked.map((u) => (
              <div key={u.pk}>
                <div
                  className={`w-full ${
                    tracked.indexOf(u) % 2 != 0 ? "bg-gray-200" : ""
                  } p-2 mb-2  text-gray-700  md:flex hidden justify-between`}
                >
                  <span className="w-[5%]">{tracked.indexOf(u) + 1}</span>
                  <span className="w-[5%]">{u?.idsl}</span>
                  <span className="w-[10%]">{u?.type}</span>
                  <span className="w-[10%]">{u?.dte}</span>
                  <span className="w-[10%]">{u?.wording}</span>
                  <span className="w-[10%]">{u?.mt}</span>
                  <span className="w-[10%]">{u?.memberNames}</span>
                  <span className="w-[10%]">{u?.nbrHosp}</span>
                  <span className="w-[10%]">{u?.nbrAmbu}</span>
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

export default BackupTracked;
