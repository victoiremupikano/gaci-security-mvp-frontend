import React, { MouseEventHandler, useEffect, useState } from "react";
import ReusableHeader from "../../../../components/ReusableHeader";
import GoBack from "../../../../components/GoBack";
import { useRouter } from "next/router";
import uppercaseFirst from "../../../../helpers/uppercaseFirst";
import moment from "moment";
import Link from "next/link";
import "moment/locale/fr";
import Pricing from "../../../../api/pricing";
import { XMarkIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import Toast from "../../../../components/Toast";

export default function UniqueRate() {
  const [fnObject, setFnObject] = useState<any>({});
  const [toast, setToast] = useState<"hide" | "show">("hide");
  const [msg, setMsg] = useState("");
  const getFnx = async (fn: string) => {
    const result = await Pricing.get(fn);
    if (result.pk) {
      setFnObject(result);
    }
  };
  const router = useRouter();
  useEffect(() => {
    if (router.query.pricing) {
      getFnx(router.query.pricing as string);
    }
  }, [router.query.pricing]);
   const onclickDeleteRate = async () => {
     setToast("hide");
     const result = await Pricing.delete(fnObject.pk);
     if (result.type === "error") {
       setToast("show");
       setMsg(result.data.detail);
      } else {
        router.push("/staff/pricing");
     }
   };

  return (
    <>
      <ReusableHeader text="Details de la tarification" />
      <div className="h-[600px] lg:w-6/12 md:w-8/12 relative  w-11/12 mx-auto flex items-center justify-center">
        <Toast message={msg} set={toast} />
        <div className="h-[500px] border rounded p-5 w-full">
          <div className="flex justify-between w-full items-center">
            <div className="flex items-center">
              <GoBack />{" "}
              <span className="text-gray-700 font-semibold">
                {" "}
                Details de la tarification
              </span>
            </div>
            <Link
              className="bg-blue-600 text-white rounded p-1"
              href={"/staff/pricing/" + fnObject.pk + "/update"}
            >
              Modifier
            </Link>
          </div>
          <div className=" w-full h-full justify-around p-1 flex-col flex ">
            <div className="flex justify-between mb-3">
              <span>Adhésion familiale</span>
              <span className="font-semibold">
                {uppercaseFirst(fnObject.adh_family) || "Pas de donnée"}
              </span>
            </div>
            <div className="flex justify-between mb-3">
              <span>Tranche</span>
              <span className="font-semibold">
                {uppercaseFirst(fnObject.trh_family) || "Pas de donnée"}
              </span>
            </div>
            <div className="flex justify-between mb-3">
              <span>Adhésion d'une organisation</span>
              <span className="font-semibold">
                {uppercaseFirst(fnObject.adh_org) || "Pas de donnée"}
              </span>
            </div>
            <div className="flex justify-between mb-3">
              <span>Tranche</span>
              <span className="font-semibold">
                {uppercaseFirst(fnObject.trh_org) || "Pas de donnée"}
              </span>
            </div>
            <div className="flex justify-between mb-2">
            <span>Actif(ve)</span>
            <span
              className={` ${
                fnObject.status ? "bg-blue-600" : "bg-red-600"
              } flex items-center w-fit rounded-full py-0.5 font-semibold px-1 text-sm text-white`}
            >
              {fnObject.status ? "Oui" : "Non"}
              {fnObject.status ? (
                <CheckCircleIcon className="h-4 w-4 ml-1" />
              ) : (
                <XCircleIcon className="h-4 w-4 ml-1" />
              )}
            </span>
          </div>
            <div className="flex justify-between mb-3">
              <span>Utilisateur</span>
              <span className="font-semibold">
                {fnObject?.user?.names || "Non donné"}
              </span>
            </div>
            <div className="flex justify-between mb-3">
              <span>Date de création</span>
              <span className="font-semibold">
                {moment(fnObject.date_add).format("ll")}
              </span>
            </div>
            <div className="flex justify-between mb-3">
              <span>Dernière modification</span>
              <span className="font-semibold">
                {moment(fnObject.date_update).fromNow()}
              </span>
            </div>
            <div className="flex  mb-3">
              <span
                onClick={onclickDeleteRate}
                className="bg-red-600 flex items-center cursor-pointer hover:bg-red-700 py-1.5 text-white px-2  rounded"
              >
                Supprimer la tarification{" "}
                <span className="font-semibold ml-1"></span>{" "}
                <XMarkIcon className="w-5 h-5 ml-2" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
