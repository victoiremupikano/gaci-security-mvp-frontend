import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import Wtr from "../../../../api/wtr";
import FormHeader from "../../../../components/FormHeader";
import ReusableHeader from "../../../../components/ReusableHeader";
import "moment/locale/fr";
import WtrDetails from "../../../../components/WtrDetails";
import { PencilIcon, XMarkIcon } from "@heroicons/react/20/solid";
import Toast from "../../../../components/Toast";

const UniqueWtrDetails: FunctionComponent = () => {
  const router = useRouter();
  const [wtr, setWtr] = useState<any>();
  const [toast, setToast] = useState<"hide" | "show">("hide");
  const [msg, setMsg] = useState("");
  const getWtr = useCallback(async (id: string) => {
    const result = await Wtr.get(id);
    if (result.statusCode == 200) {
      setWtr(result);
    }
  }, []);
  useEffect(() => {
    if (router.isReady) {
      getWtr(router.query.wtr as string);
    }
  }, [router, getWtr]);
  const onclickDelete = async () => {
    setToast("hide");
    const result = await Wtr.delete(wtr.pk);
    if (result.type === "error") {
      setToast("show");
      setMsg(result.data.detail);
    } else {
      router.push("/staff/wtr");
    }
  };
  return (
    <>
      <ReusableHeader text="Information sur un envie de recherche" />
      <div className="md:w-11/12 w-full relative mx-auto flex flex-col  md:h-[600px]">
        <Toast message={msg} set={toast} />
        <div className="md:w-full w-11/12 mx-auto items-center  flex justify-between">
          <FormHeader title="Information sur un envie de recherche" />
          <Link
            href={"/staff/wtr/" + wtr?.pk + "/update"}
            className="w-fit h-fit p-1 ml-2 rounded bg-blue-600 text-white"
          >
            <span className="hidden md:flex"> Modifier</span>
            <PencilIcon className="md:hidden w-5 h-5" />
          </Link>
        </div>
        <div className="w-full text-sm md:text-base flex md:justify-between mx-auto h-auto">
          <WtrDetails wtr={wtr} />
        </div>      
        <div className="flex w-11/12 mx-auto  mb-3">
          <span
            onClick={onclickDelete}
            className="bg-red-600 flex items-center cursor-pointer hover:bg-red-700 py-1.5 text-white px-2  rounded"
          >
            Supprimer cet envie de recherche
            <XMarkIcon className="w-5 h-5 ml-2" />
          </span>
        </div>
      </div>
    </>
  );
};

export default UniqueWtrDetails;
