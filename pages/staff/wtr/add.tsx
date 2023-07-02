import { MouseEventHandler, useEffect, useRef, useState } from "react";
import Button from "../../../components/Button";
import FormHeader from "../../../components/FormHeader";
import ReusableHeader from "../../../components/ReusableHeader";
import Textbox from "../../../components/Textbox";
import { CheckCircleIcon, PhotoIcon, RssIcon, CheckIcon } from "@heroicons/react/20/solid";
import Checkbox from "../../../components/Checkbox";
import useForm from "../../../hooks/useForm";
import Wtr from "../../../api/wtr";
import UserSuccessBox from "../../../components/UserSuccessBox";
import fileToBase64 from "../../../helpers/fileToBase64";
import Image from "next/image";
import Toast from "../../../components/Toast";

declare type ErrorType = {
  names: any;
  kind: any;
  reason: any;
  picture64: any;
};

export default function AddWtr() {
  const inputRef = useRef<any>();
  const [{ names, kind, reason}, handleChange] = useForm({
    names: "",
    kind: "",
    reason: "",
    picture64: "",
  });
  const [error, setError] = useState<ErrorType>();
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [is_finish, setIs_finish] = useState(false);
  const [is_cancel, setIs_cancel] = useState(false);
  const [sex, setSex] = useState("");
  const [picture64, setPicture64] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [toast, setToast] = useState<"hide" | "show">("hide");
  const [msg, setMsg] = useState("");
  const onClickRegister: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const result = await Wtr.add(
      {
        names: names,
        kind: sex,
        reason: reason,
        is_finish,
        is_cancel,
        picture64,

      },
    );
    if (result.type === "error") {
      const errors = result.data.errors;
      setError({
        names: errors.names && errors.names[0],
        kind: errors.kind && errors.kind[0],
        reason: errors.reason && errors.reason[0],
        picture64: errors.picture64 && errors.picture64[0],
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
  const loadImage = async (e: any) => {
    const url = URL.createObjectURL(e.target.files[0]);
    setImageURL(url);
    const image = await fileToBase64(e.target.files[0]);
    setPicture64(image as string);
  };
  const setSexTo = (value: string) => setSex(value);
  const pickImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  if (showSuccessBox)
    return (
      <UserSuccessBox
        text="continer"
        title="Envie de recherche enregistrée"
        path="/staff/wtr"
        message="L'envie de recherche a été créé avec succès, vous pouvez maintenant vous connecter sur le consulter."
      />
    );
  return (
    <>
      <ReusableHeader text="Nouveau envie de recherche" />
      <div className="h-auto md:w-7/12 md:mx-auto relative  w-full flex items-center justify-center">
        <Toast message={msg} set={toast} />
        <div className="border h-auto pb-2 flex flex-col justify-around rounded w-full">
          <div className="flex flex-col items-center">
            <div className="w-11/12">
              <FormHeader title="Nouveau envie de recherche" />
            </div>
            <small className="text-xs md:text-base  md:w-11/12 w-10/12 mx-auto text-gray-500 md:text-left text-center my-3">
              Remplissez le formulaire ci-bas pour enregistrer un nouveau envie de recherche
            </small>
          </div>
          <form className="w-11/12 mx-auto mt-2">
            <input onChange={loadImage} type="file" hidden ref={inputRef} />
              <div className="w-full flex-col flex justify-between md:space-x-0">
                <Textbox
                  event={handleChange}
                  value={names as string}
                  error={error && error.names}
                  name="names"
                  type="text"
                  placeholder="Noms"
                />
                <Textbox
                  event={handleChange}
                  value={reason as string}
                  error={error && error.reason}
                  name="reason"
                  type="text"
                  placeholder="Motif"
                />
                  <div className="relative flex items-center justify-center w-full h-20 mb-4 bg-gray-100 rounded">
                    <span className="absolute text-gray-600 top-3 left-2">Sexe</span>
                  <div className="flex justify-around w-full mt-6">
                  <span
                    onClick={() => setSexTo("Masculin")}
                    className={`${
                      sex === "Masculin"
                        ? "bg-blue-600 border-transparent text-white"
                        : "bg-white text-blue-600 border-blue-600"
                    } rounded-full border-2 border-blue-600 cursor-pointer transition-colors duration-500  px-1.5 py-0.5 flex items-center`}
                  >
                    Masculin{" "}
                    {sex === "Masculin" ? (
                      <CheckIcon className="w-4 h-4 ml-1" />
                    ) : null}
                  </span>
                  <span
                    onClick={() => setSexTo("Feminin")}
                    className={`${
                      sex === "Feminin"
                        ? "bg-blue-600 border-transparent text-white"
                        : "bg-white text-blue-600 border-blue-600"
                    } rounded-full border-2 border-blue-600 cursor-pointer transition-colors duration-500  px-1.5 py-0.5 flex items-center`}
                  >
                    Feminin{" "}
                    {sex === "Feminin" ? (
                      <CheckIcon className="w-4 h-4 ml-1" />
                    ) : null}
                  </span>
                </div>
                {error?.kind && (
                  <small className="absolute text-sm text-red-500 left-2 -bottom-6">
                    {error?.kind}
                  </small>
                )}
              </div>
            </div>
            <Checkbox
              name="is_finish"
              event={onClickCheckboxis_finish}
              value={is_finish}
              title="Cochez pour mettre fin à l'envie de recherche."
            />
            <Checkbox
              name="is_cancel"
              event={onClickCheckboxis_cancel}
              value={is_cancel}
              title="Cochez pour annuler l'envie de recherche"
            />
            <div className="w-full flex justify-between md:space-x-1 md:flex-row flex-col">
              <div className="md:w-1/2 w-full">
                <div className="h-40  w-full border mx-auto mb-3 relative">
                  {imageURL ? (
                    <Image
                      src={imageURL}
                      width={"0"}
                      height="0"
                      className="w-full h-full object-cover"
                      sizes="100vw"
                      alt="User's image placeholder"
                    />
                  ) : (
                    <div className="grid place-items-center h-full text-gray-600 text-sm">
                      Ajouter l&apos;image
                    </div>
                  )}
                  <input
                    onChange={loadImage}
                    type="file"
                    hidden
                    ref={inputRef}
                  />
                  <span
                    onClick={pickImage}
                    className="absolute bottom-2 right-4 h-7 w-7 bg-blue-600 text-white rounded-full cursor-pointer grid place-items-center"
                  >
                    <PhotoIcon className="h-5 w-5" />
                  </span>
                </div>
                {error?.picture64 && (
                  <small className="text-red-500 text-sm">
                    {error?.picture64}
                  </small>
                )}
              </div>
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
          </form>
        </div>
      </div>
    </>
  );
}
