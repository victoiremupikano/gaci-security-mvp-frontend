import { MouseEventHandler, useEffect, useState } from "react";
import Button from "../../../../components/Button";
import FormHeader from "../../../../components/FormHeader";
import ReusableHeader from "../../../../components/ReusableHeader";
import Textbox from "../../../../components/Textbox";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import useForm from "../../../../hooks/useForm";
import UserSuccessBox from "../../../../components/UserSuccessBox";
import Pricing from "../../../../api/pricing"
import { useRouter } from "next/router";
import Checkbox from "../../../../components/Checkbox";

declare type ErrorType = {
  adh_family: any,
  trh_family: any,
  adh_org: any,
  trh_org: any,
};

export default function UpdatePricing() {
  const [status, setStatus] = useState<any>(false);
  const [adh_family, setAdh_family] = useState("");
  const [trh_family, setTrh_family] = useState("");
  const [adh_org, setAdh_org] = useState("");
  const [trh_org, setTrh_org] = useState("");
  const [error, setError] = useState<ErrorType>();
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [pricing, setPricing] = useState<any>({});
  
  const getPricing = async (r: string) => {
    const result = await Pricing.get(r);
    if (result.pk) {
      setPricing(result);
      setAdh_family(result.adh_family);
      setTrh_family(result.trh_family);
      setAdh_org(result.adh_org);
      setTrh_org(result.trh_org);
      setStatus(result.status); 
    }
  };
  const router = useRouter();
  useEffect(() => {
    if (router.query.pricing) {
      getPricing(router.query.pricing as string);
    }
  }, [router.query.Pricing]);
  const onClickRegister: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const result = await Pricing.update({
      adh_family,
      trh_family,
      adh_org,
      trh_org,
      status
    }, pricing.pk);
    if (result.type === "error") {
      const errors = result.data.errors
      setError({
        adh_family: errors.adh_family && errors.adh_family[0],
        trh_family: errors.trh_family && errors.trh_family[0],
        adh_org: errors.adh_org && errors.adh_org[0],
        trh_org: errors.adh_org && errors.adh_org[0],
      });
    } else if (result.pk) {
      setShowSuccessBox(true);
    }
  };

  if (showSuccessBox)
    return (
      <UserSuccessBox
        text="Voir la tarification"
        title="Tarification modifier avec succès"
        path="/staff/pricing"
        message={`La tarification d'adhésion ${adh_family} et ${adh_org} ont été modifié avec succès. Elle est maintenant affichable aux utilisateurs.`}
      />
    );
  return (
    <>
      <ReusableHeader text="Modifier la tarification" />
      <div className="h-[500px] md:w-5/12 relative  w-11/12 mx-auto flex items-center justify-center">
        <div className="border h-[500px] flex flex-col justify-around rounded w-full">
          <div className="flex flex-col items-center">
            <div className="w-11/12 mx-auto">
              <FormHeader title="Modifier la tarification" />
            </div>
            <small className="text-xs w-10/12 mx-auto text-gray-500 md:text-center my-3">
              Remplissez le champ ci-bas pour modifier un la tarification.
            </small>
          </div>
          <form className="w-11/12 mx-auto mt-2">
            <Textbox
              event={(e) => setAdh_family(e.target.value)}
              value={adh_family as string}
              error={error && error.adh_family}
              name="adh_family"
              type="text"
              placeholder="Valeur adhésion famille"
            />
            <Textbox
              event={(e) => setTrh_family(e.target.value)}
              value={trh_family as string}
              error={error && error.trh_family}
              name="trh_family"
              type="text"
              placeholder="% tranche famille"
            />
            <Textbox
              event={(e) => setAdh_org(e.target.value)}
              value={adh_org as string}
              error={error && error.adh_org}
              name="adh_org"
              type="text"
              placeholder="Valeur adhésion org"
            />
            <Textbox
              event={(e) => setTrh_org(e.target.value)}
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
  