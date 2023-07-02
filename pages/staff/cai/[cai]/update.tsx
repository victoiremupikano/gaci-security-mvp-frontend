import { MouseEventHandler, useEffect, useRef, useState } from "react";
import Button from "../../../../components/Button";
import FormHeader from "../../../../components/FormHeader";
import ReusableHeader from "../../../../components/ReusableHeader";
import Textbox from "../../../../components/Textbox";
import { CheckCircleIcon, CheckIcon, PhotoIcon, RssIcon } from "@heroicons/react/20/solid";
import Checkbox from "../../../../components/Checkbox";
import Cai from "../../../../api/cai";
import UserSuccessBox from "../../../../components/UserSuccessBox";
import fileToBase64 from "../../../../helpers/fileToBase64";
import Image from "next/image";
import { useRouter } from "next/router";
import downloadImage from "../../../../helpers/downloadImage";
import Toast from "../../../../components/Toast";

declare type ErrorType = {
  reason: any;
  longitude: any;
  latittude: any;
  picture64: any;
};

export default function UpdateCai() {
  const inputRef = useRef<any>();
  const [error, setError] = useState<ErrorType>();
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [reason, setReason] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latittude, setLatittude] = useState("");
  const [is_finish, setIs_finish] = useState<any>(false);
  const [is_cancel, setIs_cancel] = useState<any>(false);
  const [picture64, setpicture64] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [_cai, setCai] = useState<any>({});
  const [id, setId] = useState("");
  const [toast, setToast] = useState<"hide" | "show">("hide");
  const [msg, setMsg] = useState("");
  const onClickRegister: MouseEventHandler<HTMLButtonElement> = async (e) => {
    setToast("hide");
    const result = await Cai.update(
      {
        reason: reason,
        longitude: longitude,
        latittude: latittude,
        is_finish,
        is_cancel,
        picture64,
      },
      id
    );
    if (result.type === "error") {
      const errors = result.data.errors;
      setError({
        reason: errors.reason && errors.reason[0],
        longitude: errors.longitude && errors.longitude[0],
        latittude: errors.latittude && errors.latittude[0],
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
    setpicture64(image as string);
  };
  const pickImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const getCai = async (id: string) => {
    const result = await Cai.get(id);
    if (result.pk) {
      setCai(result);
      setId(result.pk);
      setLongitude(result.longitude);
      setLatittude(result.latittude);
      setReason(result.reason);
      setImageURL(result.picture);
      setIs_finish(result.is_finish);
      setIs_cancel(result.is_cancel);
      const r = await downloadImage(result.picture);
      const b64 = await fileToBase64(r);
      setpicture64(b64 as string);
    }
  };
  const router = useRouter();
  const { cai } = router.query;

  useEffect(() => {
    getCai(cai as string);
  }, [cai]);

  if (showSuccessBox)
    return (
      <UserSuccessBox
        text="continer"
        title="Modification effectuée"
        path="/staff/cai"
        message="Votre couvre-feu a été modifier avec succès, vous pouvez maintenant le consulter."
      />
    );
  return (
    <>
      <ReusableHeader text="Modification d&apos;un couvre-feu" />
      <div className="h-auto md:w-7/12 md:mx-auto relative  w-full flex items-center justify-center">
        <Toast message={msg} set={toast} />
        <div className="border h-auto pb-2 flex flex-col justify-around rounded w-full">
          <div className="flex flex-col items-center">
            <div className="w-11/12">
              <FormHeader title="Modification d'un couvre-feu" />
            </div>
            <small className="text-xs md:text-base  md:w-11/12 w-10/12 mx-auto text-gray-500 md:text-left text-center my-3">
              Remplissez le formulaire ci-bas pour modifier un couvre-feu
            </small>
          </div>
          <form className="w-11/12 mx-auto mt-2">
            <input onChange={loadImage} type="file" hidden ref={inputRef} />
            <div className="w-full flex-col flex justify-between md:space-x-0">
              <Textbox
                event={(e) => setReason(e.target.value)}
                value={reason as string}
                error={error && error.reason}
                name="reason"
                type="text"
                placeholder="Motif"
              />
              <Textbox
                event={(e) => setLongitude(e.target.value)}
                value={longitude as string}
                error={error && error.longitude}
                name="longitude"
                type="text"
                placeholder="Longitude"
              />
              <Textbox
                event={(e) => setLatittude(e.target.value)}
                value={latittude as string}
                error={error && error.latittude}
                name="latittude"
                type="text"
                placeholder="Latittude"
              />
            </div> 
            <Checkbox
              name="is_finish"
              event={onClickCheckboxis_finish}
              value={is_finish}
              title="Cochez pour mettre fin a l'envie de recherche"
            />
            <Checkbox
              name="is_cancel"
              event={onClickCheckboxis_cancel}
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
