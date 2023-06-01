import { FunctionComponent, useEffect } from "react";
import {useState} from "react"
import User from "../api/user";
import moment from "moment";
import "moment/locale/fr"

const BackupFirm: FunctionComponent = () => {
    const [users, setUsers] = useState<any[]>()
    const getUser = async() => {
      const result = await User.getAll()
      if (result.results) {
        setUsers(result.results)
      }
  }
  useEffect(() => {
    getUser()
    localStorage.setItem("current_report", 'all-firm')
    localStorage.setItem("filename", 'all_firm_backup')
  },[])
    return (
      <div id="all-users" className="w-11/12 h-full mx-auto">
        <div className="flex my-4 justify-center">
          <h1 className="w-80 font-semibold">
            LISTE DE TOUS LES CICURSALLES
          </h1>
        </div>
        <div className="w-full p-2 border-b mb-2 font-semibold text-gray-700 md:text-base text-xs hidden md:flex justify-between">
          <span className="w-[5%]">#</span>
          <span className="w-[15%]">Noms</span>
          <span className="w-[25%]">Email</span>
          <span className="w-[20%]">Téléphone</span>
          <span className="w-[7.5%] flex">Status</span>
          <span className="w-[7.5%]">Staff</span>
          <span className="w-[10%] flex justify-center">Créé le</span>
          <span className="w-[10%]">Modif.</span>
        </div>
        <div className="w-full flex text-xs flex-col  md:justify-between">
          {Array.isArray(users) && users.length > 0
            ? users.map((u) => (
                <div key={u.pk}>
                  <div
                    className={`w-full ${
                      users.indexOf(u) % 2 != 0 ? "bg-gray-200" : ""
                    } p-2 mb-2  text-gray-700  md:flex hidden justify-between`}
                  >
                    <span className="w-[5%]">{users.indexOf(u) + 1}</span>
                    <span className="w-[15%]">{u?.names}</span>
                    <span className="w-[25%]">{u?.email}</span>
                    <span className="w-[20%]">{u?.phone_number}</span>
                    <span className="w-[7.5%]">
                      {u?.is_active ? (
                        <span className="h-5 w-5 text-green-600" >Actif</span>
                      ) : (
                        <span className="w-5 h-5 text-red-600" >Inactif</span>
                      )}
                    </span>
                    <span
                      className={`w-[7.5%] font-semibold ${
                        u.staff ? "text-green-600" : ""
                      }`}
                    >
                      {u?.staff ? "Oui" : "Non"}
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
}


export default BackupFirm