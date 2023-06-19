import Link from "next/link";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import Button from "../../../../components/Button";
import FormHeader from "../../../../components/FormHeader";
import ReusableHeader from "../../../../components/ReusableHeader";
import Textbox from "../../../../components/Textbox";
import { CheckCircleIcon, PhotoIcon } from "@heroicons/react/20/solid";
import useForm from "../../../../hooks/useForm";
import PostDocs from "../../../../api/postDocs";
import { useRouter } from "next/router";
import UserSuccessBox from "../../../../components/UserSuccessBox";
import fileToBase64 from "../../../../helpers/fileToBase64";
import Toast from "../../../../components/Toast";

declare type ErrorType = {
  wording: any;
  docs64: any;
};

export default function AddPostDocs() {
  const inputRef = useRef<any>();
  const [{ wording }, handleChange] = useForm({
    wording: "",
    docs64: "",
  });
  const [error, setError] = useState<ErrorType>();
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [post, setPostId] = useState("");
  const [url, setUrl] = useState("");
  const [docs64, setDocs64] = useState("");
  const [docsURL, setDocsURL] = useState("");
  const [entreprize, setEntreprize] = useState("");
  const [toast, setToast] = useState<"hide" | "show">("hide");
  const [msg, setMsg] = useState("");
  const onClickRegister: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const result = await PostDocs.add(
      {
        entreprize_id: entreprize,
        post_id: post,
        wording,
        docs64,
      },
      entreprize
    );
    if (result.type === "error") {
      const errors = result.data.errors;
      setError({
        wording: errors.wording && errors.wording[0],
        docs64: errors.docs64 && errors.docs64[0],
      });
      if (result.data.errors.non_field_errors) {
        setToast("show");
        setMsg(result.data.errors.non_field_errors);
      }
    } else if (result.pk) {
      setShowSuccessBox(true);
    }
  };
  const loadDoc = async (e: any) => {
    const url = URL.createObjectURL(e.target.files[0]);
    setDocsURL(url);
    const image = await fileToBase64(e.target.files[0]);
    setDocs64(image as string);
  };
  const pickDoc = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const router = useRouter();
  const entreprize_ = localStorage.getItem("entreprize");

  useEffect(() => {
    setEntreprize(entreprize_ as string);
    setPostId(router.query.post as string);
    setUrl(("/staff/post-docs/" + router.query.post) as string);
  }, [router, entreprize_]);

  if (showSuccessBox)
    return (
      <UserSuccessBox
        text="continer"
        title="Document d&apos;ajout au post enregistrée"
        path={url}
        message="Le document d&apos;ajout au post a été créé avec succès, vous pouvez maintenant vous connecter sur le consulter."
      />
    );
  return (
    <>
      <ReusableHeader text="Nouveau document" />
      <div className="h-auto md:w-7/12 md:mx-auto relative  w-full flex items-center justify-center">
        <Toast message={msg} set={toast} />
        <div className="border h-auto pb-2 flex flex-col justify-around rounded w-full">
          <div className="flex flex-col items-center">
            <div className="w-11/12">
              <FormHeader title="Nouveau document" />
            </div>
            <small className="text-xs md:text-base  md:w-11/12 w-10/12 mx-auto text-gray-500 md:text-left text-center my-3">
              Remplissez le formulaire ci-bas pour enregistrer un document au
              post
            </small>
          </div>
          <form className="w-11/12 mx-auto mt-2">
            <input onChange={loadDoc} type="file" hidden ref={inputRef} />
            <div className="w-full flex-col flex justify-between md:space-x-0">
              <Textbox
                event={handleChange}
                value={wording as string}
                error={error && error.wording}
                name="wording"
                type="text"
                placeholder="Description"
              />
            </div>
            <div className="w-full flex justify-between md:space-x-1 md:flex-row flex-col">
              <div className="md:w-1/2 w-full">
                <div className="h-40  w-full border mx-auto mb-3 relative">
                  {docsURL ? (
                    <Link
                      href={docsURL}
                      className="md:w-2/12  text-center w-3/12 text-sm"
                    >
                      {docsURL}
                    </Link>
                  ) : (
                    <div className="grid place-items-center h-full text-gray-600 text-sm">
                      Ajouter le document d&apos;ajout au post
                    </div>
                  )}
                  <input onChange={loadDoc} type="file" hidden ref={inputRef} />
                  <span
                    onClick={pickDoc}
                    className="absolute bottom-2 right-4 h-7 w-7 bg-blue-600 text-white rounded-full cursor-pointer grid place-items-center"
                  >
                    <PhotoIcon className="h-5 w-5" />
                  </span>
                </div>
                {error?.docs64 && (
                  <small className="text-red-500 text-sm">
                    {error?.docs64}
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
