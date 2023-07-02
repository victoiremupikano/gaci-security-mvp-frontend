import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import Ident from "../../../../api/ident";
import FormHeader from "../../../../components/FormHeader";
import ReusableHeader from "../../../../components/ReusableHeader";
import "moment/locale/fr";
import IdentDetails from "../../../../components/IdentDetails";
import { PencilIcon, XMarkIcon } from "@heroicons/react/20/solid";
import Toast from "../../../../components/Toast";

const UniqueIdentDetails: FunctionComponent = () => {
  const router = useRouter();
  const [ident, setIdent] = useState<any>();
  const [toast, setToast] = useState<"hide" | "show">("hide");
  const [msg, setMsg] = useState("");
  const getIdent = useCallback(async (id: string) => {
    const result = await Ident.get(id);
    if (result.statusCode == 200) {
      setIdent(result);
    }
  }, []);
  useEffect(() => {
    if (router.isReady) {
      getIdent(router.query.Ident as string);
    }
  }, [router, getIdent]);
  return (
    <>
      <ReusableHeader text="Information sur une tentative de reconnaissance" />
      <div className="md:w-11/12 w-full relative mx-auto flex flex-col  md:h-[600px]">
        <Toast message={msg} set={toast} />
        <div className="md:w-full w-11/12 mx-auto items-center  flex justify-between">
          <FormHeader title="Information sur une tentative de reconnaissance" />
        </div>
        <div className="w-full text-sm md:text-base flex md:justify-between mx-auto h-auto">
          <IdentDetails ident={ident} />
        </div>      
      </div>
    </>
  );
};

export default UniqueIdentDetails;
