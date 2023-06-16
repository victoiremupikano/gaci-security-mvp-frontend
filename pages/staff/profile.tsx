import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useEffect, useState } from "react";
import GoBack from "../../components/GoBack";
import moment from "moment";
import "moment/locale/fr";
import uppercaseFirst from "../../helpers/uppercaseFirst";
import Link from "next/link";
import useVerify from "../../hooks/useVerify";
import ReusableHeader from "../../components/ReusableHeader";
import ReusableFooter from "../../components/ReusableFooter";

moment.locale("fr");

export default function ProfileIndex() {
  const [user, setUser] = useState<{ [key: string]: any }>({});
  useVerify();
  useEffect(() => {
    const result = JSON.parse(
      window.localStorage.getItem("user_data") as string
    )?.fields;
    if (result) {
      setUser(result);
    }
  }, []);
  return (
    <>
      <ReusableHeader text="Profil de l'utilisateur" />
      <div className="h-auto mb-3 relative overflow-hidden w-11/12 mx-auto">
        <div className="w-11/12 mb-4 flex items-center full">
          <GoBack />{" "}
          <span className="font-semibold">Compte de l&apos;utilisateur</span>
        </div>
        <div className="h-56 rounded-lg mb-3 overflow-hidden mx-auto  w-56">
          <Image
            priority
            className="w-full h-full object-cover"
            sizes="100vw"
            src={"/placeholder.jpg"}
            alt={user.names + "'s profile image"}
            height="0"
            width="0"
          />
        </div>
        <div className=" w-full p-1 flex-col flex ">
          <div className="flex justify-between mb-3">
            <span>Noms</span>
            <span className="font-semibold">{uppercaseFirst(user?.names)}</span>
          </div>
          <div className="flex justify-between mb-3">
            <span>Téléphone</span>
            <span className="font-semibold">{user?.phone_number}</span>
          </div>
          <div className="flex justify-between mb-3">
            <span>Email</span>
            <span className="font-semibold">{user?.email}</span>
          </div>
          <div className="flex justify-between mb-3">
            <span>Sexe</span>
            <span className="font-semibold">{user?.kind || "Non Precisé"}</span>
          </div>
          <div className="flex justify-between mb-3">
            <span>Membre du staff</span>
            <span className="bg-orange-600 flex items-center w-fit rounded-full py-0.5 font-semibold px-1 text-sm text-white">
              {user.staff ? "Oui" : "Non"}
              {user.staff ? (
                <CheckCircleIcon className="h-4 w-4 ml-1" />
              ) : (
                <XCircleIcon className="h-4 w-4 ml-1" />
              )}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Actif(ve)</span>
            <span
              className={` ${
                user.is_active ? "bg-blue-600" : "bg-red-600"
              } flex items-center w-fit rounded-full py-0.5 font-semibold px-1 text-sm text-white`}
            >
              {user.is_active ? "Oui" : "Non"}
              {user.is_active ? (
                <CheckCircleIcon className="h-4 w-4 ml-1" />
              ) : (
                <XCircleIcon className="h-4 w-4 ml-1" />
              )}
            </span>
          </div>
          <div className="flex justify-between mb-3">
            <span>Date de création</span>
            <span className="font-semibold">
              {moment(user?.date_add).format("ll")}
            </span>
          </div>
          <div className="flex justify-between mb-3">
            <span>Dernière modification</span>
            <span className="font-semibold">
              {moment(user?.date_add).fromNow()}
            </span>
          </div>
          <div className="flex justify-between mt-5">
            <Link
              href={"/staff/profiles/"}
              className="bg-blue-600 md rounded h-fit flex items-center p-1 text-white font-semibold"
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
      <ReusableFooter />
    </>
  );
}
