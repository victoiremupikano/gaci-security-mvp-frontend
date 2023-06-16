import { MouseEventHandler, useEffect, useState } from "react";
import Button from "../../../components/Button";
import FormHeader from "../../../components/FormHeader";
import ReusableHeader from "../../../components/ReusableHeader";
import Textbox from "../../../components/Textbox";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import Checkbox from "../../../components/Checkbox";
import useForm from "../../../hooks/useForm";
import NewsLetter from "../../../api/newsLetter";
import UserSuccessBox from "../../../components/UserSuccessBox";
import Toast from "../../../components/Toast";

declare type ErrorType = {
  email: any;
};

export default function AddNewsLetter() {
  const [{ email }, handleChange] = useForm({
    email: "",
  });
  const [error, setError] = useState<ErrorType>();
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [status, setStatus] = useState(false);
  const [entreprize, setEntreprize] = useState("");
  const [toast, setToast] = useState<"hide" | "show">("hide");
  const [msg, setMsg] = useState("");
  const onClickRegister: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const result = await NewsLetter.add(
      {
        entreprize_id: entreprize,
        email: email,
        status,
      },
      entreprize
    );
    if (result.type === "error") {
      const errors = result.data.errors;
      setError({
        email: errors.email && errors.email[0],
      });
      if (result.data.errors.non_field_errors) {
        setToast("show");
        setMsg(result.data.errors.non_field_errors);
      }
    } else if (result.pk) {
      setShowSuccessBox(true);
    }
  };
  const onClickCheckbox = (e: any) => setStatus(e.target.checked);
  useEffect(() => {
    const entreprize = localStorage.getItem("entreprize");
    setEntreprize(entreprize as string);
  }, []);

  if (showSuccessBox)
    return (
      <UserSuccessBox
        text="continer"
        title="Mail enregistrée"
        path="/staff/news-letter"
        message="L'email a été créé avec succès, vous pouvez maintenant vous connecter sur le consulter."
      />
    );
  return (
    <>
      <ReusableHeader text="Nouvelle adresse mail" />
      <div className="h-auto md:w-7/12 md:mx-auto relative  w-full flex items-center justify-center">
        <Toast message={msg} set={toast} />
        <div className="border h-auto pb-2 flex flex-col justify-around rounded w-full">
          <div className="flex flex-col items-center">
            <div className="w-11/12">
              <FormHeader title="Nouvelle adresse mail" />
            </div>
            <small className="text-xs md:text-base  md:w-11/12 w-10/12 mx-auto text-gray-500 md:text-left text-center my-3">
              Remplissez le formulaire ci-bas pour enregistrer une nouvelle
              adresse mail
            </small>
          </div>
          <form className="w-11/12 mx-auto mt-2">
            <div className="w-full flex-col flex justify-between md:space-x-0">
              <Textbox
                event={handleChange}
                value={email as string}
                error={error && error.email}
                name="email"
                type="text"
                placeholder="Email"
              />
            </div>
            <Checkbox
              name="status"
              event={onClickCheckbox}
              value={status}
              title="Cochez pour rendre active l'abonnement."
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
