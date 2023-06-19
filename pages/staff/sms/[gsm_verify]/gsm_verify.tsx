import { useRouter } from "next/router";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import GsmVerify from "../../../../api/sms";
import FormHeader from "../../../../components/FormHeader";
import ReusableHeader from "../../../../components/ReusableHeader";
import "moment/locale/fr";
import GsmVerifyDetails from "../../../../components/GsmVerifyDetails";
import Toast from "../../../../components/Toast";

declare type ErrorType = {
  ip: any;
};

const UniqueGsmVerifyDetails: FunctionComponent = () => {
  const router = useRouter();
  const [error, setError] = useState<ErrorType>();
  const [gsmVerify, setGsmVerify] = useState<any>();
  const [toast, setToast] = useState<"hide" | "show">("hide");
  const [msg, setMsg] = useState("");
  const getGsmVerify = useCallback(async (ip: string) => {
    const result = await GsmVerify.getGsmVerify(ip as string);
    if (result.type === "error") {
      const errors = result.data.errors;
      setError({
        ip: errors.ip && errors.ip[0],
      });
      if (errors.non_field_errors) {
        setToast("show");
        setMsg(errors.non_field_errors);
      }
    } else if (result.data) {
      if (result.data) {
        const data = result.data;
        setGsmVerify(data);
      }
    }
  }, []);
  useEffect(() => {
    if (router.isReady) {
      getGsmVerify(router.query.gsm_verify as string);
    }
  }, [router, getGsmVerify]);

  return (
    <>
      <ReusableHeader text="Information sur l&apos;appareil" />
      <div className="md:w-11/12 w-full relative mx-auto flex flex-col  md:h-[600px]">
        <Toast message={msg} set={toast} />
        <div className="md:w-full w-11/12 mx-auto items-center  flex justify-between">
          <FormHeader title="Information sur l&apos;appareil" />
        </div>
        <div className="w-full text-sm md:text-base flex md:justify-between mx-auto h-auto">
          <GsmVerifyDetails gsmVerify={gsmVerify} />
        </div>
      </div>
    </>
  );
};

export default UniqueGsmVerifyDetails;
