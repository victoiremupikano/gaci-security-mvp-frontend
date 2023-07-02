import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import Cai from "../../../../../api/cai";
import FormHeader from "../../../../../components/FormHeader";
import ReusableHeader from "../../../../../components/ReusableHeader";
import "moment/locale/fr";
import CaiDetails from "../../../../../components/CaiDetails";
import { PencilIcon, XMarkIcon } from "@heroicons/react/20/solid";
import Toast from "../../../../../components/Toast";

const UniqueCaiDetails: FunctionComponent = () => {
  const router = useRouter();
  const [cai, setCai] = useState<any>();
  const [toast, setToast] = useState<"hide" | "show">("hide");
  const [msg, setMsg] = useState("");
  const getCai = useCallback(async (id: string) => {
    const result = await Cai.get(id);
    if (result.statusCode == 200) {
      setCai(result);
    }
  }, []);
  useEffect(() => {
    if (router.isReady) {
      getCai(router.query.cai as string);
    }
  }, [router, getCai]);
  return (
    <>
      <ReusableHeader text="Information sur un couvre-feu" />
      <div className="md:w-11/12 w-full relative mx-auto flex flex-col  md:h-[600px]">
        <Toast message={msg} set={toast} />
        <div className="md:w-full w-11/12 mx-auto items-center  flex justify-between">
          <FormHeader title="Information sur un couvre-feu" />
        </div>
        <div className="w-full text-sm md:text-base flex md:justify-between mx-auto h-auto">
          <CaiDetails cai={cai} />
        </div> 
      </div>
    </>
  );
};

export default UniqueCaiDetails;
