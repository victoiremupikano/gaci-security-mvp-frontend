import { MouseEventHandler, useCallback, useEffect, useRef, useState } from "react";
import Button from "../../../../../components/Button";
import FormHeader from "../../../../../components/FormHeader";
import ReusableHeader from "../../../../../components/ReusableHeader";
import Textbox from "../../../../../components/Textbox";
import { CheckCircleIcon, PhotoIcon, RssIcon, CheckIcon } from "@heroicons/react/20/solid";
import Checkbox from "../../../../../components/Checkbox";
import useForm from "../../../../../hooks/useForm";
import Trrac from "../../../../../api/trrac";
import UserSuccessBox from "../../../../../components/UserSuccessBox";
import fileToBase64 from "../../../../../helpers/fileToBase64";
import Image from "next/image";
import Toast from "../../../../../components/Toast";
import { useRouter } from "next/router";
import ApiResults from "@/components/ApiResults";

declare type ErrorType = {
  url: any;
};

export default function AddPa() {
  const inputRef = useRef<any>();
  const [{ url }, handleChange] = useForm({
    url: "",
  });
  const [error, setError] = useState<ErrorType>();
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [latittude, setLatitude] = useState("0")
  const [longitude, setLongitude] = useState("0")
  const [id, setId] = useState("");
  const [trrac, setTrrac] = useState<any>();
  const [toast, setToast] = useState<"hide" | "show">("hide");
  const [msg, setMsg] = useState("");
  const onClickRegister: MouseEventHandler<HTMLButtonElement> = async (e) => {
    setToast("hide")
    const result = await Trrac.getTrrac(id as string, "wtr", url as string, longitude as string, latittude as string);
    if (result.type === "error") {
      setToast("show");
      setMsg("Erreur lors de la tentative de connexion avec l'API");
      console.log('Erreur')
    } else if (result) {
      const data = result.results;
      console.log(data)
        setTrrac(data);
    }
  };

  const router = useRouter();
  const { wtr } = router.query;

  useEffect(() => {
    setId(wtr as string)
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude.toString())
      setLongitude(position.coords.longitude.toString())
    });
  }, [])

  if (showSuccessBox)
    return (
      <UserSuccessBox
        text="continer"
        title="Essai de reconnaissance envoyé avec succès"
        path="/nostaff/pub/wtr/"
        message="Essaie de reconnaissance lancer avec succès"
      />
    );
  return (
    <>
      <ReusableHeader text="Nouveau essaie de reconnaissance" />
      <div className="h-auto md:w-7/12 md:mx-auto relative  w-full flex items-center justify-center">
        <Toast message={msg} set={toast} />
        <div className="border h-auto pb-2 flex flex-col justify-around rounded w-full">
          <div className="flex flex-col items-center">
            <div className="w-11/12">
              <FormHeader title="Nouveau essaie de reconnaissance" />
            </div>
            <small className="text-xs md:text-base  md:w-11/12 w-10/12 mx-auto text-gray-500 md:text-left text-center my-3">
              Remplissez le formulaire ci-bas
            </small>
          </div>
          <form className="w-11/12 mx-auto mt-2">
              <div className="w-full flex-col flex justify-between md:space-x-0">
                <Textbox
                  event={handleChange}
                  value={url as string}
                  error={error && error.url}
                  name="url"
                  type="text"
                  placeholder="Url"
                />                 
            </div>
            <Button
              event={onClickRegister}
              size="fit"
              content={
                <div className="flex justify-around">
                  Lancer la reconnaissance <CheckCircleIcon className="h-6 w-6 ml-3" />
                </div>
              }
              design="primary"
              type="button"
            />
          </form>
          <div className="w-full text-sm md:text-base flex md:justify-between mx-auto h-auto">
              <ApiResults apiresults={trrac} />
            </div>
        </div>
      </div>
    </>
  );
}
