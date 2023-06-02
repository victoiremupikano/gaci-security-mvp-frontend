import Link from "next/link";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import Button from "../../../../components/Button";
import FormHeader from "../../../../components/FormHeader";
import ReusableHeader from "../../../../components/ReusableHeader";
import Textbox from "../../../../components/Textbox";
import { CheckCircleIcon, PhotoIcon, RssIcon } from "@heroicons/react/20/solid";
import Checkbox from "../../../../components/Checkbox";
import useForm from "../../../../hooks/useForm";
import NewsLetter from "../../../../api/newsLetter";
import UserSuccessBox from "../../../../components/UserSuccessBox";
import fileToBase64 from "../../../../helpers/fileToBase64";
import Image from "next/image";
import { useRouter } from "next/router";
import downloadImage from "../../../../helpers/downloadImage";
import Toast from "../../../../components/Toast";

declare type ErrorType = {
  email: any;
};

export default function UpdateNewsLetter() {
  const [error, setError] = useState<ErrorType>();
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<any>(false);
  const [_newsLetter, setNewsLetter] = useState<any>({});
  const [entreprize, setEntreprize] = useState("");
  const [id, setId] = useState("");
  const [toast, setToast] = useState<"hide" | "show">("hide");
  const [msg, setMsg] = useState("");
  const onClickRegister: MouseEventHandler<HTMLButtonElement> = async (e) => {
    setToast('hide')
    const result = await NewsLetter.update({
      entreprize_id:entreprize,
      email,
      status
    }, id);
    if (result.type === "error") {
      const errors = result.data.errors;
      setError({
        email: errors.email && errors.email[0]
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
  const getNewsLetter = async (id:string, entreprize_id: string) => {
    const result = await NewsLetter.get(id, entreprize_id)
      if (result.pk) {
        setNewsLetter(result)
        setId(result.pk)
        setEmail(result.email)
        setStatus(result.status)
        }
    }
  const router = useRouter()
  const { newsletter } = router.query

  useEffect(() => {
    const entreprize = localStorage.getItem("entreprize");
    setEntreprize(entreprize as string);
    getNewsLetter(newsletter as string, entreprize as string)
  }, [newsletter]);

  if (showSuccessBox)
    return (
      <UserSuccessBox
        text="continer"
        title="Modification effectuée"
        path="/staff/news-letter"
        message="Votre email a été modifier avec succès, vous pouvez maintenant le consulter."
      />
    );
  return (
    <>
      <ReusableHeader text="Modification d'une adresse mail" />
      <div className="h-auto md:w-7/12 md:mx-auto relative  w-full flex items-center justify-center">
        <Toast message={msg} set={toast} />
        <div className="border h-auto pb-2 flex flex-col justify-around rounded w-full">
          <div className="flex flex-col items-center">
            <div className="w-11/12">
              <FormHeader title="Modification d'une adresse mail" />
            </div>
            <small className="text-xs md:text-base  md:w-11/12 w-10/12 mx-auto text-gray-500 md:text-left text-center my-3">
              Remplissez le formulaire ci-bas pour modifier une adresse mail
            </small>
          </div>
          <form className="w-11/12 mx-auto mt-2">
            <div className="w-full flex-col flex justify-between md:space-x-0">
              <Textbox
                event={(e) => setEmail(e.target.value)}
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
              title="Cochez pour spécifier si la publication directe."
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
