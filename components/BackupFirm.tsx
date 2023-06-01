import { FunctionComponent, useEffect } from "react";
import {useState} from "react"
import Firm from "../api/backup/firm";
import moment from "moment";
import "moment/locale/fr"

const BackupFirm: FunctionComponent = () => {
    const [firm, setFirm] = useState<any[]>()
    const getFirm = async() => {
      const result = await Firm.get()
      if (result.results) {
        setFirm(result.results)
      }
  }
  useEffect(() => {
    getFirm()
    localStorage.setItem("current_report", 'all-firm')
    localStorage.setItem("filename", 'all_firm_backup')
  },[])
    return (
      <div id="all-Firms" className="w-11/12 h-full mx-auto">
        <div className="flex my-4 justify-center">
          <h1 className="w-80 font-semibold">
            LISTE DE TOUS LES CICURSALLES
          </h1>
        </div>
        <div className="w-full p-2 border-b mb-2 font-semibold text-gray-700 md:text-base text-xs hidden md:flex justify-between">
          <span className="w-[5%]">#</span>
          <span className="w-[15%]">Idsl</span>
          <span className="w-[25%]">Désignation</span>
          <span className="w-[20%]">B.P</span>
          <span className="w-[7.5%] flex">Adresse</span>
          <span className="w-[10%] flex justify-center">Créé le</span>
          <span className="w-[10%]">Modif.</span>
        </div>
        <div className="w-full flex text-xs flex-col  md:justify-between">
          {Array.isArray(firm) && firm.length > 0
            ? firm.map((u) => (
                <div key={u.pk}>
                  <div
                    className={`w-full ${
                      firm.indexOf(u) % 2 != 0 ? "bg-gray-200" : ""
                    } p-2 mb-2  text-gray-700  md:flex hidden justify-between`}
                  >
                    <span className="w-[5%]">{firm.indexOf(u) + 1}</span>
                    <span className="w-[15%]">{u?.idsl}</span>
                    <span className="w-[25%]">{u?.designation}</span>
                    <span className="w-[20%]">{u?.bp}</span>
                    <span className="w-[7.5%]">{u?.adress}</span>  
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
}


export default BackupFirm