import { MouseEventHandler, useState } from "react";
import Button from "../../../components/Button";
import FormHeader from "../../../components/FormHeader";
import ReusableHeader from "../../../components/ReusableHeader";
import Textbox from "../../../components/Textbox";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import useForm from "../../../hooks/useForm";
import UserSuccessBox from "../../../components/UserSuccessBox";
import Toast from "../../../components/Toast";
import Pricing from "../../../api/pricing";
import Checkbox from "../../../components/Checkbox";

declare type ErrorType = {
  adh_family: any,
  trh_family: any,
  adh_org: any,
  trh_org: any
};

export default function AddPricing() {
  const [status, setStatus] = useState(false)
  const [{ adh_family, trh_family, adh_org, trh_org }, handleChange] =
    useForm({
      adh_family: "",
      trh_family: "",
      adh_org: "",
      trh_org: ""
    });
  const [error, setError] = useState<ErrorType>();
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [toast, setToast] = useState<"hide" | "show">("hide");
  const [msg, setMsg] = useState("");
  const onClickRegister: MouseEventHandler<HTMLButtonElement> = async (e) => {
    setToast('hide')
    const result = await Pricing.add({
      adh_family,
      trh_family,
      adh_org,
      trh_org,
      status
    });
    if (result.type === "error") {
      const errors = result.data.errors
      setError({
        adh_family: errors.adh_family && errors.adh_family[0],
        trh_family: errors.trh_family && errors.trh_family[0],
        adh_org: errors.adh_org && errors.adh_org[0],
        trh_org: errors.adh_org && errors.adh_org[0],
      });
      if (result.data.errors.non_field_errors) {
        setToast("show");
        setMsg(result.data.errors.non_field_errors);
      }
    } else if (result.pk) {
      setShowSuccessBox(true);
    }
  };

  if (showSuccessBox)
    return (
      <UserSuccessBox
        text="Voir la tarification"
        title="Tarification créé avec succès"
        path="/staff/pricing"
        message={`La tarification d'adhésion ${adh_family} et ${adh_org} ont été créée avec succès. Elle est maintenant affichable aux utilisateurs.`}
      />
    );
  return (
    <>
      <ReusableHeader text="Nouvelle tarification" />
      <div className="h-[500px] md:w-5/12 relative  w-11/12 mx-auto flex items-center justify-center">
        <Toast message={msg} set={toast} />
        <div className="border h-[500px] flex flex-col justify-around rounded w-full">
          <div className="flex flex-col items-center">
            <div className="w-11/12 mx-auto">
              <FormHeader title="Nouvelle tarification" />
            </div>
            <small className="text-xs w-10/12 mx-auto text-gray-500 md:text-center my-3">
              Remplissez le champ ci-bas pour enregistrer un nouvelle tarification.
            </small>
          </div>
          <form className="w-11/12 mx-auto mt-2">
            <Textbox
              event={handleChange}
              value={adh_family as string}
              error={error && error.adh_family}
              name="adh_family"
              type="text"
              placeholder="Valeur adhésion famille"
            />
            <Textbox
              event={handleChange}
              value={trh_family as string}
              error={error && error.trh_family}
              name="trh_family"
              type="text"
              placeholder="% tranche famille"
            />
            <Textbox
              event={handleChange}
              value={adh_org as string}
              error={error && error.adh_org}
              name="adh_org"
              type="text"
              placeholder="Valeur adhésion org"
            />
            <Textbox
              event={handleChange}
              value={trh_org as string}
              error={error && error.trh_org}
              name="trh_org"
              type="text"
              placeholder="% tranche org"
            />
            <Checkbox
              name="status"
              event={() => setStatus(!status)}
              value={status}
              title="Etat"
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
  