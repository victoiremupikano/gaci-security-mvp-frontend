import { MouseEventHandler, useEffect, useRef, useState } from "react";
import Button from "../../../components/Button";
import FormHeader from "../../../components/FormHeader";
import ReusableHeader from "../../../components/ReusableHeader";
import Textbox from "../../../components/Textbox";
import { CheckCircleIcon, PhotoIcon, RssIcon, CheckIcon } from "@heroicons/react/20/solid";
import Checkbox from "../../../components/Checkbox";
import useForm from "../../../hooks/useForm";
import Pa from "../../../api/pa";
import UserSuccessBox from "../../../components/UserSuccessBox";
import fileToBase64 from "../../../helpers/fileToBase64";
import Image from "next/image";
import Toast from "../../../components/Toast";

declare type ErrorType = {
  reason_issued: any;
  reason_to_certify: any;
};

export default function AddPa() {
  const inputRef = useRef<any>();
  const [{ reason_issued, reason_to_certify }, handleChange] = useForm({
    reason_issued: "",
    reason_to_certify: "",
  });
  const [error, setError] = useState<ErrorType>();
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [latittude, setLatitude] = useState("0")
  const [longitude, setLongitude] = useState("0")
  const [is_finish, setIs_finish] = useState(false);
  const [is_cancel, setIs_cancel] = useState(false);
  const [toast, setToast] = useState<"hide" | "show">("hide");
  const [msg, setMsg] = useState("");
  const onClickRegister: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const result = await Pa.add(
      {
        reason_issued: reason_issued,
        reason_to_certify: "",
        latittude: latittude,
        longitude: longitude,
        is_finish,
        is_cancel
      },
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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude.toString())
      setLongitude(position.coords.longitude.toString())
    });
  }, [])

  if (showSuccessBox)
    return (
      <UserSuccessBox
        text="continer"
        title="Alerte envoyé avec succès"
        path="/nostaff/pub/wtr/"
        message="Alerte population a été créé avec succès, vous pouvez maintenant vous connecter sur le consulter."
      />
    );
  return (
    <>
      <ReusableHeader text="Nouvelle alerte population" />
      <div className="h-auto md:w-7/12 md:mx-auto relative  w-full flex items-center justify-center">
        <Toast message={msg} set={toast} />
        <div className="border h-auto pb-2 flex flex-col justify-around rounded w-full">
          <div className="flex flex-col items-center">
            <div className="w-11/12">
              <FormHeader title="Nouvelle alerte population" />
            </div>
            <small className="text-xs md:text-base  md:w-11/12 w-10/12 mx-auto text-gray-500 md:text-left text-center my-3">
              Remplissez le formulaire ci-bas pour enregistrer un nouveau couvre-feu
            </small>
          </div>
          <form className="w-11/12 mx-auto mt-2">
              <div className="w-full flex-col flex justify-between md:space-x-0">
                <Textbox
                  event={handleChange}
                  value={reason_issued as string}
                  error={error && error.reason_issued}
                  name="reason_issued"
                  type="text"
                  placeholder="Motif poster"
                />                 
            </div>
            {/* <Checkbox
              name="is_finish"
              event={onClickCheckboxis_finish}
              value={is_finish}
              title="Cochez pour mettre fin à l'envie de recherche."
            /> */}
            <Checkbox
              name="is_cancel"
              event={onClickCheckboxis_cancel}
              value={is_cancel}
              title="Cochez pour demantir votre alerte d'insécurité"
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
