import { MouseEventHandler, useEffect, useRef, useState } from "react";
import Button from "../../../../components/Button";
import FormHeader from "../../../../components/FormHeader";
import ReusableHeader from "../../../../components/ReusableHeader";
import Textbox from "../../../../components/Textbox";
import { CheckCircleIcon, CheckIcon, PhotoIcon, RssIcon } from "@heroicons/react/20/solid";
import Checkbox from "../../../../components/Checkbox";
import Wtr from "../../../../api/wtr";
import UserSuccessBox from "../../../../components/UserSuccessBox";
import fileToBase64 from "../../../../helpers/fileToBase64";
import Image from "next/image";
import { useRouter } from "next/router";
import downloadImage from "../../../../helpers/downloadImage";
import Toast from "../../../../components/Toast";

declare type ErrorType = {
  names: any;
  kind: any;
  reason: any;
  picture64: any;
};

export default function UpdateWtr() {
  const inputRef = useRef<any>();
  const [error, setError] = useState<ErrorType>();
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [names, setNames] = useState("");
  const [reason, setReason] = useState("");
  const [is_finish, setIs_finish] = useState<any>(false);
  const [is_cancel, setIs_cancel] = useState<any>(false);
  const [sex, setSex] = useState("");
  const [picture64, setPicture64] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [_wrt, setWtr] = useState<any>({});
  const [id, setId] = useState("");
  const [toast, setToast] = useState<"hide" | "show">("hide");
  const [msg, setMsg] = useState("");
  const onClickRegister: MouseEventHandler<HTMLButtonElement> = async (e) => {
    setToast("hide");
    const result = await Wtr.update(
      {
        names: names,
        kind: sex,
        is_finish,
        is_cancel,
        reason: reason,
        picture64,
      },
      id
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
  const onClickCheckboxIsFinish = (e: any) => setIs_finish(e.target.checked);
  const onClickCheckboxIsCancel = (e: any) => setIs_cancel(e.target.checked);
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
  const getWtr = async (id: string) => {
    const result = await Wtr.get(id);
    if (result.pk) {
      setWtr(result);
      setId(result.pk);
      setNames(result.names);
      setReason(result.reason);
      setImageURL(result.picture);
      setIs_finish(result.is_finish);
      setIs_cancel(result.is_cancel);
      const r = await downloadImage(result.picture);
      const b64 = await fileToBase64(r);
      setPicture64(b64 as string);
    }
  };
  const router = useRouter();
  const { wtr } = router.query;

  useEffect(() => {
    getWtr(wtr as string);
  }, [wtr]);

  if (showSuccessBox)
    return (
      <UserSuccessBox
        text="continer"
        title="Modification effectuée"
        path="/staff/wtr"
        message="Votre envie de recherche a été modifier avec succès, vous pouvez maintenant le consulter."
      />
    );
  return (
    <>
      <ReusableHeader text="Modification d&apos;un envie de recherche" />
      <div className="h-auto md:w-7/12 md:mx-auto relative  w-full flex items-center justify-center">
        <Toast message={msg} set={toast} />
        <div className="border h-auto pb-2 flex flex-col justify-around rounded w-full">
          <div className="flex flex-col items-center">
            <div className="w-11/12">
              <FormHeader title="Modifier un envie de recherche" />
            </div>
            <small className="text-xs md:text-base  md:w-11/12 w-10/12 mx-auto text-gray-500 md:text-left text-center my-3">
              Remplissez le formulaire ci-bas
            </small>
          </div>
          <form className="w-11/12 mx-auto mt-2">
            <input onChange={loadImage} type="file" hidden ref={inputRef} />
            <div className="w-full flex-col flex justify-between md:space-x-0">
              <Textbox
                event={(e) => setNames(e.target.value)}
                value={names as string}
                error={error && error.names}
                name="names"
                type="text"
                placeholder="Noms"
              />
              <Textbox
                event={(e) => setReason(e.target.value)}
                value={reason as string}
                error={error && error.reason}
                name="reason"
                type="text"
                placeholder="Motif"
              />
              <div className="w-full flex mb-4 justify-center items-center relative bg-gray-100 rounded h-20">
              <span className="absolute text-gray-600 top-3 left-2">Sexe</span>
              <div className="flex w-full mt-6 justify-around">
                <span
                  onClick={() => setSexTo("Feminin")}
                  className={`${
                    sex === "Feminin"
                      ? "bg-blue-600 border-transparent text-white"
                      : "bg-white text-blue-600 border-blue-600"
                  } rounded-full border-2 border-blue-600 transition-colors duration-500  px-1.5 py-0.5 flex items-center`}
                >
                  Feminin{" "}
                  {sex === "Feminin" ? (
                    <CheckIcon className="h-4 ml-1 w-4" />
                  ) : null}
                </span>
                <span
                  onClick={() => setSexTo("Masculin")}
                  className={`${
                    sex === "Masculin"
                      ? "bg-blue-600 border-transparent text-white"
                      : "bg-white text-blue-600 border-blue-600"
                  } rounded-full border-2 border-blue-600 transition-colors duration-500  px-1.5 py-0.5 flex items-center`}
                >
                  Masculin{" "}
                  {sex === "Masculin" ? (
                    <CheckIcon className="h-4 w-4 ml-1" />
                  ) : null}
                </span>
              </div>
              {error?.kind && (
                <small className="text-red-500 absolute left-2 -bottom-6 text-sm">
                  {error?.kind}
                </small>
              )}
            </div>
            </div>
            <Checkbox
              name="isFinish"
              event={onClickCheckboxIsFinish}
              value={is_finish}
              title="Cochez pour mettre fin a l'envie de recherche"
            />
            <Checkbox
              name="isCancel"
              event={onClickCheckboxIsCancel}
              value={is_cancel}
              title="Cochez pour annuler"
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
