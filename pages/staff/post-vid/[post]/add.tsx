import { MouseEventHandler, useEffect, useRef, useState } from "react";
import Button from "../../../../components/Button";
import FormHeader from "../../../../components/FormHeader";
import ReusableHeader from "../../../../components/ReusableHeader";
import Textbox from "../../../../components/Textbox";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import useForm from "../../../../hooks/useForm";
import PostVid from "../../../../api/postVideos";
import { useRouter } from "next/router";
import UserSuccessBox from "../../../../components/UserSuccessBox";
import Toast from "../../../../components/Toast";

declare type ErrorType = {
  wording: any;
  url: any;
};

export default function AddPostVid() {
  const [{ wording, url }, handleChange] = useForm({
    wording: "",
    url: "",
  });
  const [error, setError] = useState<ErrorType>();
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [post, setPostId] = useState("");
  const [_url, setUrl] = useState("");
  const [entreprize, setEntreprize] = useState("");
  const [toast, setToast] = useState<"hide" | "show">("hide");
  const [msg, setMsg] = useState("");
  const onClickRegister: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const result = await PostVid.add(
      {
        entreprize_id: entreprize,
        post_id: post,
        wording,
        url,
      },
      entreprize
    );
    if (result.type === "error") {
      const errors = result.data.errors;
      setError({
        wording: errors.wording && errors.wording[0],
        url: errors.url && errors.url[0],
      });
      if (result.data.errors.non_field_errors) {
        setToast("show");
        setMsg(result.data.errors.non_field_errors);
      }
    } else if (result.pk) {
      setShowSuccessBox(true);
    }
  };
  const router = useRouter();
  const entreprize_ = localStorage.getItem("entreprize");

  useEffect(() => {
    setEntreprize(entreprize_ as string);
    setPostId(router.query.post as string);
    setUrl(("/staff/post-vid/" + router.query.post) as string);
  }, [router, entreprize_]);

  if (showSuccessBox)
    return (
      <UserSuccessBox
        text="continer"
        title="Vidéo d'ajout au post enregistrée"
        path={_url}
        message="La vidéo d'ajout au post a été créé avec succès, vous pouvez maintenant vous connecter sur le consulter."
      />
    );
  return (
    <>
      <ReusableHeader text="Nouveau vidéo" />
      <div className="h-auto md:w-7/12 md:mx-auto relative  w-full flex items-center justify-center">
        <Toast message={msg} set={toast} />
        <div className="border h-auto pb-2 flex flex-col justify-around rounded w-full">
          <div className="flex flex-col items-center">
            <div className="w-11/12">
              <FormHeader title="Nouveau vidéo" />
            </div>
            <small className="text-xs md:text-base  md:w-11/12 w-10/12 mx-auto text-gray-500 md:text-left text-center my-3">
              Remplissez le formulaire ci-bas pour enregistrer un vidéo au post
            </small>
          </div>
          <form className="w-11/12 mx-auto mt-2">
            <div className="w-full flex-col flex justify-between md:space-x-0">
              <Textbox
                event={handleChange}
                value={wording as string}
                error={error && error.wording}
                name="wording"
                type="text"
                placeholder="Description"
              />
              <Textbox
                event={handleChange}
                value={url as string}
                error={error && error.url}
                name="url"
                type="text"
                placeholder="Lien de la vidéo"
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
          </form>
        </div>
      </div>
    </>
  );
}
