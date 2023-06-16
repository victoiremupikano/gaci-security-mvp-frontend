import { MouseEventHandler, useEffect, useRef, useState } from "react";
import Button from "../../../components/Button";
import FormHeader from "../../../components/FormHeader";
import ReusableHeader from "../../../components/ReusableHeader";
import Textbox from "../../../components/Textbox";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import useForm from "../../../hooks/useForm";
import Sms from "../../../api/sms";
import UserSuccessBox from "../../../components/UserSuccessBox";
import { useRouter } from "next/router";
import Toast from "../../../components/Toast";

declare type ErrorType = {
  message: any;
  ip: any;
};

export default function AddSms() {
  const [{ message, ip }, handleChange] = useForm({
    message: "",
    source: "",
    ip: "",
  });
  const [error, setError] = useState<ErrorType>();
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [entreprize, setEntreprize] = useState("");
  const [toast, setToast] = useState<"hide" | "show">("hide");
  const [msg, setMsg] = useState("");
  const router = useRouter();
  const onClickRegister: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const result = await Sms.add(
      {
        entreprize_id: entreprize,
        message: message,
        source: "gsm",
        ip: ip,
      },
      entreprize
    );
    if (result.type === "error") {
      const errors = result.data.errors;
      setError({
        message: errors.message && errors.message[0],
        ip: errors.ip && errors.ip[0],
      });
      if (result.data.errors.non_field_errors) {
        setToast("show");
        setMsg(result.data.errors.non_field_errors);
      }
    } else if (result.pk) {
      setShowSuccessBox(true);
    }
  };
  useEffect(() => {
    const entreprize = localStorage.getItem("entreprize");
    setEntreprize(entreprize as string);
  }, []);
  const onClickGsmVerify = async () => {
    if (ip == "") {
      router.push("/staff/sms/add_gsm");
    } else {
      router.push((("/staff/sms/" + ip) as string) + "/gsm_verify");
    }
  };
  if (showSuccessBox)
    return (
      <UserSuccessBox
        text="continer"
        title="Message enregistrée"
        path="/staff/sms"
        message="Le message a été créé avec succès, vous pouvez maintenant vous connecter sur le consulter."
      />
    );
  return (
    <>
      <ReusableHeader text="Nouveau message" />
      <div className="h-auto md:w-7/12 md:mx-auto relative  w-full flex items-center justify-center">
        <Toast message={msg} set={toast} />
        <div className="border h-auto pb-2 flex flex-col justify-around rounded w-full">
          <div className="flex flex-col items-center">
            <div className="w-11/12">
              <FormHeader title="Nouveau message" />
            </div>
            <small className="text-xs md:text-base  md:w-11/12 w-10/12 mx-auto text-gray-500 md:text-left text-center my-3">
              Remplissez le formulaire ci-bas pour enregistrer et envoyer un
              nouveau message via le GSM Android
            </small>
          </div>
          <form className="w-11/12 mx-auto mt-2">
            <div className="w-full flex-col flex justify-between md:space-x-0">
              <Textbox
                event={handleChange}
                value={message as string}
                error={error && error.message}
                name="message"
                type="text"
                placeholder="Message à envoyé"
              />
              <Textbox
                event={handleChange}
                value={ip as string}
                error={error && error.ip}
                name="ip"
                type="text"
                placeholder="Adresse IP"
              />
            </div>
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
            <Button
              event={onClickGsmVerify}
              size="fit"
              content={
                <div className="flex justify-around">
                  CLiquer pour tester l'IP{" "}
                  <CheckCircleIcon className="h-6 w-6 ml-3" />
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
