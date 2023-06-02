import { FunctionComponent, useEffect } from "react";
import {useState} from "react"
import Member from "../api/backup/member";
import moment from "moment";
import "moment/locale/fr"

const BackupMember: FunctionComponent = () => {
    const [member, setMember] = useState<any[]>()
    const getMember = async() => {
      const result = await Member.get()
      if (result.results) {
        setMember(result.results)
      }
  }
  useEffect(() => {
    getMember()
    localStorage.setItem("current_report", 'all-member')
    localStorage.setItem("filename", 'all_member_backup')
  },[])
    return (
      <div id="all-member" className="w-11/12 h-full mx-auto">
        <div className="flex my-4 justify-center">
          <h1 className="w-80 font-semibold">
            LISTE DE TOUS LES MEMBRES
          </h1>
        </div>
        <div className="w-full p-2 border-b mb-2 font-semibold text-gray-700 md:text-base text-xs hidden md:flex justify-between">
          <span className="w-[5%]">#</span>
          <span className="w-[10%]">Idsl</span>
          <span className="w-[20%]">Names</span>
          <span className="w-[10%]">Genre</span>
          <span className="w-[10%]">Né lé</span>
          <span className="w-[5%]">Né au(à)</span>
          <span className="w-[5%]">F°</span>
          <span className="w-[5%]">Ville</span>
          <span className="w-[5%]">Qr</span>
          <span className="w-[5%] flex">Tel.</span>
          <span className="w-[10%] flex justify-center">Créé</span>
          <span className="w-[10%]">Modif.</span>
        </div>
        <div className="w-full flex text-xs flex-col  md:justify-between">
          {Array.isArray(member) && member.length > 0
            ? member.map((u) => (
                <div key={u.pk}>
                  <div
                    className={`w-full ${
                      member.indexOf(u) % 2 != 0 ? "bg-gray-200" : ""
                    } p-2 mb-2  text-gray-700  md:flex hidden justify-between`}
                  >
                    <span className="w-[5%]">{member.indexOf(u) + 1}</span>
                    <span className="w-[10%]">{u?.idsl}</span>
                    <span className="w-[15%]">{u?.names}</span>
                    <span className="w-[10%]">{u?.kind}</span>
                    <span className="w-[10%]">{u?.birth_day}</span>
                    <span className="w-[5%]">{u?.birth_site}</span>
                    <span className="w-[5%]">{u?.career}</span>
                    <span className="w-[5%]">{u?.town}</span>
                    <span className="w-[5%]">{u?.qr}</span>
                    <span className="w-[5%]">{u?.tel1}</span> 
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


export default BackupMember