import { MouseEventHandler, useEffect, useRef, useState } from "react";
import Button from "../../../../components/Button";
import FormHeader from "../../../../components/FormHeader";
import ReusableHeader from "../../../../components/ReusableHeader";
import Textbox from "../../../../components/Textbox";
import { CheckCircleIcon, CheckIcon, PhotoIcon, RssIcon } from "@heroicons/react/20/solid";
import Checkbox from "../../../../components/Checkbox";
import Pa from "../../../../api/pa";
import UserSuccessBox from "../../../../components/UserSuccessBox";
import fileToBase64 from "../../../../helpers/fileToBase64";
import Image from "next/image";
import { useRouter } from "next/router";
import downloadImage from "../../../../helpers/downloadImage";
import Toast from "../../../../components/Toast";

declare type ErrorType = {
  reason_issued: any;
  reason_to_certify: any;
};

export default function UpdatePa() {
  const inputRef = useRef<any>();
  const [error, setError] = useState<ErrorType>();
  const [showSuccessBox, setShowSuccessBox] = useState(false); 
  const [reason_issued, setReason_issued] = useState("");
  const [reason_to_certify, setReason_to_certify] = useState("");
  const [latittude, setLatitude] = useState("0")
  const [longitude, setLongitude] = useState("0")
  const [is_finish, setIs_finish] = useState<any>(false);
  const [is_cancel, setIs_cancel] = useState<any>(false);
  const [_pa, setPa] = useState<any>({});
  const [id, setId] = useState("");
  const [toast, setToast] = useState<"hide" | "show">("hide");
  const [msg, setMsg] = useState("");
  const onClickRegister: MouseEventHandler<HTMLButtonElement> = async (e) => {
    setToast("hide");
    const result = await Pa.update(
      {
        reason_issued: reason_issued,
        reason_to_certify: reason_to_certify,
        latittude: latittude,
        longitude: longitude,
        is_finish,
        is_cancel
      },
      id
    );
    if (result.type === "error") {
      const errors = result.data.errors;
      setError({
        reason_issued: errors.reason_issued && errors.reason_issued[0],
        reason_to_certify: errors.reason_to_certify && errors.reason_to_certify[0],
      });
      if (result.data.errors.non_field_errors) {
        setToast("show");
        setMsg(result.data.errors.non_field_errors);
      }
    } else if (result.pk) {
      setShowSuccessBox(true);
    }
  };
  const onClickCheckboxis_finish = (e: any) => setIs_finish(e.target.checked);
  const onClickCheckboxis_cancel = (e: any) => setIs_cancel(e.target.checked);
  const getPa = async (id: string) => {
    const result = await Pa.get(id);
    if (result.pk) {
      setPa(result);
      setId(result.pk);
      setLongitude(result.longitude);
      setLatitude(result.latittude);
      setReason_issued(result.reason_issued);
      setReason_to_certify(result.reason_to_certify);
      setIs_finish(result.is_finish);
      setIs_cancel(result.is_cancel);
    }
  };
  const router = useRouter();
  const { pa } = router.query;

  useEffect(() => {
    getPa(pa as string);
  }, [pa]);

  if (showSuccessBox)
    return (
      <UserSuccessBox
        text="continer"
        title="Modification effectuée"
        path="/staff/pa"
        message="Votre alerte population a été modifier avec succès, vous pouvez maintenant le consulter."
      />
    );
  return (
    <>
      <ReusableHeader text="Modification d&apos;une alerte population"/> 
      <div className="h-auto md:w-7/12 md:mx-auto relative  w-full flex items-center justify-center">
        <Toast message={msg} set={toast} />
        <div className="border h-auto pb-2 flex flex-col justify-around rounded w-full">
          <div className="flex flex-col items-center">
            <div className="w-11/12">
              <FormHeader title="Modifier une alerte population" />
            </div>
            <small className="text-xs md:text-base  md:w-11/12 w-10/12 mx-auto text-gray-500 md:text-left text-center my-3">
              Remplissez le formulaire ci-bas
            </small>
          </div>
          <form className="w-11/12 mx-auto mt-2">
            <div className="w-full flex-col flex justify-between md:space-x-0">
              <Textbox
                event={(e) => setReason_issued(e.target.value)}
                value={reason_issued as string}
                error={error && error.reason_issued}
                name="reason_issued"
                type="text"
                placeholder="Motif poster"
              />
              <Textbox
                event={(e) => setReason_to_certify(e.target.value)}
                value={reason_to_certify as string}
                error={error && error.reason_to_certify}
                name="reason_to_certify"
                type="text"
                placeholder="Motif répondu"
              />
            </div> 
            <Checkbox
              name="is_finish"
              event={onClickCheckboxis_finish}
              value={is_finish}
              title="Cochez pour mettre en status répondu"
            />
            <Checkbox
              name="is_cancel"
              event={onClickCheckboxis_cancel}
              value={is_cancel}
              title="Cochez pour annuler"
            />                 
            <Button
              event={onClickRegister}
              size="fit"
              content={
                <div className="flex justify-around">
                  Enregister <CheckCircleIcon className="h-6 w-6 ml-3" />
                </div>
              }
              design="primary"
              type="button"
            />
          </form>
        </div>
      </div>
    </>
  );
}
